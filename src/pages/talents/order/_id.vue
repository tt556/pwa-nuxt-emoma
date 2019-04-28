<template>
  <div id="app">
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

      errors: []
    }
  },
  mounted() {
    // routeのidを取得
    var tid = this.$nuxt.$route.params.id
    console.log(tid)
    // データベースを定義
    var database = firebase.database();
    // それぞれの取得したい子要素を定義
    var datatfile = database.ref('talents/' + tid + '/tfile');

    // tfileの取得、格納
    datatfile.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const tfile = snapshot.val()
        this.tfile = tfile
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
    }
  }
}
</script>

<style scoped>
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
</style>
