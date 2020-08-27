import Vue from "vue";
import Vuex from "vuex";
import { ACTIONS } from "./actions-definitions";
import { MUTATIONS } from "./mutations-definitions";
import { fetchAsync, fetcher } from "@/api/fetcher.js";
import { queries } from "@/api/queries.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    companies: []
  },
  mutations: {
    [MUTATIONS.UPDATE_TOKEN]: (state, token) => {
      state.token = token;
    },
    [MUTATIONS.UPDATE_COMPANIES]: (state, companies) => {
      state.companies = companies;
    }
  },
  actions: {
    [ACTIONS.UPDATE_TOKEN]: (context, token) => {
      context.commit(MUTATIONS.UPDATE_TOKEN, token);
    },
    async [ACTIONS.RETRIEVE_COMPANIES](context) {
      const companiesQueryResult = await fetchAsync(
        context.state.token,
        fetcher,
        queries.getEntreprises
      );
      const companies = companiesQueryResult.data.armadacar_entreprises;
      context.commit(MUTATIONS.UPDATE_COMPANIES, companies);
    }
  },
  modules: {}
});
