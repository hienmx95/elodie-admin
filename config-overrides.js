var webpack = require("webpack");

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /froala_editor\.pkgd\.min\.css$/,
    loader: "string-replace-loader",
    options: {
      search: /fill-available/g,
      replace: "stretch",
    },
  });
  return config;
};
