<template>
  <div id="app">
    <div class="top-talents-content">
      <div class="top-talents-img">
        <img src="/img/sample-image-show.png" alt="">
      </div>
    </div>
    <div class="order-contents">
      <div class="order-content">
        <div class="question-text">
          <p>誰のためのビデオですか？</p>
        </div>
        <div class="select-form">
          <button class="form-left" v-bind:class="{active:isActive}" @click="leftactive">他人</button>
          <button class="form-right" v-bind:class="{active:!isActive}" @click="active">自分</button>
        </div>
      </div>
      <div class="order-content">
        <div class="question-text">
          <p>あなたの名前は？</p>
        </div>
        <input type="text" v-model="yourname" placeholder="あなたの名前">
      </div>
      <div class="order-content" v-if="isActive">
        <div class="question-text">
          <p>贈る人の名前は？</p>
        </div>
        <input type="text" v-model="sendname" placeholder="送る人の名前">
      </div>
      <div class="order-content">
        <div class="question-text">
          <p>どんなビデオをご希望ですか？</p>
        </div>
        <textarea name="name" rows="8" cols="80" v-model="videomessage" placeholder="希望のビデオ内容"></textarea>
      </div>
    </div>

    <!-- <div class="container">
      <div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">&hellip;</div>
        <div v-if="currentUser">
          <h2>Hello {{ currentUser.email }},</h2> -->

          <!-- <button v-on:click="signOut">Sign out</button> -->
          <!-- <div v-if="stripeCustomerInitialized"> -->

            <!-- <h3>Credit Cards</h3>
            <ul>
              <li v-for="source in sources" :key="source.id">
                <span v-if="source.id">
                  {{ source.brand }} &hellip;{{ source.last4 }}
                  (exp. {{ source.exp_month }}/{{ source.exp_year }})
                </span>
                <span v-else>&hellip;</span>
              </li>
            </ul>
            <div class="card-add-form">
              <h4>New</h4>
              <div class="number-input-area">
                <label>
                  <input class="number-input" v-model="newCreditCard.number" placeholder="Card number">
                </label>
              </div>
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
              <div class="zip-input-area">
                <label>
                  <input class="zip-input" v-model="newCreditCard.address_zip" placeholder="住所">
                </label>
              </div>
              <div>
                <button v-on:click="submitNewCreditCard">add</button>
                {{ newCreditCard.error }}
              </div>
            </div>
            <h3>Charges</h3>
            <ul>
              <li v-for="(charge, id) in charges" :key="id">
                {{ charge.amount }}
                <span v-if="charge.error">
                  {{ charge.error }}
                </span>
                <span v-else-if="charge.outcome">
                  {{ charge.outcome.seller_message }}
                  {{ charge.source.brand }} &hellip;{{ charge.source.last4 }}
                  (exp. {{ charge.source.exp_month }}/{{ charge.source.exp_year }})
                </span>
                <span v-else>&hellip;</span>
              </li>
            </ul>
            <h4>New</h4>
            <div>
              <label>
                Card
                <select v-model="newCharge.source">
                  <option :value="null">Default payment method</option>
                  <option v-for="(source, id) in sources" v-bind:value="source.id" v-if="source.id" :key="id">
                    {{ source.brand }} &hellip;{{ source.last4 }}
                    (exp. {{ source.exp_month }}/{{ source.exp_year }})
                  </option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Amount <input v-model="newCharge.amount">
              </label>
            </div>
            <div>
              <button v-on:click="submitNewCharge">Charge</button>
              {{ newCharge.error }}
            </div> -->

          <!-- </div> -->
          <!-- <div v-else>&hellip;</div> -->

        <!-- </div>
      </div>
    </div> -->

    <div class="bottom-bar">
      <div class="order-confirm-content">
        <div class="order-confirm-btn">
          <button @click="orderbtn">¥3000円で確定する</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import 'firebase/firestore'
// import Stripe from 'stripe'
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
        amount: 2000
      }
    }
  },
  // computed: {
  //   ...mapState(['orderid']),
  //   ...mapGetters(['getorderid'])
  // },
  // mounted() {
  //   firebase.auth().onAuthStateChanged(firebaseUser => {
  //     if (firebaseUser) {
  //       document.getElementById('loader').style.display = 'none';
  //       this.currentUser = firebaseUser;
  //       this.listen();
  //     } else {
  //       firebaseUI.start('#firebaseui-auth-container', firebaseAuthOptions);
  //       this.currentUser = null;
  //     }
  //   });
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
    orderbtn() {
      console.log(this.yourname);
      console.log(this.sendname);
      console.log(this.videomessage);
      console.log(this.isActive);

      // 他人に送る場合
      if (this.isActive == true) {

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

        // 自分に送る場合
      } else {

        const ref_order = firebase.database().ref().child('order');

        this.orderid = ref_order.push({}).key;

        const ref_orderid = firebase.database().ref().child('order').child(this.orderid);

        ref_orderid.set({
          IndexForWho: '1',
          orderTextData: this.videomessage,
          to: this.yourname,
          // startedAt: firebase.database.ServerValue.TIMESTAMP
        });


      }
    }

    // listen: function() {
    //   // ファイアストレージにUIDとかを保存
    //   firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).onSnapshot(snapshot => {
    //     this.stripeCustomerInitialized = (snapshot.data() !== null);
    //   }, () => {
    //     this.stripeCustomerInitialized = false;
    //   });
    //   firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('sources').onSnapshot(snapshot => {
    //    let newSources = {};
    //     snapshot.forEach(doc => {
    //       const id = doc.id;
    //       newSources[id] = doc.data();
    //     })
    //     this.sources = newSources;
    //   }, () => {
    //     this.sources = {};
    //   });
    //   firebase.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('charges').onSnapshot(snapshot => {
    //   let newCharges = {};
    //    snapshot.forEach(doc => {
    //      const id = doc.id;
    //      newCharges[id] = doc.data();
    //    })
    //    this.charges = newCharges;
    //   }, () => {
    //     this.charges = {};
    //   });
    // },
    //
    // // クレジットの追加で発動　addbtn トークンを作るみたい　情報の取得
    // submitNewCreditCard: function() {
    //   Stripe.card.createToken({
    //     number: this.newCreditCard.number,
    //     cvc: this.newCreditCard.cvc,
    //     exp_month: this.newCreditCard.exp_month,
    //     exp_year: this.newCreditCard.exp_year,
    //     address_zip: this.newCreditCard.address_zip
    //   }, (status, response) => {
    //     if (response.error) {
    //       // 失敗したらエラーメッセージ
    //       this.newCreditCard.error = response.error.message;
    //     } else {
    //       // うまくいったらトークンをファイアストアに保存
    //       firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('tokens').add({token: response.id}).then(() => {
    //         this.newCreditCard = {
    //           number: '',
    //           cvc: '',
    //           exp_month: 1,
    //           exp_year: 2017,
    //           address_zip: ''
    //         };
    //       });
    //     }
    //   });
    // },
    //
    // // チャージを押したら発動　チャージの子要素として情報を格納
    // submitNewCharge: function() {
    //   firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
    //     source: this.newCharge.source,
    //     amount: parseInt(this.newCharge.amount)
    //   });
    // },

  }
}
</script>

<style scoped>
/* 注文ページ */
/* タレントの画像 */
.top-talents-content {
  margin: 10px 30px;
}

.top-talents-img img {
  border-radius: 50px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
  width: 100px;
}

/* 質問 */

.order-contents {
  margin: 30px;
}

.order-content {
  margin: 15px 0;
}

.question-text p {
  margin: 0;
  font-size: 18px;
}

/* 自分か他人かを選ぶ */
.select-form {
  display: flex;
  width: max-content;
  margin: 20px auto;
}

.form-left {
  border-radius: 10px 0 0 10px;
  border: 1px solid #ccc;
  padding: 10px 40px;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
}

.form-right {
  border-radius: 0px 10px 10px 0;
  border: 1px solid #ccc;
  padding: 10px 40px;
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
  width: 250px;
}

textarea {
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 18px;
  margin: 20px 0;
  padding: 10px;
  width: 250px;
}

/* footerの注文確定ボタン */
.order-confirm-content {
  width: 100%;
  text-align: center;
}

.order-confirm-content button {
  margin: 10px auto;
  font-size: 16px;
  font-weight: 600;
  background-color: aqua;
  padding: 5px;
  width: 80%;
  border-radius: 10px;
}
</style>
