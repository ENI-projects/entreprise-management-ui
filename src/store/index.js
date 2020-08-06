import Vue from "vue";
import Vuex from "vuex";
import { ACTIONS } from "./actions-definitions";
import { MUTATIONS } from "./mutations-definitions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    [MUTATIONS.UPDATE_TOKEN]: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    [ACTIONS.UPDATE_TOKEN]: (context, token) => {
      context.commit(MUTATIONS.UPDATE_TOKEN, token);
    }
  },
  modules: {}
});
