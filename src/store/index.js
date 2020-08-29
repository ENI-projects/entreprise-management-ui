import Vue from "vue";
import Vuex from "vuex";
import { ACTIONS } from "./actions-definitions";
import { MUTATIONS } from "./mutations-definitions";
import { fetchAsync, fetcher } from "@/api/fetcher.js";
import { queries } from "@/api/queries.js";
import { mutations } from "../api/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    companies: [],
    focusedCompany: {}
  },
  mutations: {
    [MUTATIONS.UPDATE_TOKEN]: (state, token) => {
      state.token = token;
    },
    [MUTATIONS.UPDATE_COMPANIES]: (state, companies) => {
      state.companies = companies;
    },
    [MUTATIONS.UPDATE_FOCUSED_COMPANY]: (state, company) => {
      state.focusedCompany = company;
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
    },
    async [ACTIONS.GET_FOCUSED_COMPANY](context, id) {
      const companyDetailsQueryResult = await fetchAsync(
        context.state.token,
        fetcher,
        queries.getEntrepriseById,
        { id }
      );
      const companyDetails =
        companyDetailsQueryResult.data.armadacar_entreprises[0];
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY, companyDetails);
    },
    async [ACTIONS.COMMIT_FOCUSED_COMPANY](context) {
      await fetchAsync(
        context.state.token,
        fetcher,
        mutations.updateCompanyById,
        {
          id: context.state.focusedCompany.id,
          nom: context.state.focusedCompany.nom,
          adresse: context.state.focusedCompany.adresse,
          ville: context.state.focusedCompany.ville,
          departement: context.state.focusedCompany.departement,
          code_postal: context.state.focusedCompany.code_postal,
          responsable: context.state.focusedCompany.responsable
        }
      );
    }
  },
  modules: {}
});
