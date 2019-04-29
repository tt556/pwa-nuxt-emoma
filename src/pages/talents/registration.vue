<template>

  <div class="container">

    <div class="talents-page-content">
      <div class="top-backimage">
        <div class="logo-content">
          <div class="service-title">
            <h1>emoma!</h1>
          </div>
          <div class="catch-copy">
            <p>大好きなあの人から、<br>あなただけのビデオレター</p>
          </div>
        </div>
      </div>

      <div class="service-content">
        <div class="service-text">
          <div class="savice-title">
            <h2>サービスの説明</h2>
          </div>
          <div class="service-p">
            <p>ユーザーからビデオレターのリクエストを受けたら、ビデオレターを贈るサービスです。</p>
            <p>リクエストは自分用であったり、友達へのプレゼントであったりと様々です。</p>
          </div>
        </div>
        <div class="service-image">
          <img src="/img/service.png" alt="" width="100%">
        </div>
      </div>

      <div class="description">
        <div class="description-text">
          <p>具体的には、リクエストが入ってから、<span style="font-weight: bold">３回以内</span>に動画を撮影、アップロードしていただきます。</p>
          <p>動画は基本的に１本<span style="font-weight: bold">30秒程度</span>でお願いしております。</p>
        </div>
      </div>

      <div class="talents-use">

        <div class="talents-use-title">
          <h2>使い方</h2>
        </div>

        <div class="talents-use-text">
          <div class="talnets-use-text-p">
            <p>掲載後は基本的にリクエストがあるまで待つ形になります。　ぜひSNSなどを使用し、告知してください。</p>
          </div>
        </div>

        <div class="feature">

          <div class="feature-text">

            <div class="feature-img">
              <img src="/img/cansel.png" alt="" width="100px">
            </div>

            <div class="feature-p">
              <div class="feature-title">
                <p>キャンセル可能</p>
              </div>
              <div class="feature-texts">
                <p>悪意があるもの、自分のイメージに反するものなど、受けたくないリクエストはキャンセルすることが可能です。</p>
              </div>
            </div>

          </div>

          <div class="feature-text">

            <div class="feature-img">
              <img src="/img/cash.png" alt="" width="100px">
            </div>

            <div class="feature-p">
              <div class="feature-title">
                <p>自由な料金設定</p>
              </div>
              <div class="feature-texts">
                <p>動画の値段は自分で自由に設定することができます。　その価格のうち２５％を手数料としていただきます。</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="flow">
        <div class="flow-title">
          <h2>登録までの流れ</h2>
        </div>
        <div class="flow-text">
          <p>下記のフォームから登録の申請をお願いいたします。　運営で審査を行い、通過するとサイトに掲載されます。　審査は応募者様のSNSフォロワー数や活動などを総合的に考慮して行います。</p>
        </div>
      </div>


    </div>

    <div class="registration-form">

      <div class="registration-text">
        <h2>登録フォーム</h2>
      </div>

      <div class="category">
        <p>カテゴリーの選択</p>
      </div>
      <!-- <select-form/> -->
      <div class="select-form">
        <select name="category" v-model="talentscategory">
          <option value="YouTuber">YouTuber</option>
          <option value="VTuber">VTuber</option>
          <option value="TikToker">TikToker</option>
          <option value="ライバー">ライバー</option>
          <option value="タレント">タレント</option>
          <option value="俳優">俳優</option>
          <option value="女優">女優</option>
          <option value="インスタグラマー">インスタグラマー</option>
          <option value="ラッパー">ラッパー</option>
        </select>
      </div>

      <div class="talents-name talentsbox">
        <div class="talnets-name ttext">
          <p>名前</p>
        </div>
        <div class="talents-name-in tbox">
          <input v-model="tname" type="tname" placeholder="タレントの名前">
        </div>
      </div>

      <div class="talents-texts talentsbox">
        <div class="talnets-text ttext">
          <p>自己紹介文</p>
        </div>
        <div class="talents-textarea tbox">
          <textarea v-model="ttext" type="ttext" placeholder="タレントの自己紹介文"></textarea>
        </div>
      </div>

      <div class="talents-imgs talentsbox">
        <div class="talnets-img ttext">
          <p>プロフィール画像</p>
        </div>
        <div class="talents-img-in tbox">
          <input @change="fileButton" type="file" placeholder="タレントのトップ画像">
        </div>
      </div>

      <div class="talnets-btn">
        <button v-on:click="btnSubmit" class="btn btn-action" type="button" name="button">
          送信
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from '~/plugins/firebase'
import SelectForm from '~/components/SelectForm.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      // タレントのidとして使用する変数
      tid: '',
      // カテゴリー
      talentscategory: '',
      // タレントの名前
      tname: '',
      // タレントの文章
      ttext: ''
    }
  },
  components: {
    SelectForm
  },
  computed: {
    ...mapState(['filesname', 'blob']),
    ...mapGetters(['getfilesname'])
  },
  methods: {
    fileButton: function(e) {

      e.preventDefault();
      // Get file
      const files = e.target.files;
      // ファイルの名前をグローバル変数に入れる
      this.$filesname = files[0].name;
      console.log(files);
      console.log(this.$filesname);
      // 画像をBlob形式にして、グローバル変数のblobに入れる
      this.$blob = new Blob(files, { type: "image/jpeg" });
      console.log(this.$blob);
    },
    btnSubmit: function(e) {
      console.log(this.$filesname);
      // ストレージを選択し、定義
      const ref_upload = firebase.storage().ref('タレント/').child(this.$filesname);

      // Upload file
      ref_upload.put(this.$blob)

      // 格納するデータベースの選択、定義（タレントのカテゴリーをchildに入れる）
      const ref_talents = firebase.database().ref().child('talents');

      // tid(タレントのidとして使用)をカテゴリーの子要素としてpushし、ランダムにIDを作り、そのkey(id)をtidへ入れる
      this.tid = ref_talents.push({}).key;

      // データベースの選択、定義（カテゴリー下にtidをchildに入れる）
      const ref_talent = firebase.database().ref().child('talents').child(this.tid);

      // ストレージに入れた画像のURLを取得
      ref_upload.getDownloadURL().then(url => {
        // 取得したURLと名前、自己紹介文をtidの子要素してset
        ref_talent.set({
          tfile: url,
          tname: this.tname,
          ttext: this.ttext
        });

      }).catch(error => {
        console.log(error);

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

p {
  color: #4d4d4d;
}

h2 {
  color: #4d4d4d;
  font-size: 18px;
}

input {

}

.links {
  text-decoration: none;
}

.top-backimage {
  height: 100%;
  background: linear-gradient(150deg,#00f1e6 15%,rgba(214,56,255,.5) 65%), url(/img/backimage.png);
  background-position: center center;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-size: cover;
}

.logo-content {
  padding: 0px 0px;
}

.service-title {
  text-align: center;
}

.service-title h1 {
  color: #fff;
  font-size: 3.5em;
  margin-bottom: 20px;
  padding-top: 30px;
}

.catch-copy {
  margin-bottom: 50px;
  text-align: center;
}

.catch-copy p {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.service-content {
  margin: 30px 0 30px;
}

.service-text {
  margin-bottom: 20px;
}

.savice-title {
  text-align: center;
  margin-bottom: 20px;
}

.savice-title h2 {
  font-size: 18px;
  color: #4d4d4d;
}

.service-p {
  margin: 0 auto;
  width: 82%;
  color: #4d4d4d;
  font-weight: 500;
}

.service-p p {

}

.description {
  margin: 0 auto 20px;
  width: 82%;
}

.description-text {

}

.description-text p {

}

.talents-use {
  margin: 10px 0px 10px;
}

.talents-use-title {
  text-align: center;
  margin-bottom: 20px;
}

.talents-use-title h2 {
  color: #4d4d4d;
  font-size: 18px;
}

.talents-use-text {
  width: 82%;
  margin: 0 auto 30px;
}

.talents-use-text p {
}

.feature {
  margin-bottom: 20px;
}

.feature-text {
  margin-bottom: 30px;
}

.feature-img {
  width: 100px;
  margin: 0 auto 20px;
}

.feature-title {
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
}

.feature-texts {
  width: 82%;
  margin: 0 auto;
}

.flow {
  margin-bottom: 30px;
}

.flow-title {
  text-align: center;
  margin-bottom: 20px;
}

.flow-title h2 {
  color: #4d4d4d;
  font-size: 18px;
}

.flow-text {
  width: 82%;
  margin: 0 auto;
}

.registration-form {
  width: 80%;
  margin: 0 auto;
}

.registration-text {
  text-align: center;
  margin-bottom: 20px;
}

.select-form {
  margin-bottom: 30px;
}


select {
  width: 100%;
  height: 30px;
}

.category {
  margin-bottom: 20px;
}

.category p {

}

.talents-name input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
}

.ttext {
  margin-bottom: 20px;
}

.talents-name-in {

}

.tbox {

}

.talentsbox {
  margin-bottom: 30px;
}

textarea {
  width: 100%;
  height: 100px;
  border-radius: 10px
}

.talents-img-in input {

}

.talnets-btn {
  width: 200px;
  margin: 0 auto 20px;
}

button {
  border: 2px solid #4d4d4d;
  background-color: #fff;
  width: 200px;
  border-radius: 30px;
  padding: 10px 0;
  margin-bottom: 50px;
}





</style>
