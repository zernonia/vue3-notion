import { resolve } from "path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    { builder: "mkdist", input: "./src/" },
    { builder: "mkdist", input: "./src/", format: "cjs", ext: "js" },
  ],

  alias: {
    "@": resolve(__dirname, "./src"),
  },

  declaration: true,
  clean: true,
});
