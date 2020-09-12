import Vue from "vue";
import Vuex from "vuex";
import { ACTIONS } from "./actions-definitions";
import { MUTATIONS } from "./mutations-definitions";
import { fetchAsync, graphQLfetcher, userAPIfetcher } from "@/api/fetcher.js";
import { queries } from "@/api/queries.js";
import { mutations } from "../api/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    companies: [],
    focusedCompany: {},
    focusedCompanyResponsable: {}
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
    [MUTATIONS.UPDATE_FOCUSED_COMPANY_RESPONSABLE]: (state, responsable) => {
      state.focusedCompanyResponsable = responsable;
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
        graphQLfetcher,
        queries.getEntreprises
      );
      const companies = companiesQueryResult.data.armadacar_entreprises;
      context.commit(MUTATIONS.UPDATE_COMPANIES, companies);
    },
    async [ACTIONS.GET_FOCUSED_COMPANY](context, id) {
      //gets the informations of the company
      const companyDetailsQueryResult = await fetchAsync(
        context.state.token,
        graphQLfetcher,
        queries.getEntrepriseById,
        { id }
      );
      const companyDetails =
        companyDetailsQueryResult.data.armadacar_entreprises[0];
      //gets the informations about the company manager
      const userDetails = await fetchAsync(
        context.state.token,
        userAPIfetcher,
        "getUserById",
        { id: companyDetails.responsable }
      );
      //update the store
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY, companyDetails);
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY_RESPONSABLE, userDetails);
    },
    async [ACTIONS.COMMIT_FOCUSED_COMPANY_UPDATE](context) {
      //first updates the company values
      let defaultCompanyValues = {
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
          graphQLfetcher,
          mutations.updateCompanyById,
          {
            ...defaultCompanyValues,
            ...context.state.focusedCompany
          }
        )
      ).data.update_armadacar_entreprises.returning[0];
      //then updates the responsable values
      await fetchAsync(context.state.token, userAPIfetcher, "updateUserById", {
        ...{ id_entreprise: context.state.focusedCompany.id },
        ...context.state.focusedCompanyResponsable
      });
      //then update the company in the list
      context.commit(MUTATIONS.UPDATE_COMPANY_IN_LIST, updatedCompany);
    },
    async [ACTIONS.COMMIT_FOCUSED_COMPANY_INSERT](context) {
      //first step is to add the company in hasura and get the id from the query
      let companyDefaultValues = {
        nom: "",
        adresse: "",
        ville: "",
        departement: "",
        code_postal: "",
        responsable: ""
      };
      const companyInserted = (
        await fetchAsync(
          context.state.token,
          graphQLfetcher,
          mutations.addCompany,
          {
            ...companyDefaultValues,
            ...context.state.focusedCompany
          }
        )
      ).data.insert_armadacar_entreprises.returning[0];
      //then insert the user using the user-api
      let responsableDefaultValues = {
        email: "",
        first_name: "",
        last_name: "",
        id_entreprise: "",
        address: "",
        ville: "",
        code_postal: "",
        phone: ""
      };
      await fetchAsync(context.state.token, userAPIfetcher, "addUser", {
        ...responsableDefaultValues,
        ...context.state.focusedCompanyResponsable,
        ...{ id_entreprise: companyInserted.id }
      });
      //get the id of the user we just interted
      const insertedUserId = (
        await fetchAsync(
          context.state.token,
          graphQLfetcher,
          queries.getUsersIdByIdEntreprise,
          { id: companyInserted.id }
        )
      ).data.armadacar_utilisateurs[0].id;
      //then we update the company "responsable" with the id of the inserted user
      await fetchAsync(
        context.state.token,
        graphQLfetcher,
        mutations.updateCompanyById,
        {
          ...companyDefaultValues,
          ...context.state.focusedCompany,
          ...{ responsable: insertedUserId, id: companyInserted.id }
        }
      );
      //finally we update the list of the companies
      context.commit(MUTATIONS.UPDATE_COMPANIES, [
        companyInserted,
        ...context.state.companies
      ]);
    },
    [ACTIONS.RESET_FOCUSED_COMPANY](context) {
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY, {
        nom: "",
        adresse: "",
        ville: "",
        departement: "",
        code_postal: ""
      });
      context.commit(MUTATIONS.UPDATE_FOCUSED_COMPANY_RESPONSABLE, {
        first_name: "",
        last_name: "",
        email: "",
        adress: "",
        ville: "",
        code_postal: "",
        phone: ""
      });
    },
    async [ACTIONS.DELETE_COMPANY](context, id) {
      //delete the company related stuff in hasura
      await fetchAsync(
        context.state.token,
        graphQLfetcher,
        mutations.deleteCompanyRelatedStuffById,
        { id }
      );
      //get and delete the users in the company using the API
      const companyUsersId = (
        await fetchAsync(
          context.state.token,
          graphQLfetcher,
          queries.getUsersIdByIdEntreprise,
          { id: id }
        )
      ).data.armadacar_utilisateurs;
      const promiseUsersDelete = companyUsersId.map(user => {
        return fetchAsync(
          context.state.token,
          userAPIfetcher,
          "deleteUserById",
          {
            id: user.id
          }
        );
      });
      Promise.all(promiseUsersDelete).then(async () => {
        //finally delete company in hasura
        const deletedCompany = await fetchAsync(
          context.state.token,
          graphQLfetcher,
          mutations.deleteCompanyById,
          { id }
        );
        //updates the company list
        context.commit(
          MUTATIONS.UPDATE_COMPANIES,
          context.state.companies.filter(company => {
            return (
              company.id !==
              deletedCompany.data.delete_armadacar_entreprises.returning[0].id
            );
          })
        );
      });
    }
  },
  modules: {}
});
