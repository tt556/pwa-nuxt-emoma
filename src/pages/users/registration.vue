<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です<br>
      <button v-on:click="logout">ログアウト</button><br>
      <!-- <a href="/member-page">メンバーページへ</a> -->
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      メール<br>
      <input type="text" v-model="email"><br>
      パスワード<br>
      <input type="password" v-model="password"><br>
      <button v-on:click="login">ログイン</button><br>
      <button v-on:click="signUp">Register</button>
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
        this.$router.push("/talents/top")
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
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>
