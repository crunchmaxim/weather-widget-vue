import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiKey: ''
  },
  mutations: {
    SET_API_KEY (state, apiKey) {
      state.apiKey = apiKey
      console.log(state)
    }
  },
  actions: {
    setApiKey(context, apiKey) {
      context.commit('SET_API_KEY', apiKey)
    }
  },
  getters: {
    apiKey (state) {
      return state.apiKey
    }
  },
})

export default store