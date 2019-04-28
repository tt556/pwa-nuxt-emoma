<template>
  <div class="backimage">
    <div class="title-content">
      <div class="title-name">
        <h1>emoma!</h1>
      </div>
      <div class="catch-copy">
        <p>大好きなあの人から、<br>あなただけのビデオレター</p>
      </div>
      <div class="registration-content">
        <div class="input-content">
          <input type="text" v-model="email" placeholder="　メールアドレス"><br>
          <input type="password" v-model="password" placeholder="　パスワード"><br>
        </div>
        <div class="button-content">
          <button v-on:click="login">ログイン</button><br>
          <button v-on:click="signUp">新規登録</button>
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
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      // userを定義？　あとで理解します
      this.setUser(user)

      if (user) {

        const ref_user = firebase.database().ref().child('users').child(user.uid);

        ref_user.set({
          email: user.email
        });

        console.log(user.uid);

      } else {

        console.log('ログインしてない！')

      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        this.$router.push("/talents/all")
      }).catch((error) => {
        alert(error)
      });
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
      }).catch((error) => {
        alert(error)
      })
    },
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Create account: ', user.email)
          this.$router.push("/talents/all")
        })
        .catch(error => {
          alert(error.message)
        })
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

input {
  border: 1px solid #ccc;
  border-radius: 20px;
  line-height: 2.5;
  width: 200px;
  margin-bottom: 10px;
  font-size: 15px;
}

button {
  background-color: #fff;
  border-radius: 20px;
  border: none;
  line-height: 2;
  font-size: 14px;
  margin: 0 5px 0 5px;
  padding: 5px 15px;
  color: #4d4d4d;
  font-weight: 600;
}

.backimage {
  background: linear-gradient(150deg,#00f1e6 15%,rgba(214,56,255,.5) 65%);
  height: 100vh;
}

.title-content {
  padding: 100px 30px;
}

.title-name {
  text-align: center;
  margin-bottom: 30px;
}

.title-name h1 {
  color: #fff !important;
  font-size: 4.5em;
}

.catch-copy {
  margin-bottom: 50px;
  text-align: center;
}

.catch-copy p {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.registration-content {

}

.input-content {
  text-align: center;
  margin-bottom: 20px;
}

.button-content {
  text-align: center;
  display: flex;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
}



</style>
