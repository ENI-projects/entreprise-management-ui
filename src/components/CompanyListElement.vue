<template>
  <div class="flex p-3">
    <div class="flex mx-2">
      {{ name }}
    </div>
    <div class="flex justify-end flex-grow">
      <img
        class="h-6 w-6 py-auto my-auto justify-end"
        src="@/assets/img/modify-icon.svg"
      />
      <img
        class="h-6 w-6 py-auto my-auto justify-end"
        src="@/assets/img/delete-icon.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyListElement",
  props: ["name"]
};
</script>
