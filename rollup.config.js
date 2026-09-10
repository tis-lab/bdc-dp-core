import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/package.ts",

  output: {
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },

  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
  ],

  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.package.json",
    }),
  ],
};
