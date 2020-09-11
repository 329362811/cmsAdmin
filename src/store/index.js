import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    del_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    updata_tree (state, data) {
      state.treeData = data
    },
    set_roleCodes (state, data) {
      state.userType = data
      sessionStorage.userType = data
    },
    del_roleCodes (state) {
      state.userType = ''
      sessionStorage.removeItem('userType')
    },
    get_currentTime (state, data) {
      state.currentTime = data
      sessionStorage.currentTime = data
    }
  }
})