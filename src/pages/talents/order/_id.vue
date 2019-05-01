<template>
  <div>
    <script src="https://js.stripe.com/v2/"></script>
    <nav-bar/>
    <!-- タレントの後ろの背景 -->
    <div class="back-img"></div>

    <!-- タレントの画像 -->
    <div class="top-talents-content">
      <div class="top-talents-img">
        <img :src="tfile" alt="" width="100px" height="100px">
      </div>
    </div>

    <!-- オーダーの入力する欄一帯 -->
    <div class="order-contents">

      <!-- 自分か他人かを選ぶとこ -->
      <div class="order-content">
        <!-- 質問 -->
        <div class="question-text">
          <p>誰にビデオを贈りますか？</p>
        </div>
        <!-- 自分か他人かクリックで変更 -->
        <div class="select-form">
          <button class="form-left" v-bind:class="{active:isActive}" @click="leftactive">他人</button>
          <button class="form-right" v-bind:class="{active:!isActive}" @click="active">自分</button>
        </div>

      </div>

      <!-- 名前の入力欄 -->
      <div class="order-content">
        <div class="question-text">
          <p>あなたのお名前を入力してください</p>
        </div>
        <input type="text" v-model="yourname" placeholder="あなたの名前">
      </div>

      <!-- 送る人の入力欄 -->
      <div class="order-content" v-if="isActive">
        <div class="question-text">
          <p>贈る方のお名前を入力してください</p>
        </div>
        <input type="text" v-model="sendname" placeholder="贈る人の名前">
      </div>

      <!-- ビデオの希望入力欄 -->
      <div class="order-content">
        <div class="question-text">
          <p>どんなビデオをご希望ですか？</p>
        </div>
        <textarea name="name" rows="8" cols="80" v-model="videomessage" placeholder="希望のビデオ内容"></textarea>
      </div>

    </div>

    <!-- カード入力欄 -->
    <div class="card-add-form">
      <h4>お支払い情報の入力</h4>
      <!-- カード番号 -->
      <div class="number-input-area">
        <label>
          <input class="number-input" v-model="newCreditCard.number" placeholder="Card number" maxlength='12'>
        </label>
      </div>
      <!-- 使用期限とccv -->
      <div class="mmyy-ccv">
        <!-- 使用期限 -->
        <div class="exp-input-area">
          <label>
            <input class="exp-month-input" v-model="newCreditCard.exp_month" maxlength='2' placeholder="MM"> /
            <input class="exp-year-input" v-model="newCreditCard.exp_year" maxlength='2' placeholder="YY">
          </label>
        </div>
        <!-- ccv -->
        <div class="ccv-input-area">
          <label>
            <input class="ccv-input" v-model="newCreditCard.cvc" placeholder="CCV" maxlength='3'>
          </label>
        </div>

      </div>

      <!-- 住所　いるのかな -->
      <div class="zip-input-area">
        <label>
          <input class="zip-input" v-model="newCreditCard.address_zip" placeholder="住所">
        </label>
      </div>

    </div>

    <!-- 注文確定ボタン -->
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
import NavBar from '~/components/NavBar.vue'
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
      // オーダーが入った時に作るID
      orderid: '',
      // タレントの画像
      tfile: '',
      // タレントビデオの値段
      amount: '',
      // エラー文の取得
      errors: [],
      // ログイン中のユーザー
      currentUser: null,
      // 成功した時のコメント
      sources: {},
      // ストライプの顧客データの初期化？
      stripeCustomerInitialized: false,
      // クレジットのデータ
      newCreditCard: {
        number: '',
        cvc: '',
        exp_month: null,
        exp_year: null,
        address_zip: ''
      },
      // 料金
      charges: {},
      // 決済時のクレジットデータと料金の取得
      newCharge: {
        source: null,
        amount: ''
      }
    }
  },
  components: {
    NavBar
  },
  // HTMLとか情報を読み込んだ後に発動？
  mounted() {
    // ログインしているかどうか
    firebase.auth().onAuthStateChanged(firebaseUser => {
      // もしログインしてるなら
      if (firebaseUser) {
        console.log('ログインしてる');
        this.currentUser = firebaseUser;
        // リッスンの発火
        this.listen();
        // してない場合
      } else {
        console.log('ログインしてないぞ');
        this.currentUser = null;
      }
    });

    // routeのidを取得
    var tid = this.$nuxt.$route.params.id
    // データベースを定義
    var database = firebase.database();

    // それぞれの取得したい子要素を定義
    // タレントの画像
    var datatfile = database.ref('talents/' + tid + '/tfile');
    // タレントビデオの料金
    var dataamount = database.ref('talents/' + tid + '/amount');

    // タレントの画像の取得、格納
    datatfile.on('value', snapshot => {
      if (snapshot) {
        const tfile = snapshot.val()
        this.tfile = tfile
      }
    })

    // タレントの料金の取得、格納
    dataamount.on('value', snapshot => {
      if(snapshot) {
        const amount = snapshot.val()
        this.newCharge.amount = amount
      }
    })

  },

  // 何かされると発動するやつら
  methods: {

    // active押すとfalseへ切り替え
    active() {
      this.isActive = !this.isActive
    },

    // leftactive押すとfalseへ切り替え
    leftactive() {
      this.isActive = !this.isActive
    },

    // ログインした時に発動される（ mountedのthis.listen ）
    listen: function() {

      // firestorageにstripe_customersを作り、uidを取得？して
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).onSnapshot(snapshot => {
        // 今のstripeCustomerInitializedに入れる？？（　自信ない　）
        this.stripeCustomerInitialized = (snapshot.data() !== null);
        // ストライプのパブリッシュキーをストライプに渡します（　おそらく　）
        Stripe.setPublishableKey('pk_test_QJEarN1JjibVSItD1ehS0zac00W80CFyt4');

      }, () => {
        // それが終わるとまたfalseに戻す？？
        this.stripeCustomerInitialized = false;
      });

      // firestorageのstripe_customersのuidの中のソース（　クレジット情報　）を取得し、
      firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('sources').onSnapshot(snapshot => {
        // 新しいクレジット情報を定義
       let newSources = {};
       // 取れたクレジット情報をそれぞれ
        snapshot.forEach(doc => {
          // 何かに入れている？
          const id = doc.id;
          newSources[id] = doc.data();
        })
        // クレジット情報を新しいクレジット情報に入れる？
        this.sources = newSources;

      }, () => {
        // からにする？
        this.sources = {};
      });

      // クレジット情報と同じ感じで料金も取得していく感じ？
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

    // オーダー確定ボタンが押されて発動
    orderbtn() {

      // ログインしてルカ
      try {
        // ユーザーの中にorderinthepastを保存
        firebase.auth().onAuthStateChanged(function(user) {
          // ログインしてる場合
          if (user) {
            console.log('OK')
          }
        });
      } catch (e) {
        alert('ログインしていません')
        return;
      }

      // 他人に送る場合
      if (this.isActive == true) {

        // 全て入力されたかどうか
        if (this.yourname && this.sendname && this.videomessage) {

          // databaseのorderまでを定義
          const ref_order = firebase.database().ref().child('order');

          // オーダーIDをpushで作りdatabaseのorderの下に保存し、ついでにそのkeyを取得してorderid（変数？）に入れる
          this.orderid = ref_order.push({}).key;

          // さっき獲得したorderidをdatabaseに入れたりと再利用できるように、orderidに入れてる
          var orderid = this.orderid

          // さっき入れたorderidまでのdetabaseを定義
          const ref_orderid = firebase.database().ref().child('order').child(orderid);

          // その下にデータを保存
          ref_orderid.set({
            IndexForWho: '0',
            from: this.yourname,
            orderTextData: this.videomessage,
            to: this.sendname
          });

          // ユーザーの中にorderinthepastを保存
          firebase.auth().onAuthStateChanged(function(user) {

            // ログインしてる場合
            if (user) {

              // 購入者に注文確認メールを送ります
              const sendMail = firebase.functions().httpsCallable('sendMail');
              // let parent = this
              sendMail({destination: user.email}).then(function (result) {
                // ここに何も書かないと寂しいのでとりあえずコンソールログを書いているだけ
                console.log(user.email);

              })

              // サーバーに保存された時間をタイムスタンプってやつで取得してる
              var timestamp = firebase.database.ServerValue.TIMESTAMP

              // ユーザーのdatabaseにorderinthepastってやつを作り、その下にorderidを入れてる
              const ref_order_user = firebase.database().ref().child('users').child(user.uid).child("orderInThePast").child(orderid);

              // その下にまたorderidを入れてます←おかしい　実際はタイムスタンプをkeyにしてorderidをvalueとして保存したい　タイムスタンプをkeyにするのができない
              ref_order_user.set({
                orderid
              })

              // ログインしてないとき
            } else {
              // 報告
              alert('ログインしていません')
              // 処理の終了？
              return;
            }
          });

          // 注文が完了したら入力内容の消去
          this.yourname = "",
          this.sendname = "",
          this.videomessage = ""


        // 入力されてない場合のエラー
        } else {
          alert("入力されてない欄があります")
          // 処理の終了？
          return;
        }

        // 自分に送る場合
      } else {

        // 全て入力されたか
        if (this.yourname && this.videomessage) {

          // あとは上と同じ感じ　orderまで定義
          const ref_order = firebase.database().ref().child('order');

          // orderidをpushで作り、keyの取得
          this.orderid = ref_order.push({}).key;

          var orderid = this.orderid

          const ref_orderid = firebase.database().ref().child('order').child(orderid);

          ref_orderid.set({
            IndexForWho: '1',
            orderTextData: this.videomessage,
            to: this.yourname
          });

          // ログインしてるかどうか
          firebase.auth().onAuthStateChanged(function(user) {

            // ログインしてるなら
            if (user) {

              // 購入者に確定メールを送る
              const sendMail = firebase.functions().httpsCallable('sendMail');
              let parent = this
              sendMail({destination: user.email}, ).then(function (result) {
                // 寂しいので書いてる
                console.log(user.email);
              })

              // タイムスタンプの取得
              var timestamp = firebase.database.ServerValue.TIMESTAMP

              const ref_order_user = firebase.database().ref().child('users').child(user.uid).child("orderInThePast").child(orderid);

              // これも同様おかしい
              ref_order_user.set({
                orderid
              })

              // ログインしていない場合
            } else {
              alert('ログインしていません')
              return;
            }
          });

          // 注文が完了したら入力内容の消去
          this.yourname = "",
          this.videomessage = ""

          // 入力漏れ
        } else {
          alert("入力されてない欄があります")
        }

      }

      // ストライプのトークンを作るみたい　それぞれの保存
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
          // うまくいったらトークンをファイアストアに保存　トークンIDとか
          firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('tokens').add({token: response.id}).then(() => {

            // 料金とソースを取得する？　firestoreに保存？
            firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
              source: this.newCharge.source,
              amount: parseInt(this.newCharge.amount)

              // それができたら
            }).then(() => {

              // 報告
              alert('購入が完了しました');

              // 入力していたカード情報を消します
              this.newCreditCard = {
                number: '',
                cvc: '',
                exp_month: '',
                exp_year: '',
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

h2, h3, h4, p {
  color: #4d4d4d;
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


/* クレジット */
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
  display: block;
}

.exp-month-input {
  width: 33px;
}

.exp-year-input {
  width: 33px;
}

.ccv-input {
  width: 84px;
}

.zip-input {
  width: 100%;
}


/* PC */
@media (min-width: 769px) {

.top-talents-content {
  left: 20%;
}

.order-contents {
  margin: 100px 20% 60px;
}

.card-add-form {
  margin: 20px 30% 60px;
}

.order-confirm-content button {
  width: 40%;
}


}






</style>
