"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _duelController = _interopRequireDefault(require("../controllers/duel-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DuelRouter = (0, _express.Router)();
DuelRouter.get('/api/duels/new', _duelController["default"].storeDuel);
DuelRouter.get('/api/duels/:id/player-check', _duelController["default"].isSecondPlayerIn);
DuelRouter.get('/api/duels/:id/questions-check', _duelController["default"].areQuestionsChosen);
DuelRouter.post('/api/duels/:id/categories', _duelController["default"].setCategories);
DuelRouter.get('/api/duels/:id/questions', _duelController["default"].getQuestion);
DuelRouter.get('/api/duels/:id/questions/:questionId', _duelController["default"].checkAnswer);
DuelRouter.get('/api/duels/:id/results', _duelController["default"].showRoundScore);
var _default = DuelRouter;
exports["default"] = _default;
//# sourceMappingURL=duel-router.js.map