import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";
import { ACTIONS } from "@/store/actions-definitions";

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(VueKeyCloak, {
  config: {
    authRealm: process.env.VUE_APP_KEYCLOAK_REALM,
    authClientId: "entreprise-management-ui",
    authUrl: process.env.VUE_APP_KEYCLOAK_URL
  },
  init: {
    onLoad: "login-required"
  },
  logout: {
    redirectUri: process.env.VUE_APP_ROOT_URL
  },
  onReady: keycloak => {
    store.dispatch(ACTIONS.UPDATE_TOKEN, keycloak.token);
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
