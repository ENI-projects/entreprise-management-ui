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
    },
    [MUTATIONS.UPDATE_COMPANY_IN_LIST]: (state, updatedCompany) => {
      state.companies.find(company => {
        return company.id == updatedCompany.id;
      }).nom = updatedCompany.nom;
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
    async [ACTIONS.COMMIT_FOCUSED_COMPANY_UPDATE](context) {
      let defaultValues = {
        nom: "",
        adresse: "",
        ville: "",
        departement: "",
        code_postal: "",
        responsable: ""
      };
      const updatedCompany = (
        await fetchAsync(
          context.state.token,
          fetcher,
          mutations.updateCompanyById,
          {
            ...defaultValues,
            ...context.state.focusedCompany
          }
        )
      ).data.update_armadacar_entreprises.returning[0];
      context.commit(MUTATIONS.UPDATE_COMPANY_IN_LIST, updatedCompany);
    },
    async [ACTIONS.COMMIT_FOCUSED_COMPANY_INSERT](context) {
      let defaultValues = {
        nom: "",
        adresse: "",
        ville: "",
        departement: "",
        code_postal: "",
        responsable: ""
      };
      const companyInserted = (
        await fetchAsync(context.state.token, fetcher, mutations.addCompany, {
          ...defaultValues,
          ...context.state.focusedCompany
        })
      ).data.insert_armadacar_entreprises.returning[0];
      context.commit(MUTATIONS.UPDATE_COMPANIES, [
        companyInserted,
        ...context.state.companies
      ]);
    },
    [ACTIONS.RESET_FOCUSED_COMPANY](context) {
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY, {});
    },
    async [ACTIONS.DELETE_COMPANY](context, id) {
      const deletedCompany = await fetchAsync(
        context.state.token,
        fetcher,
        mutations.deleteCompanyById,
        { id }
      );
      context.commit(
        MUTATIONS.UPDATE_COMPANIES,
        context.state.companies.filter(company => {
          return (
            company.id !==
            deletedCompany.data.delete_armadacar_entreprises.returning[0].id
          );
        })
      );
    }
  },
  modules: {}
});
