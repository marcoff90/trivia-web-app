"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _categoryController = _interopRequireDefault(require("../controllers/category-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CategoryRouter = (0, _express.Router)();
CategoryRouter.get('/api/categories', _categoryController["default"].showCategories);
var _default = CategoryRouter;
exports["default"] = _default;
//# sourceMappingURL=category-router.js.map