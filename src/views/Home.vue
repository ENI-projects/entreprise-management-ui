<template>
  <div>
    <NavBar class="flex bg-gray-900" :routes="routesForNav" />
    <div class="flex justify-end flex-grow">
      <div class="m-5">
        <a
          href="#"
          class="py-3 px-2 hover:bg-green-700 text-gray-100 bg-green-600 rounded-lg"
        >
          Ajouter une entreprise
        </a>
      </div>
    </div>
    <div class="flex-col border-r border-l border-black border-solid mx-48">
      <CompanyList :companies="companies" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import CompanyList from "@/components/CompanyList.vue";
import { mapActions, mapState } from "vuex";
import { ACTIONS } from "@/store/actions-definitions.js";

export default {
  name: "Home",
  components: {
    NavBar,
    CompanyList
  },
  methods: {
    ...mapActions([ACTIONS.RETRIEVE_COMPANIES])
  },
  computed: {
    ...mapState(["companies"]),
    routesForNav() {
      return this.$router.options.routes.filter(
        route => route.meta.requireAuth === true
      );
    }
  },
  mounted() {
    this[ACTIONS.RETRIEVE_COMPANIES]();
  }
};
</script>
