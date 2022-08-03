const withTM = require("next-transpile-modules")(["@kvet/next-layout"]);

module.exports = withTM({
  reactStrictMode: true,
});
