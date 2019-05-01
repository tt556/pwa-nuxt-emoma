<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="nav-logo">
        <nuxt-link class="links" to="/talents/all">
          <h1>emoma!</h1>
        </nuxt-link>
      </div>
      <div class="signup">
        <nuxt-link class="deco" to="/users/registration">
          <p class="registration">新規登録</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style>

.links {
  text-decoration: none;
}

.navbar {
  width: 100%;
  line-height: 1.5;
  /* position: fixed; */
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.12);
}

.navbar-content {
  display: flex;
  padding: 5px 10px 5px 15px;
}

.nav-logo {

}

.nav-logo h1 {
  color: #4d4d4d;
  font-size: 30px;
  background: -webkit-linear-gradient(150deg,#00f1e6 15%,rgba(214, 56, 255, .5) 65%);
  -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
  /* color: linear-gradient(150deg,#00f1e6 15%,rgba(214, 56, 255, .5) 65%), */
}

.signup {
  width: 100%;
}

.deco {
  text-decoration: none;
  text-align: right;
}

.registration {
  margin: 12px 5px 0 0;
  color: #4d4d4d;
}

@media (min-width: 769px) {

.navbar-content {
  padding: 5px 20%;
}

}

</style>
