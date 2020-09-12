<template>
  <div>
    <div class="flex flex-row">
      <div class="w-1/2 pt-5 px-5">
        <span class="flex text-gray-700 font-bold mb-1 mb-5 justify-center">
          Entreprise
        </span>
        <!-- form elements -->
        <CompanyDetailFormElement
          label="Nom"
          v-model="focusedCompany.nom"
          :disabled="disabled"
        />
        <CompanyDetailFormElement
          label="Adresse"
          :disabled="disabled"
          v-model="focusedCompany.adresse"
        />
        <CompanyDetailFormElement
          label="Ville"
          :disabled="disabled"
          v-model="focusedCompany.ville"
        />
        <CompanyDetailFormElement
          label="Département"
          :disabled="disabled"
          v-model="focusedCompany.departement"
        />
        <CompanyDetailFormElement
          label="Code Postal"
          :disabled="disabled"
          v-model="focusedCompany.code_postal"
        />
      </div>
      <div class="w-1/2 pt-5 px-5">
        <span class="flex text-gray-700 font-bold mb-1 mb-5 justify-center">
          Responsable
        </span>
        <CompanyDetailFormElement
          label="Email"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.email"
        />
        <CompanyDetailFormElement
          label="Nom"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.last_name"
        />
        <CompanyDetailFormElement
          label="Prénom"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.first_name"
        />
        <CompanyDetailFormElement
          label="Adresse"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.address"
        />
        <CompanyDetailFormElement
          label="Ville"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.ville"
        />
        <CompanyDetailFormElement
          label="Code Postal"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.code_postal"
        />
        <CompanyDetailFormElement
          label="Téléphone"
          :disabled="disabled"
          v-model="focusedCompanyResponsable.phone"
        />
      </div>
    </div>
    <!-- different render of the validate button when in modify state or not -->
    <div class="flex justify-end flex-grow pr-8 my-2">
      <button
        class="border rounded-lg text-white hover:bg-green-700 text-gray-100 bg-green-600 p-2 inline-flex"
        @click="addCompany"
      >
        Valider
        <img class="h-3 w-3 my-auto" src="@/assets/img/check-icon.svg" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ACTIONS } from "@/store/actions-definitions.js";
import CompanyDetailFormElement from "@/components/CompanyDetailFormElement.vue";

export default {
  name: "AddCompany",
  data() {
    return {
      disabled: false
    };
  },
  components: {
    CompanyDetailFormElement
  },
  methods: {
    ...mapActions([
      ACTIONS.RESET_FOCUSED_COMPANY,
      ACTIONS.COMMIT_FOCUSED_COMPANY_INSERT
    ]),
    async addCompany() {
      this[ACTIONS.COMMIT_FOCUSED_COMPANY_INSERT]();
      this.$modal.hide("addCompanyModal");
    }
  },
  computed: {
    ...mapState(["focusedCompany", "focusedCompanyResponsable"])
  },
  mounted() {
    this[ACTIONS.RESET_FOCUSED_COMPANY]();
  }
};
</script>
