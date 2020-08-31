<template>
  <div>
    <form class="w-full pt-5 px-5">
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
      <CompanyDetailFormElement
        label="Responsable"
        :disabled="disabled"
        v-model="focusedCompany.responsable"
      />
    </form>
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
    ...mapState(["focusedCompany"])
  },
  mounted() {
    this[ACTIONS.RESET_FOCUSED_COMPANY]();
  }
};
</script>
