<template>

  <div class="container">

    <select name="category" v-model="talentscategory">
      <option value="YouTuber">YouTuber</option>
      <option value="ライバー">ライバー</option>
      <option value="タレント">タレント</option>
      <option value="俳優">俳優</option>
      <option value="女優">女優</option>
      <option value="インスタグラマー">インスタグラマー</option>
    </select>

    <input v-model="tname" type="tname" placeholder="タレントの名前">

    <textarea v-model="ttext" type="ttext" placeholder="タレントの自己紹介文"></textarea>

    <input @change="fileButton" type="file" placeholder="タレントのトップ画像">

    <button v-on:click="btnSubmit" class="btn btn-action" type="button" name="button">
      送信
    </button>
  </div>

</template>

<script>
import firebase from '~/plugins/firebase'
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
</style>
