<template>
  <div class="flex py-5">
    <!-- we've set up the band name to link to home but it can be whatever we want -->
    <router-link class="flex my-auto mx-5 text-white" :to="{ name: 'Home' }">
      Startfleet Clients Management
    </router-link>
    <div class="flex justify-end flex-grow">
      <NavBarNavigationElement
        v-for="(navItem, index) in routes"
        :key="index"
        :name="navItem.name"
        :path="navItem.path"
      />
    </div>
    <div>
      <button
        v-on:click="logout()"
        class="my-auto mr-3 justify-center pt-2"
        alt="Déconnexion"
        title="Déconnexion"
      >
        <img class="h-6 w-6" src="@/assets/img/disconnect-icon.svg" />
      </button>
    </div>
  </div>
</template>

<script>
import NavBarNavigationElement from "@/components/NavBarNavigationElement";
import Vue from "vue";

export default {
  name: "NavBar",
  props: ["routes"],
  components: {
    NavBarNavigationElement
  },
  methods: {
    logout() {
      Vue.prototype.$keycloak.logoutFn();
    }
  }
};
</script>
