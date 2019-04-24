export const strict = false

// state ・・・値を保持する
export const state = () => ({
  user: null,
  filesname: null,
  blob: null
  // talent: []
})

// mutation・・・stateの値を変更する
export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

// action ・・・mutationを呼び出す
export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

// getter ・・・テンプレートへ値を返します
export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  getfilesname (state) {
    return !!state.filesname
    return !!state.blob
  },
  // gettalent (state) {
  //   return !!state.talent
  // }
}
