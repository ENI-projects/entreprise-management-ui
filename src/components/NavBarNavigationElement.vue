<template>
  <router-link class="flex my-auto mr-5 text-white" :to="path">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: "NavBarNavigationElement",
  props: ["name", "path"]
};
</script>
