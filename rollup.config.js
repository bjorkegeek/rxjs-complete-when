import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const pkg = {
  main: "dist/complete-when.cjs.js",
  module: "dist/complete-when.esm.js",
  browser: "dist/complete-when.umd.js",
};

const external = ["rxjs", "rxjs/operators"];

export default [
  // Browser-friendly UMD build
  {
    input: "src/complete-when.ts",
    output: {
      name: "rxjsCompleteWhen",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals: { rxjs: "rxjs", "rxjs/operators": "rxjsOperators" },
    },
    plugins: [
      resolve(), // Resolve node modules
      commonjs(), // Convert CommonJS modules to ES6
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(), // Minify for smaller bundle size
    ],
    external,
  },

  // CommonJS (Node.js) and ES module (bundlers) builds
  {
    input: "src/complete-when.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    external,
  },
];
