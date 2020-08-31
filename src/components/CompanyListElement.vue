<template>
  <div class="flex p-3">
    <div class="flex mx-2">
      {{ name }}
    </div>
    <div class="flex justify-end flex-grow">
      <button @click="showDetails">
        <img
          class="h-6 w-6 py-auto my-auto justify-end"
          src="@/assets/img/modify-alt-icon.svg"
        />
      </button>
      <button @click="confirmDeletion">
        <img
          class="h-6 w-6 py-auto my-auto justify-end"
          src="@/assets/img/delete-icon.svg"
        />
      </button>
    </div>
  </div>
</template>

<script>
import CompanyDetail from "@/views/CompanyDetail.vue";
import { mapActions } from "vuex";
import { ACTIONS } from "@/store/actions-definitions.js";

export default {
  name: "CompanyListElement",
  props: ["name", "id"],
  methods: {
    ...mapActions([ACTIONS.DELETE_COMPANY, ACTIONS.RETRIEVE_COMPANIES]),
    showDetails() {
      this.$modal.show(
        CompanyDetail,
        { companyId: this.id },
        { height: 530, minHeight: 530 }
      );
    },
    confirmDeletion() {
      this.$modal.show("dialog", {
        title: "Confirmation",
        text:
          "Êtes-vous sûr de vouloir supprimer l'entreprise <span class='font-bold'>" +
          this.name +
          "</span> ?",
        buttons: [
          {
            title: "Annuler",
            handler: () => {
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Confirmer",
            handler: () => {
              this[ACTIONS.DELETE_COMPANY](this.id);
              this.$modal.hide("dialog");
            }
          }
        ]
      });
    }
  }
};
</script>
