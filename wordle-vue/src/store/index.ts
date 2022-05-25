import Vue from 'vue'
import Vuex, {Commit} from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    SET_AUTH: (state: {authenticated: boolean}, auth: boolean) => state.authenticated = auth
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth)
  },
  modules: {
  }
})
