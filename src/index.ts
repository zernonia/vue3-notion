import { App } from "vue";
import * as components from "./components";

// Default export is library as a whole, registered via Vue.use()
export default {
  install: (app: App) => {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  },
};

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "./components";

// export additional js methods
export * from "./lib/api";

// export types
export * from "./lib/types";

// export composables
export * from "./lib/composables";
