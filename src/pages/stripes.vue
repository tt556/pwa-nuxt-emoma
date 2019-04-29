<template>
  <div>
    <script src="https://js.stripe.com/v2/"></script>
  <!-- // <script src="https://unpkg.com/vue/dist/vue.js"></script> -->
    <div class="container">
      <div id="app">

        <div id="firebaseui-auth-container"></div>
        <div id="loader">&hellip;</div>
        <div v-if="currentUser">
          <h2>Hello {{ currentUser.email }},</h2>
          <button v-on:click="signOut">Sign out</button>
          <div v-if="stripeCustomerInitialized">
            <h3>クレジットカード</h3>

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

              <div>
                <button v-on:click="submitNewCreditCard">登録</button>
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
                  <option v-for="(source, id) in sources" :key="id" v-bind:value="source.id" v-if="source.id">
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
            </div>

          </div>
          <div v-else>&hellip;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
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
  mounted() {
    // 多分ログインしたらってやつ
    Stripe.setPublishableKey('pk_test_QJEarN1JjibVSItD1ehS0zac00W80CFyt4');
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        document.getElementById('loader').style.display = 'none';
        this.currentUser = firebaseUser;
        this.listen();
      } else {
        firebaseUI.start('#firebaseui-auth-container', firebaseAuthOptions);
        this.currentUser = null;
      }
    });
  },
  ready: () => {

  },
  methods: {
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

    // クレジットの追加で発動　addbtn トークンを作るみたい　情報の取得
    submitNewCreditCard: function() {
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
            this.newCreditCard = {
              number: '',
              cvc: '',
              exp_month: 1,
              exp_year: 2017,
              address_zip: ''
            };
          });
        }
      });
    },

    // チャージを押したら発動　チャージの子要素として情報を格納
    submitNewCharge: function() {
      firebase.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
        source: this.newCharge.source,
        amount: parseInt(this.newCharge.amount)
      });
    },

    // サインアウト
    signOut: function() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>

body {
  font-size: 16px;
  color: #4d4d4d;
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
  width: 250px;
  margin: 20px auto;
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
  width: 144px;
  margin-left: 20px;
}

.zip-input {
  width: 100%;
}

</style>
