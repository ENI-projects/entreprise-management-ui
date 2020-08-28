<template>
  <div>
    <form class="w-full p-5">
      <CompanyDetailFormElement
        label="Nom"
        :disabled="disabled"
        :value="focusedCompany.nom"
      />
      <CompanyDetailFormElement
        label="Adresse"
        :disabled="disabled"
        :value="focusedCompany.adresse"
      />
      <CompanyDetailFormElement
        label="Ville"
        :disabled="disabled"
        :value="focusedCompany.ville"
      />
      <CompanyDetailFormElement
        label="Département"
        :disabled="disabled"
        :value="focusedCompany.departement"
      />
      <CompanyDetailFormElement
        label="Code Postal"
        :disabled="disabled"
        :value="focusedCompany.code_postal"
      />
      <CompanyDetailFormElement
        label="Responsable"
        :disabled="disabled"
        :value="focusedCompany.responsable"
      />
    </form>
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
    var disabled = true;
    return { disabled };
  },
  components: {
    CompanyDetailFormElement
  },
  methods: {
    ...mapActions([ACTIONS.GET_FOCUSED_COMPANY])
  },
  computed: {
    ...mapState(["focusedCompany"])
  },
  mounted() {
    this[ACTIONS.GET_FOCUSED_COMPANY](this.companyId);
  }
};
</script>
