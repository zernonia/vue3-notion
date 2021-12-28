import alias from "@rollup/plugin-alias"
import vue from "rollup-plugin-vue"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import typescript from "rollup-plugin-typescript"
import postcss from "rollup-plugin-postcss"
import path from "path"

const external = ["vue"]
const plugins = [
  typescript({
    tsconfig: false,
    experimentalDecorators: true,
    module: "esnext",
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
        file: "dist/library.ts",
      },
    ],
    external,
    plugins: [vue(), ...plugins],
  },
  // SSR build.
  {
    input: "src/entry.ts",
    output: [
      {
        format: "cjs",
        file: "dist/library.ssr.ts",
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
      format: "iife",
      file: "dist/min.js",
    },
    plugins: [vue(), ...plugins],
  },
  // PostCSS build.
  {
    input: "postcss.ts",
    output: {
      format: "es",
      file: "dist/styles.ignore",
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
]
