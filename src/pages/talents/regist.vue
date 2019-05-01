<template>
  <div class="">
    <!-- FontAwesomeを使うためにlinkタグを追記しました -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <!-- GoogleFontインポート -->
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet">
    <!-- bootstrapインポート -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <nav class="head bg-dark navbar navbar-expand-lg navbar-dark ">
      <a class="navbar-brand" href="">emoma!</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#footer">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#pricing">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#cta">Download</a>
          </li>
        </ul>

      </div>
    </nav>

    <div id="title">

      <div class="title-wrapper">
        <div class="service-title">
          <h1 class="text-dark">emoma!タレント申請</h1>
        </div>
        <div class="catch-copy">
          <p class="title-p text-dark">あこがれのあの人から、<br>あなただけのビデオレター</p>
        </div>
      </div>

      <div class="">
        <h2 class="text-white gradient-wrapper">emoma![エモマ]って？</h2>
      </div>

      <div id="introduction" class="introduction-wrapper bg-white">

        <div class="introduction-text">

          <div class="introduction-content introduction-1">
            <i class="fas fa-question-circle fa-3x text-dark icon"></i>
            <p class="text-black">emoma!はユーザーさん(あなたのファン)がタレントさん(あなた)からビデオレターがもらえるアプリです。</p>
            <img class="image" src="/img/service-overview.png" alt="">
          </div>

          <div class="introduction-content introduction-2">
            <i class="fas fa-coins fa-4x text-dark icon"></i>
            <p class="text-black">emoma!は夢を追いかけるタレントさん、クリエイターさんが収入を得ること支援します。<br>emoma!上でビデオレターを販売することにより30秒の動画撮影だけで収入を得ることができます。</p>
          </div>

          <div class="introduction-content introduction-3">
            <i class="far fa-smile-wink fa-4x text-dark icon"></i>
            <p>ビデオレターを通じて応援してくれるファンの方との親密度も高めることができます。<br>もちろんあなたのファンの笑顔も見れます！😆</p>
          </div>

        </div>

        <div class="seni bg-primary">
          <a href="#registration" class="text-white">登録フォームへ</a>
        </div>

      </div>
      <!-- 追加しました -->
      <div class="">
        <h2 class="winwin-h2 gradient-wrapper text-white">Win-Winの関係</h2>
      </div>

      <div id="winwin" class="service-winwin">
        <div class="container">
          <div class="row">

            <div class="tarent-winwin col col-lg-6 col-md-12">
              <p class="winwin-p">タレント</p>
              <i class="far fa-user fa-4x icon-winwin"></i>
              <i class="fas fa-mobile-alt fa-4x icon-winwin"></i>
              <p>
                たった30秒だけで収入が得られる!<br>
                ファンサービスに!</p>
            </div>

            <div class="user-winwin col col-lg-6 col-md-12">
              <p class="winwin-p">ユーザー</p>
              <i class="far fa-grin-squint fa-4x icon-winwin"></i>
              <i class="far fa-heart fa-4x"></i>

              <p>あなたのファンを笑顔に!<br>
                もっとあなたのことが好きになる!</p>
            </div>

          </div>
        </div>
      </div>
      <!-- ここまで -->

      <div id="copy">
        <h2 class="text-light">あなたの手のひらから<br>最高のサプライズを</h2>
      </div>
      <div class="">
        <h2></h2>
      </div>
      <div id="payment-frow" class="container">
        <h2>ご報酬までの流れ</h2>
        <div class="box">
          <div class="box-content box1">
            <h3><i class="fas fa-check"></i>emoma!タレント登録</h3>
              <p>下記フォームから簡単に登録できます♪</p>
          </div>
          <div class="box-content box2">
            <h3><i class="fas fa-check"></i>ビデオを作成</h3>
              <p>予約が入ったら要望に沿ってビデオを作成して頂きます♪<br>例えばお誕生日のおめでとうコメントや励ましのメッセージが多いです。<br>あなたのブランドに合わない要望なら拒否することも可能です。</p>
          </div>
          <div class="box-content box3">
            <h3><i class="fas fa-check"></i>ビデオをアップロード!</h3>
              <p>後はビデオをアップロードするだけ！<br>凝った編集などはいりません♪</p>
          </div>
          <div class="box-content box4">
            <h3><i class="fas fa-check"></i>報酬のお振込</h3>
              <p>あなたの口座に報酬をお振込いたします♪<br>プラットフォーム手数料としてビデオ購入価格の25%がかかります。</p>
          </div>
        </div>

      </div>

      <div id="registration" class="registration-form">
        <div class="registration-text">
          <h2 class="form-titlelabel bg-dark text-white">登録フォーム</h2>
          <p class="text-secondary registration-p">*運営で審査を行い、通過するとサイトに掲載されます。審査はSNSフォロワー数や活動などを加味します。</p>
        </div>
        <div class="category talentsbox">
          <p class="form-label">カテゴリーの選択</p>
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
        </div>
        <!-- <select-form/> -->


        <div class="talents-name talentsbox">
          <div class="talnets-name ttext">
            <p class="form-label">名前</p>
            <input class="form-control" v-model="tname" type="tname" placeholder="　名前">
          </div>
        </div>

        <div class="talents-texts talentsbox">
          <p class="form-label">自己紹介文</p>
          <p class="amount-sub text-secondary">*プロフィールページに記載されます。<br><span class="text-danger">記載がない場合、「〇〇のビデオレターです」となります。</span></p>
          <div class="talents-textarea tbox">
            <textarea class="form-control" v-model="ttext" type="ttext" placeholder="50文字程度(例：佐々木愛です🤗emoemoというアイドルグループのリーダーです✨よろしくお願いします！😍)"></textarea>
          </div>
        </div>

        <div class="talents-imgs talentsbox">
          <p class="form-label">プロフィール画像</p>
          <div class="talents-img-in tbox">
            <input @change="fileButton" type="file" placeholder="タレントのトップ画像">
          </div>
        </div>

        <div class="talents-amount talentsbox">
          <p class="form-label">動画の値段</p>
          <div class="talents-amount-in tbox">
            <input class="form-control" v-model="amount" type="amount" placeholder="3000">
            <p class="amount-sub text-secondary">*<span class="text-danger">￥500〜¥10,0000で設定して下さい。</span>それ以外の場合3000円となります。</p>
            <p class="amount-sub text-secondary">*特に指定がない場合3000円になります。値段は後から自由に変更可能です。</p>
          </div>
        </div>

        <div class="talnets-btn">
          <button v-on:click="btnSubmit" class="btn btn-primary btn-lg btn-action" type="button" name="button">
            送信
          </button>
        </div>

      </div>
    </div>
    <div class="white-section" id="footer">
      <a class="icon1" href="https://twitter.com/emoma_official" target="_blank"><i class="text-dark fotter-icon fab fa-twitter download-icon"></i></a>
      <!-- <i class="fotter-icon fab fa-facebook download-icon"></i>
        <i class="fotter-icon fab fa-instagram download-icon"></i> -->
      <a class="icon1" href="mailto:emoma.official@gmail.com"><i class="text-dark fotter-icon fas fa-envelope download-icon"></i></a>

      <p>© Copyright 2019 Locachi inc.</p>

    </div>
  </div>

</template>

<script>
import firebase from '~/plugins/firebase'
// import SelectForm from '~/components/SelectForm.vue'
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
      ttext: '',

      amount: ''
    }
  },
  // components: {
  //   SelectForm
  // },
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
          ttext: this.ttext,
          category: this.talentscategory,
          amount: this.amount
        });

        alert('登録が完了しました')

        this.tname = '',
        this.ttext = '',
        this.category = '',
        this.amount = '',
        this.tfile = ''

      }).catch(error => {
        console.log(error);

      });

    }
  }
}
</script>

<style>

/* 全体を中央寄せに */
* {
  text-align: center;
}

body {
  font-family: 'Noto Sans JP',"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
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

h3 {
  font-size: 1.2rem;
}

ul, li{
  text-align: left;
}

img {
 max-width: 100%;
}

input {
  font-size: 15px;
}

.icon {
  padding: 5%;
}

.gradient-wrapper{
  background: -webkit-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: -o-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: linear-gradient(150deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  width: 100%;
  padding: 3%;
}

.links {
  text-decoration: none;
}

.top-backimage {
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-size: cover;
}

.logo-content {
  padding: 0px 0px;
}

#title {
  height: 100%;
}

.title-wrapper {
  padding: 5% 0;
}

.service-title h1 {
  font-size: 2em;
  padding-top: 30px;
}

.catch-copy {
  text-align: center;
  margin-bottom: 20px;
}

.catch-copy p {
  font-size: 12px;
  line-height: 1.2;
}
.title-p{
  font-size: 0.5rem;
}

#introduction {
  padding: 5% 12%;
}

.introduction-content {
  padding: 5% 2%;
  padding-top: 0;
}

.image {
  width: 100%;
}

.savice-title {
  text-align: center;
  margin-bottom: 30px;
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

.seni {
  width: 60%;
  margin: auto;
  border-radius: 6px;
  padding: 2%;
}

/* コピー追記 */
#copy {
  background: -webkit-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: -o-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: linear-gradient(150deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  width: 100%;
  padding: 5%;
}
/* win-win追記 */
#winwin {
  padding: 7% 12%;
}
.winwin-h2 {
}

.winwin-p {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0;
}
.service-winwin {
}

.icon-winwin{
  width: 80;
  height: 80;
  margin: 12px;
}

#payment-frow {
  padding: 7% 12%;
}

.box-content {
  padding: 5% 0;
}
.fa-check {
  padding: 2%;
  font-size: 0.8em
}

#registration {
  padding: 5% 12%;
}

.form-titlelabel {
  border-radius: 6px;
  padding: 2%;
  margin-bottom: 10px;
}

.form-label {
  margin: 0;
  margin-bottom: 3px;
}

.registration-p {
  line-height: 1.2;
  font-size: 12px;
}

.registration-text {
}

.select-form {
}


select {
  width: 100%;
  height: 30px;
}



.talents-name input {
  width: 100%;
  height: 30px;
  border-radius: 10px;
}

.talentsbox {
  padding: 5% 12%;
}

textarea {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  font-size: 15px;
  text-align: left;
}

.talents-img-in input {

}

.talents-amount-in input {
  border-radius: 10px;
  font-size: 15px;
  height: 30px;
}

.talnets-btn {
  width: 200px;
  margin: 0 auto 20px;
}

.amount-sub {
  font-size: 12px;
  text-align: left;
}

button {
  border: 2px solid #4d4d4d;
  background-color: #fff;
  width: 200px;
  border-radius: 30px;
  padding: 10px 0;
  margin-bottom: 50px;
}

/* PC */
@media (min-width: 769px) {

.service-p {
  width: 650px;
}

.service-image {
  text-align: center;
}

.service-image img {
  width: 70%;
  margin: 0 auto;
}

.description {
  width: 650px;
}

.talents-use {
  text-align: center;
}

.flow-text {
  width: 650px;
}

.registration-form {
  text-align: center;
}

.registration-title {
  background: -webkit-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: -o-linear-gradient(60deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  background: linear-gradient(150deg, #00f1e6 17%, rgba(214,56,255,.7) 85%);
  width: 100%;
}

textarea {
  width: 50%;
  text-align: left;
}

.select-form {
  /* border: 1px solid; */
}

.talents-name  {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

select {
  width: 50%;
}

.talents-img-in input {
  width: 230px;
}

}

</style>
