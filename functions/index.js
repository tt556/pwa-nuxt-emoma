const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');

const app = express();
const nuxt = new Nuxt({
    dev: false,
    buildDir: 'nuxt',
    build: {
        publicPath: '/assets/'
    }
});

function handleRequest(req, res) {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    return new Promise((resolve, reject) => {
        nuxt.render(req, res, (promise) => {
            promise.then(resolve).catch(reject);
        });
    });
}

app.use(handleRequest);
exports.ssrapp = functions.https.onRequest(app);

'use strict';

const admin = require('firebase-admin');
admin.initializeApp();
const logging = require('@google-cloud/logging')();
const stripe = require('stripe')(functions.config().stripe.token);
const currency = functions.config().stripe.currency || 'JPY';


// [START chargecustomer]
// Charge the Stripe customer whenever an amount is written to the Realtime database
// リアルタイムデータベースに金額が書き込まれるたびにStripeの顧客に請求するリアルタイムデータベースに金額が書き込まれるたびにStripeの顧客に請求する
exports.createStripeCharge = functions.firestore.document('stripe_customers/{userId}/charges/{id}').onCreate(async (snap, context) => {
  const val = snap.data();
  try {
    // Look up the Stripe customer id written in createStripeCustomer
    // createStripeCustomerに書かれたStripeの顧客IDを調べます。
    const snapshot = await admin.firestore().collection(`stripe_customers`).doc(context.params.userId).get()
    const snapval = snapshot.data();
    const customer = snapval.customer_id
    // Create a charge using the pushId as the idempotency key
    // protecting against double charges
    // べき等性のキーとしてpushIdを使って請求を作成する
    //　二重請求に対する保護
    const amount = val.amount;
    const idempotencyKey = context.params.id;
    const charge = {amount, currency, customer};
    if (val.source !== null) {
      charge.source = val.source;
    }
    const response = await stripe.charges.create(charge, {idempotency_key: idempotencyKey});
    // If the result is successful, write it back to the database
    // 結果が成功した場合は、データベースに書き戻します。
    return snap.ref.set(response, { merge: true });
  } catch(error) {
    // We want to capture errors and render them in a user-friendly way, while
    // still logging an exception with StackDriver
    // エラーをとらえてユーザーフレンドリーな方法でレンダリングしたいのですが
    //それでもStackDriverで例外を記録する
    console.log(error);
    await snap.ref.set({error: userFacingMessage(error)}, { merge: true });
    return reportError(error, {user: context.params.userId});
  }
});
// [END chargecustomer]]

// When a user is created, register them with Stripe
// ユーザーが作成されたら、それらをStripeに登録します。
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  const customer = await stripe.customers.create({email: user.email});
  return admin.firestore().collection('stripe_customers').doc(user.uid).set({customer_id: customer.id});
});

// Add a payment source (card) for a user by writing a stripe payment source token to Realtime database
//ストライプ支払い元トークンをRealtimeデータベースに書き込むことによって、ユーザーの支払い元（カード）を追加します
exports.addPaymentSource = functions.firestore.document('/stripe_customers/{userId}/tokens/{pushId}').onCreate(async (snap, context) => {
  const source = snap.data();
  const token = source.token;
  if (source === null){
    return null;
  }

  try {
    const snapshot = await admin.firestore().collection('stripe_customers').doc(context.params.userId).get();
    const customer =  snapshot.data().customer_id;
    const response = await stripe.customers.createSource(customer, {source: token});
    return admin.firestore().collection('stripe_customers').doc(context.params.userId).collection("sources").doc(response.fingerprint).set(response, {merge: true});
  } catch (error) {
    await snap.ref.set({'error':userFacingMessage(error)},{merge:true});
    return reportError(error, {user: context.params.userId});
  }
});

// When a user deletes their account, clean up after them
// ユーザーが自分のアカウントを削除したら、それらの後にクリーンアップする
exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const snapshot = await admin.firestore().collection('stripe_customers').doc(user.uid).get();
  const customer = snapshot.data();
  await stripe.customers.del(customer.customer_id);
  return admin.firestore().collection('stripe_customers').doc(user.uid).delete();
});

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// エラーを常に把握するには、Stackdriverを使用して詳細なエラーレポートを作成する必要があります。
//単にconsole.errorに頼るよりも。これは影響を受けるユーザーを計算します+あなたに電子メールを送ります
//受信することを選択した場合はアラート。
// [START reporterror]
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  // これは、ログを受け取るStackDriverログストリームの名前です。
  //エントリこの名前は任意の有効なログストリーム名にすることができますが、 "err"を含める必要があります
  //エラーがStackDriverエラー報告によって検出されるようにするため。
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: {function_name: process.env.FUNCTION_NAME},
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
       return reject(error);
      }
      return resolve();
    });
  });
}
// [END reporterror]

// Sanitize the error message for the user
function userFacingMessage(error) {
  return error.type ? error.message : 'An error occurred, developers have been alerted';
}
