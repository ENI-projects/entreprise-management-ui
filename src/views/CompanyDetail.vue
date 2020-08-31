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
        v-if="!disabled"
        class="border rounded-lg text-white hover:bg-green-700 text-gray-100 bg-green-600 p-2 inline-flex"
        @click="updateCompany"
      >
        Valider
        <img class="h-3 w-3 my-auto" src="@/assets/img/check-icon.svg" />
      </button>
      <button
        v-if="disabled"
        class="border rounded-lg text-white text-gray-100 bg-gray-400 p-2 inline-flex"
        disabled
      >
        Valider
        <img class="h-3 w-3 my-auto" src="@/assets/img/check-icon.svg" />
      </button>
    </div>
    <!-- button to enter or leave modify state -->
    <div class="flex justify-end flex-grow pr-5 pb-3">
      <button
        @click="disabled = !disabled"
        class="border rounded-lg inline-flex p-3 text-white bg-gray-900 hover:bg-gray-800"
      >
        <img class="h-6 w-6" src="@/assets/img/modify-icon.svg" />
        Modifier les informations
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ACTIONS } from "@/store/actions-definitions.js";
import CompanyDetailFormElement from "@/components/CompanyDetailFormElement.vue";

export default {
  name: "Companydetail",
  props: ["companyId"],
  data() {
    return {
      disabled: true
    };
  },
  components: {
    CompanyDetailFormElement
  },
  methods: {
    ...mapActions([
      ACTIONS.GET_FOCUSED_COMPANY,
      ACTIONS.COMMIT_FOCUSED_COMPANY
    ]),
    async updateCompany() {
      this.$store.dispatch(ACTIONS.COMMIT_FOCUSED_COMPANY_UPDATE);
      this.disabled = !this.disabled;
    }
  },
  computed: {
    ...mapState(["focusedCompany"])
  },
  mounted() {
    this[ACTIONS.GET_FOCUSED_COMPANY](this.companyId);
  }
};
</script>
