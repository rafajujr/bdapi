"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

var _appConfig = require('./config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

const port = process.env.APP_PORT;
_app2.default.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em ${_appConfig2.default.url}`);
});
