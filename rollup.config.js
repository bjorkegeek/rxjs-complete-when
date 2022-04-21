import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const external = ["rxjs", "rxjs/operators"];

export default [
  // browser-friendly UMD build
  {
    input: "src/complete-when.ts",
    output: {
      name: "rxjs-complete-when",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals: { rxjs: "rxjs", "rxjs/operators": "rxjsOperators" },
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external,
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/complete-when.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json" })],
    external,
  },
];
