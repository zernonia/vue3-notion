import alias from "@rollup/plugin-alias"
import replace from "@rollup/plugin-replace"
import vue from "rollup-plugin-vue"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import postcss from "rollup-plugin-postcss"
import path from "path"
import pkg from "./package.json"

const external = ["vue", "vue-router"]
const globals = {
  vue: "Vue",
  katex: "katex",
  prismjs: "Prism",
  "fragment-for-vue/vue3": "Fragment",
}
const plugins = [
  resolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json", abortOnError: false }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env.ES_BUILD": JSON.stringify("false"),
    preventAssignment: true,
  }),
  alias({
    entries: {
      "@": path.resolve(path.resolve(__dirname, "."), "src"),
    },
  }),
  peerDepsExternal(),
]

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: "src/entry.ts",
    output: [
      {
        format: "esm",
        name: "Vue3Notion",
        file: pkg.module,
        exports: "named",
        globals,
      },
    ],
    external,
    plugins: [vue(), ...plugins],
  },
  // CJS, SSR build.
  {
    input: "src/entry.ts",
    output: [
      {
        compact: true,
        format: "cjs",
        name: "Vue3Notion",
        file: pkg.main,
        exports: "named",
        globals,
      },
    ],
    external,
    //@ts-ignore
    plugins: [vue({ template: { optimizeSSR: true } }), ...plugins],
  },
  // Browser build.
  {
    input: "src/entry.ts",
    output: {
      compact: true,
      format: "iife",
      name: "Vue3Notion",
      file: pkg.browser,
      exports: "named",
      globals,
    },
    plugins: [vue(), ...plugins],
  },
  // PostCSS build.
  {
    input: "postcss.ts",
    output: {
      format: "es",
      file: "dist/style.ignore",
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
]
