<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <div class="container">
      <nav-bar/>
      <div class="talent-profile-top">
        <!-- タレントの画像の背景 -->
        <div class="back-img"></div>
        <div class="relative-box">
          <div class="img-logo">
            <!-- タレントの画像 -->
            <div class="talents-show-img">
              <img :src="tfile" alt="" width="100px" height="100px;">
            </div>
            <!-- ツイッターとかのロゴたち -->
            <div class="logos">
              <a href="{{ twitter }}">
                <i class="fab fa-twitter fa-lg"></i>
              </a>
              <a href="{{ instagram }}">
                <i class="fab fa-instagram fa-lg"></i>
              </a>
              <a href="{{ youtube }}">
                <i class="fab fa-youtube fa-lg"></i>
              </a>
              <a href="{{ other }}"></a>
              <i class="fas fa-link fa-lg"></i>
            </div>
          </div>

          <!-- タレントの名前と自己紹介 -->
          <div class="talent-profile-name-texts">
            <div class="talents-name">
              <div>{{ tname }}</div>
            </div>
            <div class="talents-profile-texts">
              <p>{{ ttext }}</p>
            </div>
          </div>

          <!-- タレントのカテゴリー -->
          <div class="category-boxes">
            <div class="category-box">
              <div class="category-name">{{ tcategory }}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- ビデオ -->
      <div class="talents-bottom-videos">
        <div class="latest-videos">
          <p>最新のビデオ</p>
        </div>
        <div class="videos">
          <!-- <p>公開可能なビデオはありません</p> -->
          <!-- <video src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/test5.MOV?alt=media&token=0c1b986a-6d16-463a-882e-fc6426d7b229" controls></video>
          <video :src="video" controls alt="" width="45%"></video>
          <video :src="videoo" controls alt="" width="45%"></video>
          <video src="/video/test2(1).MOV" controls width="200px"></video> -->
        </div>
      </div>
    </div>

    <!-- 下にfixで表示させる料金と予約へのボタン -->
    <div class="bottom-bar">

      <!-- 料金と日時 -->
      <div class="bar-contents">
        <div class="price">
          <p>¥{{ amount }}</p>
        </div>
        <div class="days">
          <p>通常２日でお届け</p>
        </div>
      </div>

      <!-- 予約ボタン -->
      <div class="bar-contents">
        <div class="to-order-box">
          <div class="to-order-btn">
            <nuxt-link class="deco" :to="{ name: 'talents-order-id', params: { id: tid}}">
              <p>予約する</p>
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from '~/plugins/firebase'
import NavBar from '~/components/NavBar.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      // タレントの
      // 名前
      tname: '',
      // 自己紹介文
      ttext: '',
      // 画像
      tfile: '',
      // id
      tid: '',
      // video
      video: '',
      videoo: '',
      // カテゴリー
      tcategory: '',
      // 料金
      amount: '',
      //SNS
      twitter: '',
      instagram: '',
      YouTube: '',
      Other: ''
    }
  },
  components: {
    NavBar
  },

  // HTMLとかが読み込まれると発動？
  mounted() {
    // routeのidを取得
    var tid = this.$nuxt.$route.params.id
    this.tid = tid
    // データベースを定義
    var database = firebase.database();
    // それぞれの取得したい子要素を定義
    var datatname = database.ref('talents/' + tid + '/tname');
    var datatext = database.ref('talents/' + tid + '/ttext');
    var datatfile = database.ref('talents/' + tid + '/tfile');
    var datacategory = database.ref('talents/' + tid + '/category');
    var dataamount = database.ref('talents/' + tid + '/amount');
    var datavideo = database.ref('talents/' + tid + '/video' + "/1");
    var datavideoo = database.ref('talents/' + tid + '/video' + "/2");
    var dataTwitter = database.ref(''talents/' + tid + '/sns' + "/twitter"');
    var dataInstagram = database.ref(''talents/' + tid + '/sns' + "/instagram"');
    var dataYoutube = database.ref(''talents/' + tid + '/sns' + "/youtube"');
    var dataOther = database.ref(''talents/' + tid + '/sns' + "/other"');


    // tnameの取得、格納
    datatname.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const tname = snapshot.val()
        // 余裕ができたらtalentで取得し、以下要素をいちいち定義しないで取れるようにする
        // var talent = []
        // データオヴジェクトを配列に変更
        // object.keys(rootTalent).forEach((val, key) => {
        //   rootTalent[val].id = val
        //   talent.push(rootTalent[val])
        // })
        this.tname = tname
      }
    }),

    // ttextの取得、格納
    datatext.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const ttext = snapshot.val()
        this.ttext = ttext
      }
    }),

    // tfileの取得、格納
    datatfile.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const tfile = snapshot.val()
        this.tfile = tfile
      }
    }),

    // ビデオの取得
    datavideo.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const video = snapshot.val()
        this.video = video
      }
    }),

    datavideoo.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const videoo = snapshot.val()
        this.videoo = videoo
      }
    }),

    // カテゴリーの取得
    datacategory.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const tcategory = snapshot.val()
        this.tcategory = tcategory
      }
    }),

    // 料金の取得
    dataamount.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const amount = snapshot.val()
        this.amount = amount
      }
    }),

    //SNSの取得
    //twitter
    dataTwitter.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const twitter = snapshot.val()
        this.twitter = twitter
      }
    }),

    dataInstagram.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const instagram = snapshot.val()
        this.instagram = instagram
      }
    }),

    dataYoutube.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const youtube = snapshot.val()
        this.youtube = youtube
      }
    }),

    dataOther.on('value', snapshot => {
      if (snapshot) {
        console.log(snapshot.val())
        const other = snapshot.val()
        this.other = other
      }
    })


  }
}
</script>

<style scoped>
body {
  font-family: "Noto Sans CJK JP", "NotoSansCJKjp", "FontAwesome", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
  color: #4d4d4d;
  font-weight: 600;
}
/* talents show page */

/* show page 背景　上部のみ */
.back-img {
  position: absolute;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(150deg,#00f1e6 10%,rgba(214,56,255,.5) 65%);
}

/* タレントの画像とプロフィール */
.relative-box {
  position: relative;
  left: 30px;
  top: 45px;
  width: 90%;
}

.talents-show-img {
}

.talents-show-img img {
  border-radius: 50px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.img-logo {
  display: flex;
}

.logos {
  margin: 60px 0 0 60px;
  display: flex;
}

.logos i {
  margin-right: 20px;
  color: #000;
}

.talents-show-img video {
  border-radius: 50px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
}

.talent-profile-name-texts {
  margin: 10px 0;
}

.talents-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.talents-profile-texts {
  border-bottom: 15px;
}

.category-name {
  border-radius: 20px;
  /* box-shadow: 0 1px 12px -5px hsla(0,0%,54.9%,.9); */
  box-sizing: border-box;
  display: inline-block;
  margin: 10px 12px 16px 0;
  /* background-color: #f0f0f0; */
  line-height: normal;
  padding: 6px 16px;
  border: 1px solid #4d4d4d;
}

.talents-bottom-videos {
  margin: 70px 5px 5px 5px;
}

.latest-videos p {
  margin-left: 25px;
  font-size: 18px;
  font-weight: 600;
}

/* フッター固定バー */

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10%;
  background: rgba(255,255,255,0.7);
  display: flex;
}

.bar-contents {
  margin: 5px 10px;
  width: 50%;
  text-align: center;
}

.price p {
  margin: 0;
  color: #FC437B;
  font-size: 18px;
  font-weight: 600;
}

.days p {
  margin: 2px 0 0 0;
  font-size: 14px;
}

.deco {
  text-decoration: none;
  text-align: center;
}

.to-order-btn p {
  background: linear-gradient(150deg,#00f1e6 10%,rgba(214,56,255,.5) 65%);
  border-radius: 25px;
  padding: 10px;
  margin: 5px;
  color: #fff;
  font-weight: 600;
}

/* PC */
@media (min-width: 769px) {

.relative-box {
  left: 20%;
  width: 80%;
}

.talents-bottom-videos {
  margin: 70px 20% 10px;
}

.latest-videos p {
  margin: 0;
}

.bottom-bar {
  width: 60%;
  margin: 10px 20%;
}

}

</style>
