<template>
  <div class="flex p-3">
    <div class="flex mx-2">
      {{ name }}
    </div>
    <div class="flex justify-end flex-grow">
      <button @click="showDetails">
        <img
          class="h-6 w-6 py-auto my-auto justify-end"
          src="@/assets/img/modify-icon.svg"
        />
      </button>
      <button>
        <img
          class="h-6 w-6 py-auto my-auto justify-end"
          src="@/assets/img/delete-icon.svg"
        />
      </button>
    </div>
  </div>
</template>

<script>
import CompanyDetail from "@/components/CompanyDetail.vue";

export default {
  name: "CompanyListElement",
  props: ["name", "id"],
  methods: {
    showDetails() {
      this.$modal.show(
        CompanyDetail,
        { companyId: this.id },
        { height: 500, minHeight: 500 }
      );
    }
  }
};
</script>
