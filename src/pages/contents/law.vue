<template>
  <div class="content">
    <nav-bar/>
    <div class="content-text">
      <div class="title">
        <p>【特定商取引法に基づく表記】</p>
      </div>
      <div>
        <table bgcolor="#999999" border="0" cellpadding="9" cellspacing="1" style="font-size:13px;text-align:left">
          <tr>
            <th bgcolor="#EEEEEE">販売社名</th>
            <td bgcolor="#FFFFFF">株式会社locachi</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">運営統括責任者</th>
            <td bgcolor="#FFFFFF">神崎　泰旗</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">所在地</th>
            <td bgcolor="#FFFFFF">東京都品川区</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">電話番号</th>
            <td bgcolor="#FFFFFF">00-0000-0000</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">メールアドレス</th>
            <td bgcolor="#FFFFFF">kuroneko-shop@xxxxxxx.jp</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">販売URL</th>
            <td bgcolor="#FFFFFF">http://--------</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">お支払い方法</th>
            <td bgcolor="#FFFFFF">クレジットカード</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">商品代金以外の<br/>必要金額</th>
            <td>なし</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">販売数量</th>
            <td bgcolor="#FFFFFF">1個から</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">お申込み有効期限</th>
            <td bgcolor="#FFFFFF">3日以内にお願いいたします。<br/>3日間入金がない場合は、キャンセルとさせていただきます。</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">商品引渡し時期</th>
            <td bgcolor="#FFFFFF">前払いの場合、指定日が無ければ入金確認後3営業日以内で発送致します。</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">商品引渡し方法</th>
            <td bgcolor="#FFFFFF">メールにて送信</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">返品・不良品について</th>
            <td bgcolor="#FFFFFF">
            【返品対象】<br/>誤って購入した場合<br/><br/>
            【返品時期】<br/>ご購入後2日以内にご連絡があった場合に返金可能となります。<br/><br/>
            【返品方法】<br/>メールにて返金要請してください。<br/>7日以内にご購入代金を指定の口座へお振込みいたします。</td>
          </tr>
          <tr>
            <th bgcolor="#EEEEEE">表現、及び商品に<br/>関する注意書き</th>
            <td bgcolor="#FFFFFF">本商品に示された表現や再現性には個人差があり、<br/>必ずしも利益や効果を保証したものではございません。</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import NavBar from '~/components/NavBar.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    NavBar
  }
}
</script>

<style>

.content-text {
  margin: 100px 10px 50px 10px;
}

.title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
