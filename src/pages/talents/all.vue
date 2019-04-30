<template id="">
  <div class="container">
    <nav-bar/>
    <!-- 検索バー -->
    <div class="search">
      <!-- <input type="search" name="search" placeholder="検索する"> -->
    </div>
    <!-- タレントのカテゴリーとイメージ -->
    <div class="talentbox">
      <div class="talent-category">
        <h2>テレビタレント</h2>
      </div>
      <div class="talents">
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4jV015mvJlM9-crKY">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F7.jpeg?alt=media&token=87ded474-b4ff-483c-b01a-7cecd3978e6b" alt="YOUTUBER" width="160px" height="200px">
          </nuxt-link>
        </div>
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4kVNEKHtTfnaWi-aJ">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F1.jpeg?alt=media&token=c5c8ce90-3ee6-4f03-be67-8d06a3ce7d1f" alt="YOUTUBER" width="160px" height="200px">
          </nuxt-link>
        </div>
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4khO5LwtY3VpXPvjk">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F2.jpeg?alt=media&token=c5ad411b-7d04-45bd-ae84-dd062107572e" alt="YOUTUBER" width="160px" height="200px">
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- タレントのカテゴリーとイメージ -->
    <div class="talentbox">
      <div class="talent-category">
        <h2>YOUTUBER</h2>
      </div>
      <div class="talents">
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4knVZgDGOZtemmLLb">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F3.jpeg?alt=media&token=9f3efff4-25ad-4230-9667-8aa7529ad0f5" alt="" width="160px">
          </nuxt-link>
        </div>
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4kxWvkVXajCuDbUKO">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F4.jpeg?alt=media&token=b6aba1f4-fc86-4950-b6b1-16e4d12039d8" alt="" width="160px">
          </nuxt-link>
        </div>
        <div class="talent-img">
          <nuxt-link to="/talents/show/-Ld4l3IEaHxq4x3ps360">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F5.jpeg?alt=media&token=c5a25d79-58a0-44c3-9f90-42353484f0be" alt="" width="160px">
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- タレントのカテゴリーとイメージ -->
    <div class="talentbox">
      <div class="talent-category">
        <h2>ラッパー</h2>
      </div>
      <div class="talents">
        <div class="talent-img">
          <nuxt-link to="/talents/show/-LdgjscfJ_CKD6IZtxYq">
            <img src="https://firebasestorage.googleapis.com/v0/b/push-bc760.appspot.com/o/%E3%82%BF%E3%83%AC%E3%83%B3%E3%83%88%2F%E3%82%8A%E3%82%8B%E3%81%A6%E3%82%99%E3%81%B2%E3%82%99.jpg?alt=media&token=49abf65f-0c68-48bf-8a1b-9e6814b3e86c" alt="" width="160px">
            <p>りるでび a.k.a 中村めい 😈</p>
          </nuxt-link>
        </div>
        <div class="talent-img">
          <img src="/img/sample-image.png" alt="YOUTUBER" width="160px">
        </div>
      </div>
    </div>

    <!-- タレントのカテゴリーとイメージ -->
    <div class="talentbox">
      <div class="talent-category">
        <h2>インスタグラマー</h2>
      </div>
      <div class="talents">
        <div class="talent-img">
          <img src="/img/sample-image.png" alt="YOUTUBER" width="160px">
        </div>
        <div class="talent-img">
          <img src="/img/sample-image.png" alt="YOUTUBER" width="160px">
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

    }
  },
  components: {
    NavBar
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
      } else {
        // No user is signed in.
        console.log('ログインしてない')
      }
    });;
  }
}
</script>

<style scoped>
body {
  font-family: "Noto Sans CJK JP", "NotoSansCJKjp", "FontAwesome", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
  color: #4d4d4d;
  font-weight: 600;
}
/* talentspage */
/* 検索 */
.search {
  text-align: center;
  margin: 40px 0 0 0;
}

input[type="search"] {
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 16px;
  margin: 20px 0;
  padding: 10px;
  width: 250px;
}

  /* タレント一覧 */
.talentbox {
  margin: 15px 5px 35px 5px;
}

.talent-category {
  margin: 5px 0 5px 10px;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

  /* 画像スライド */
.talents {
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
  width: auto;
}

.talents::-webkit-scrollbar {
  /* display: none;
  height: 0 !important; */
}

  /* タレントの写真 */
.talent-img {
  /* display: flex;
  align-items: flex-start; */
  /* display: inline-block; */
  width: 850px;
  -webkit-overflow-scrolling: touch;
}

.talent-img > * {
  -webkit-transform: translateZ(0px);
}

.talent-img img {
  height: 200px;
  width: 160px;
  object-fit: cover;
  border-radius: 15px;
  margin: 0 5px;
  float: left;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
  position: relative;
}

.talent-img p {
  width: 150px;
  position: absolute;
  bottom: -95px;
  left: 20px;
  color: #fff;
  font-weight: 600;
  text-shadow: 0px 1px 1px #999;
}

.talnets-name {
  width: 160px;
}

</style>
