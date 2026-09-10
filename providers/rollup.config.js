import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/package.ts",

  output: {
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },

  external: [
    "@emotion/react",
    "@emotion/styled",
    "@mui/material",
    "react",
    "react-dom",
  ],

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.package.json",
    }),
  ],
};
