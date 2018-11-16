const babel = require("rollup-plugin-babel");
const packageJson = require("./package.json");

process.env.BABEL_ENV = "production";

module.exports = {
  external: ["react", "prop-types"],
  input: "src/withFormikAutoSave.js",
  output: {
    file: `dist/${packageJson.name}.js`,
    format: "cjs",
    sourcemap: true,
    name: packageJson.name
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: ["@babel/env", "@babel/preset-react"],
      plugins: [
        // "transform-class-properties", "external-helpers"
      ]
    })
  ]
};
