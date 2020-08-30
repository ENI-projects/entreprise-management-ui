<template>
  <div>
    <CompanyListElement
      v-for="(companyElement, index) in value"
      :key="index"
      :name="companyElement.nom"
      :id="companyElement.id"
      class="border-b-2 border-gray-400"
    />
  </div>
</template>

<script>
import CompanyListElement from "@/components/CompanyListElement";
export default {
  name: "CompanyList",
  props: ["value"],
  components: {
    CompanyListElement
  }
};
</script>
