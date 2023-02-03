import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.config.unwrapInjectedRef = true;

app.config.globalProperties.$apiHost = "http://localhost:3000";

// breakpoints
app.config.globalProperties.$bps = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

app.use(router);

app.mount("#app");
