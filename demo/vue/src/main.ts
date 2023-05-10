import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "vue3-notion/dist/style.css";

import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

createApp(App).use(router).mount("#app");
