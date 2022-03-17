import postcss from "rollup-plugin-postcss"
export default [
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
