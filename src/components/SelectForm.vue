<template>
  <div class="container pt20">
    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">
          <label class="control-label">カテゴリーの選択</label>
            <div class="select-wrap">
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
       </div>
    </div>
  </div>
</template>

<style>
select{
    outline:none;
    text-indent: 0.01px;
    text-overflow: '';
    background: none transparent;
    vertical-align: middle;
    font-size: inherit;
    color: inherit;
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
}
select option{
  background-color: #fff;
  color: #333;
}
select::-ms-expand {
  display: none;
}
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #828c9a;
}

@font-face{font-family:"IonIcons";src:url("//code.ionicframework.com/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.1");src:url("//code.ionicframework.com/ionicons/2.0.1/fonts/ionicons.eot?v=2.0.1#iefix") format("embedded-opentype"),url("//code.ionicframework.com/ionicons/2.0.1/fonts/ionicons.ttf?v=2.0.1") format("truetype"),url("//code.ionicframework.com/ionicons/2.0.1/fonts/ionicons.woff?v=2.0.1") format("woff"),url("//code.ionicframework.com/ionicons/2.0.1/fonts/ionicons.svg?v=2.0.1#Ionicons") format("svg");font-weight:normal;font-style:normal}

.pt20{
  padding-top: 20px;
}
.inverse{
  background: #000;
  padding: 20px 0;
  color: #fff;
}
.select-wrap {
    position: relative;
}
.select-wrap:before {
    z-index: 1;
    position: absolute;
    right: 15px;
    top: 0;
    content: "\f123";
    font-family: "IonIcons";
    line-height: 43px;
    color: #7F878C;
    pointer-events: none;
}
select{
    outline:none;
    -moz-appearance: none;
    text-indent: 0.01px;
    text-overflow: '';
    background: none transparent;
    vertical-align: middle;
    font-size: inherit;
    color: inherit;
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 40px;
    padding: 8px 12px;
    border:1px solid #ddd;
    color:#828c9a;
    width:100%;
    border-radius:3px;
}
select option{
  background-color: #fff;
  color: #333;
}
select::-ms-expand {
  display: none;
}
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #828c9a;
}
.select-wrap.select-primary:before{
  color:#fff;
}
.select-wrap.select-primary > select{
  background:#0084B4;
  color:#fff;
  border-color:#0084B4;
}
.select-wrap.select-primary > select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #fff;
}

.select-wrap.select-inverse:before{
  color:#fff;
}
.select-wrap.select-inverse > select{
  color:#fff;
  border-color: #fff;
}

.select-wrap.select-inverse > select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #fff;
}
</style>
