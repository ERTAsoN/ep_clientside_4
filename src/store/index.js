import Vue from 'vue'
import Vuex from 'vuex'
import loginRequest from '../utils/api.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject();
          })
      })
    }
  },
  modules: {
  }
})
