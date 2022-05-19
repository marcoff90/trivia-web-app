"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _apiErrorHandler = _interopRequireDefault(require("./middlewares/api-error-handler"));

var _registerRouter = _interopRequireDefault(require("./routers/register-router"));

var _authorizationMiddleware = _interopRequireDefault(require("./middlewares/authorization-middleware"));

var _dbRelationships = _interopRequireDefault(require("./config/db-relationships"));

var _duelRouter = _interopRequireDefault(require("./routers/duel-router"));

var _categoryRouter = _interopRequireDefault(require("./routers/category-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _dbRelationships["default"])();
app.use(_registerRouter["default"]);
app.use(_authorizationMiddleware["default"]);
app.use(_categoryRouter["default"]);
app.use(_duelRouter["default"]);
app.use(_apiErrorHandler["default"]);
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=app.js.map