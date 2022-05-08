import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//* Font Awesone Icon
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

//* Import Bootstrap css, js

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./style.css"; // main css file

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
