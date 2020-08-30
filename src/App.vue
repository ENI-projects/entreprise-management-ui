<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <router-view />
    <v-dialog />
  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
export default {
  name: "App"
};
</script>
