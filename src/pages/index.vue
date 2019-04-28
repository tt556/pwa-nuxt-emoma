<template>
  <div class="container">
    <section id="top-content">
      <div class="top-backimage">
        <div class="logo-content">
          <div class="service-title">
            <h1>emoma!</h1>
          </div>
          <div class="catch-copy">
            <p>大好きなあの人から、<br>あなただけのビデオレター</p>
          </div>
          <div class="request-top">
            <div class="request-btn">
              <nuxt-link class="links" to="/talents/all">
                <p class="btn">リクエストする</p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="description">
      <div class="description-title titles">
        <h2>emoma!とは</h2>
      </div>
      <div class="description-content">
        <div class="description-text">
          <p>自分へのご褒美に。<br>友達の誕生日サプライズに。<br>大好きなあの人にビデオレターをリクエストしよう！<br>あなたのための特別なビデオレターが届きます！</p>
        </div>
        <div class="description-img">
          <img src="img/video-sample-shadow.png" alt="" width="170px">
        </div>
      </div>
    </section>
    <section id="talents">
      <div class="talents-title titles">
        <h2>タレント一覧</h2>
      </div>
      <div class="talnets-content">
        <div class="talnets-img-container">
          <img src="img/sample-image.jpg" alt="タレントの画像" width="300px">
        </div>
        <div class="talents-name-container">
          <div class="talnets-name">
            <p>名前（なまえ）</p>
          </div>
          <div class="talents-category">
            <p>ユーチューバー（カテゴリー）</p>
          </div>
          <div class="request-btn-container">
            <div class="request-btn-bottom">
              <nuxt-link class="links" to="/talents/all">
                <p class="btn">リクエストする</p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="registration-form">
      <div class="form-backimage">
        <div class="form-container">
          <div class="form-title titles">
            <h2>タレントの方へ</h2>
          </div>
          <div class="form-text-container">
            <div class="form-text">
              <p>emoma!でビデオレターを届けてくださるタレントさんを募集しています！</p>
            </div>
          </div>
          <div class="form-btn-container">
            <div class="form-btn">
              <a href="https://forms.gle/vzYe7L66YuBPtfHj6" class="links">
                <p class="btn">登録する</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="contact-content">
        <div class="contact-title titles">
          <h2>お問い合わせフォーム</h2>
        </div>
        <div class="contact-address-container">
          <div class="contact-address">
            <p>そのほかお問い合わせはこちらから</p>
          </div>
          <div class="contact-btn-form">
            <div class="contact-btn">
              <a href="https://forms.gle/S2iF7epcrcECcBeF7" class="links">
                <p class="btn">お問い合わせ</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="footer-content">
        <div class="terms">
          <a href="/contents/term">
            <p>利用規約</p>
          </a>
        </div>
        <div class="privacy-policy">
          <a href="/contents/policy">
            <p>プライバシーポリシー</p>
          </a>
        </div>
        <div class="law">
          <a href="/contents/law">
            <p>特定商取引法</p>
          </a>
        </div>
        <div class="copy-rights">
          <p>©︎locachi.inc</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

</script>

<style>

body {
  font-family: "Noto Sans CJK JP", "NotoSansCJKjp", "FontAwesome", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
  color: #4d4d4d;
  font-weight: 600;
}

a {
  text-decoration: none;
}

p {
  color: #4d4d4d;
}

.links {
  text-decoration: none;
}

.btn {
  border: solid 2px #4d4d4d;
}

.titles {
  padding: 50px 0;
}


.container {
  min-height: 100vh;
}

#top-content {
  height: 560px;
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
  padding: 100px 0px;
}

.service-title {
  text-align: center;
}

.service-title h1 {
  color: #fff;
  font-size: 4.5em;
  margin-bottom: 40px;
}

.catch-copy {
  margin-bottom: 100px;
  text-align: center;
}

.catch-copy p {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.request-top {
  width: 220px;
  margin-left: auto;
  margin-right: auto;
}

.request-btn {
  text-align: center;
}

.request-btn p {
  padding: 10px 30px;
  background: #fff;
  border-radius: 30px;
  border: none;
  /* color: linear-gradient(150deg,#00f1e6 17%,rgba(214,56,255,.7) 65%); */
}

#description {
  height: 100%;
  margin: 5px;
}

.description-title {
  text-align: center;
}

.description-title p {

}

.description-content {
  display: flex;
  margin: 0 0 0 10px;;
  padding-bottom: 40px;
}

.description-text {
}

.description-text p {
  line-height: 43px;
  margin: 10px 0px;
  font-size: 14px;
}

#talents {
}

.talents-title {
  text-align: center;
}

.talents-title p {

}

.talnets-content {
}

.talnets-img-container {
  width: fit-content;
  margin: 0 auto;
}

.talnets-img-container img {
  width: 300px;
}

.talents-name-container {
  padding: 20px 40px 40px;
}

.talnets-name {
  margin: 10px 0;
}

.talents-name p {

}

.talents-category {
  margin: 10px 0 30px;
}

.talents-category p {

}

.request-btn-container {
  text-align: center;
  width: 220px;
  margin-left: auto;
  margin-right: auto;
}

.request-btn-bottom {

}

.request-btn-bottom p {
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 30px;
}



#registration-form {

}

.form-backimage {
  background: linear-gradient(150deg,#00f1e6 17%,rgba(214,56,255,.7) 65%);
}

.form-container {
  margin-left: 50px;
  margin-right: 50px;
}

.form-title {
  text-align: center;
  padding: 40px 0;
}

.form-title h2 {
  color: #fff;
}

.form-text-container {
  margin-bottom: 40px;
}

.form-text {

}

.form-text p {
  color: #fff;
}

.form-btn-container {
  padding-bottom: 40px;
  text-align: center;
}

.form-btn {
  width: 220px;
  margin-left: auto;
  margin-right: auto;
}

.form-btn p {
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 30px;
  border: none;
}

#contact {

}

.contact-content {

}

.contact-title {
  text-align: center;
}

.contact-title h2 {

}

.contact-address-container {
  margin-bottom: 40px;
  text-align: center;
}

.contact-address {
  margin-bottom: 40px;
}

.contact-address p {

}

.contact-btn-form {
  width: 220px;
  margin-left: auto;
  margin-right: auto;
}

.contact-btn {
  text-align: center;
}

.contact-btn p {
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 30px;
}

footer {
  background-color: #555;
}

.footer-content {
  text-align: center;
}

.footer-content p {
  color: #fff;
  font-size: 13px;
}

/* PC */

@media (min-width: 769px) {
  .description-content {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .description-text p {
    line-height: 60px;
    font-size: 17px;
  }

  .talnets-img-container img {
    width: 400px;

  }

  .talents-name-container {
    width: 400px;
    margin: 0 auto;
  }

  .form-text {
    text-align: center;
  }
}

</style>
