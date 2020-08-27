<template>
  <div>
    <CompanyListElement
      v-for="(companyElement, index) in companies"
      :key="index"
      :name="companyElement.nom"
      class="border-b-2 border-gray-400"
    />
  </div>
</template>

<script>
import CompanyListElement from "@/components/CompanyListElement";
export default {
  name: "CompanyList",
  props: ["companies"],
  components: {
    CompanyListElement
  }
};
</script>
