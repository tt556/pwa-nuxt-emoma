<template>
  <div id="app">
    <script src="https://js.stripe.com/v2/"></script>
    <div class="back-img"></div>
    <div class="top-talents-content">
      <div class="top-talents-img">
        <img :src="tfile" alt="" width="100px" height="100px">
      </div>
    </div>
    <div class="order-contents">
      <div class="order-content">
        <div class="question-text">
          <p>誰にビデオを贈りますか？</p>
        </div>
        <div class="select-form">
          <button class="form-left" v-bind:class="{active:isActive}" @click="leftactive">他人</button>
          <button class="form-right" v-bind:class="{active:!isActive}" @click="active">自分</button>
        </div>
      </div>
      <div class="order-content">
        <div class="question-text">
          <p>あなたのお名前を入力してください</p>
        </div>
        <input type="text" v-model="yourname" placeholder="あなたの名前">
      </div>
      <div class="order-content" v-if="isActive">
        <div class="question-text">
          <p>贈る方のお名前を入力してください</p>
        </div>
        <input type="text" v-model="sendname" placeholder="贈る人の名前">
      </div>
      <div class="order-content">
        <div class="question-text">
          <p>どんなビデオをご希望ですか？</p>
        </div>
        <textarea name="name" rows="8" cols="80" v-model="videomessage" placeholder="希望のビデオ内容"></textarea>
      </div>
    </div>

    <div class="card-add-form">
      <h4>お支払い情報の入力</h4>

      <div class="number-input-area">
        <label>
          <input class="number-input" v-model="newCreditCard.number" placeholder="Card number">
        </label>
      </div>

      <div class="mmyy-ccv">

        <div class="exp-input-area">
          <label>
            <input class="exp-month-input" v-model="newCreditCard.exp_month" size="2" placeholder="MM"> /
            <input class="exp-year-input" v-model="newCreditCard.exp_year" size="4" placeholder="YY">
          </label>
        </div>

        <div class="ccv-input-area">
          <label>
            <input class="ccv-input" v-model="newCreditCard.cvc" placeholder="CCV">
          </label>
        </div>

      </div>

      <div class="zip-input-area">
        <label>
          <input class="zip-input" v-model="newCreditCard.address_zip" placeholder="住所">
        </label>
      </div>

      <!-- <div>
        <button v-on:click="submitNewCreditCard">登録</button>
        {{ newCreditCard.error }}
      </div> -->
    </div>

    <div class="bottom-bar">
      <div class="order-confirm-content">
        <div class="order-confirm-btn">
          <button @click="orderbtn">¥{{ newCharge.amount }}円で確定する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      // 切り替え
      isActive: true,
      // 自分か他人か
      IndexForWho: '',
      // 自分の名前
      yourname: '',
      // 送る人の名前
      sendname: '',
      // ビデオメッセージ
      videomessage: '',

      orderid: '',

      tfile: '',

      amount: '',

      errors: [],

      currentUser: null,
      sources: {},
      stripeCustomerInitialized: false,
      newCreditCard: {
        number: '4242424242424242',
        cvc: '111',
        exp_month: 1,
        exp_year: 2020,
        address_zip: '00000'
      },
      charges: {},
      newCharge: {
        source: null,
        amount: ''
      }
    }
  },
  mounted() {
    // 多分ログインしたらってやつ
    Stripe.setPublishableKey('pk_test_QJEarN1JjibVSItD1ehS0zac00W80CFyt4');
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // document.getElementById('loader').style.display = 'none';
        this.currentUser = firebaseUser;
        this.listen();
      } else {
        firebaseUI.start('#firebaseui-auth-container', firebaseAuthOptions);
        this.currentUser = null;
      }
    });
    // routeのidを取得
    var tid = this.$nuxt.$route.params.id
    console.log(tid)
    // データベースを定義
    var database = firebase.database();
    // それぞれの取得したい子要素を定義
    var datatfile = database.ref('talents/' + tid + '/tfile');
    var dataamount = database.ref('talents/' + tid + '/amount')

    // tfileの取得、格納
    datatfile.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const tfile = snapshot.val()
        this.tfile = tfile
      }
    })

    dataamount.on('value', snapshot => {
      if(snapshot) {
        console.log(snapshot.val())
        const amount = snapshot.val()
        this.newCharge.amount = amount
      }
    })
  },
  // computed: {
  //   ...mapState(['orderid']),
  //   ...mapGetters(['getorderid'])
  // },
  methods: {
    // active押すとfalseへ切り替え
    active() {
      this.isActive = !this.isActive
    },
    // leftactive押すとfalseへ切り替え
    leftactive() {
      this.isActive = !this.isActive
    },
    // ログインしたら発動かな？
    listen: function() {
      // ファイアストレージにUIDとかを保存
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).onSnapshot(snapshot => {
        this.stripeCustomerInitialized = (snapshot.data() !== null);
      }, () => {
        this.stripeCustomerInitialized = false;
      });

      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('sources').onSnapshot(snapshot => {
       let newSources = {};
        snapshot.forEach(doc => {
          const id = doc.id;
          newSources[id] = doc.data();
        })
        this.sources = newSources;

      }, () => {

        this.sources = {};
      });

      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('charges').onSnapshot(snapshot => {
      let newCharges = {};
       snapshot.forEach(doc => {
         const id = doc.id;
         newCharges[id] = doc.data();
       })
       this.charges = newCharges;
      }, () => {
        this.charges = {};
      });
    },
    orderbtn() {
      console.log(this.yourname);
      console.log(this.sendname);
      console.log(this.videomessage);
      console.log(this.isActive);

      // 他人に送る場合
      if (this.isActive == true) {

        // 全て入力されたかどうか
        if (this.yourname && this.sendname && this.videomessage) {

          const ref_order = firebase.database().ref().child('order');

          this.orderid = ref_order.push({}).key;
          console.log(this.orderid);

          var orderid = this.orderid

          const ref_orderid = firebase.database().ref().child('order').child(this.orderid);

          ref_orderid.set({
            IndexForWho: '0',
            from: this.yourname,
            orderTextData: this.videomessage,
            to: this.sendname
          });

          // ユーザーの中にorderinthepastを保存
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log(user.uid);
              console.log(orderid);

              const sendMail = firebase.functions().httpsCallable('sendMail');
              let parent = this
              sendMail({destination: user.email}).then(function (result) {
                // parent.snackbar = true
                console.log(user.email);
              })


              var timestamp = firebase.database.ServerValue.TIMESTAMP

              const ref_order_user = firebase.database().ref().child('users').child(user.uid).child("orderInThePast").child(orderid);

              ref_order_user.set({
                orderid
              })

            } else {
              // No user is signed in.
              conosole.log("ログインしてない！")
            }
          });

          // 完了
          alert("購入が完了しました")
          // 入力内容の消去
          this.yourname = "",
          this.sendname = "",
          this.videomessage = ""

        // 入力されてない場合のエラー
        } else {
          alert("入力されてない欄があります")
        }

        // 自分に送る場合
      } else {

        if (this.yourname && this.videomessage) {

          const ref_order = firebase.database().ref().child('order');

          this.orderid = ref_order.push({}).key;

          const ref_orderid = firebase.database().ref().child('order').child(this.orderid);

          ref_orderid.set({
            IndexForWho: '1',
            orderTextData: this.videomessage,
            to: this.yourname,
            // startedAt: firebase.database.ServerValue.TIMESTAMP
          });

          // 完了
          alert("購入が完了しました")
          // 入力内容の消去
          this.yourname = "",
          this.sendname = "",
          this.videomessage = ""


        } else {
          alert("入力されてない欄があります")
        }
      }
      Stripe.card.createToken({
        number: this.newCreditCard.number,
        cvc: this.newCreditCard.cvc,
        exp_month: this.newCreditCard.exp_month,
        exp_year: this.newCreditCard.exp_year,
        address_zip: this.newCreditCard.address_zip
      }, (status, response) => {
        if (response.error) {
          // 失敗したらエラーメッセージ
          this.newCreditCard.error = response.error.message;
        } else {
          // うまくいったらトークンをファイアストアに保存
          firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('tokens').add({token: response.id}).then(() => {
            firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
              source: this.newCharge.source,
              amount: parseInt(this.newCharge.amount)
            }).then(() => {
              this.newCreditCard = {
                number: '',
                cvc: '',
                exp_month: 1,
                exp_year: 2017,
                address_zip: ''
              };
            });
          });
        }
      });
    }
  }
}
</script>

<style scoped>
body {
  font-family: "Noto Sans CJK JP", "NotoSansCJKjp", "FontAwesome", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
  color: #4d4d4d;
  font-weight: 600;
}
/* 注文ページ */
/* タレントの画像 */
.back-img {
  position: absolute;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(150deg,#00f1e6 10%,rgba(214,56,255,.5) 65%);
}

.top-talents-content {
  position: relative;
  left: 30px;
  top: 45px;
  width: 90%;
}


.top-talents-img img {
  border-radius: 50px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
  width: 100px;
  height: 100px;
  object-fit: cover;
}

/* 質問 */

.order-contents {
  margin: 70px 40px 30px;
}

.order-content {
  margin: 20px 0 20px;
}

.question-text p {
  margin: 0;
  font-size: 16px;
}

/* 自分か他人かを選ぶ */
.select-form {
  display: flex;
  width: max-content;
  margin: 20px auto 30px;
}

.form-left {
  border-radius: 20px 0 0 20px;
  border: 1px solid #ccc;
  padding: 5px 40px;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
}

.form-right {
  border-radius: 0px 20px 20px 0;
  border: 1px solid #ccc;
  padding: 5px 40px;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
}

/* active押すとclassが追加される */
.form-left.active {
  background-color: #eee;
}

.form-right.active {
  background-color: #eee;
}

input[type="text"] {
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 18px;
  margin: 20px 0;
  padding: 10px;
  width: 100%;
}

textarea {
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 18px;
  margin: 20px 0;
  padding: 10px;
  width: 100%;
}

/* footerの注文確定ボタン */
.order-confirm-content {
  width: 100%;
  text-align: center;
}

.order-confirm-content button {
  margin: 10px auto 50px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(150deg,#00f1e6 15%,rgba(214,56,255,.5) 65%);
  padding: 10px;
  width: 70%;
  border-radius: 30px;
  border: none;
}

input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  margin: 10px 0 10px;
}

button {
  border: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  margin: 15px auto;
  font-size: 14px;
  color: #4d4d4d;
}

.card-add-form {
  margin: 20px 40px;
}

.card-add-form h4 {
  margin-bottom: 10px;
}

.number-input {
  width: 100%;
}

.mmyy-ccv {
  display: flex;
}

.exp-month-input {
  width: 35px;
}

.exp-year-input {
  width: 35px;
}

.ccv-input {
  width: 189px;
  margin-left: 20px;
}

.zip-input {
  width: 100%;
}
</style>
