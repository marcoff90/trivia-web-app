"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _duelService = _interopRequireDefault(require("../services/duel-service"));

var _apiError = _interopRequireDefault(require("../error/api-error"));

var _duelQuestionsService = _interopRequireDefault(require("../services/duel-questions-service"));

var _answeredQuestionsService = _interopRequireDefault(require("../services/answered-questions-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var storeDuel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, duel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            _context.next = 3;
            return _duelService["default"].storeDuel(user.id);

          case 3:
            duel = _context.sent;

            if (duel) {
              res.json(duel);
            }

            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeDuel(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var isSecondPlayerIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var duelId, player, isDuelReady;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            duelId = req.params.id;
            player = req.user;
            _context2.next = 4;
            return _duelService["default"].isSecondPlayerIn(duelId);

          case 4:
            isDuelReady = _context2.sent;

            if (!isDuelReady) {
              next(_apiError["default"].notFound('Duel not found!'));
            } else if (isDuelReady['playerOneId'] !== player.id) {
              next(_apiError["default"].unauthorized('Only players in duel can see the game'));
            } else if (isDuelReady['playerTwoId'] == null) {
              next(_apiError["default"].badRequest('Waiting for second player'));
            } else {
              res.json(isDuelReady);
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isSecondPlayerIn(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var areQuestionsChosen = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var duelId, player, duel, duelQuestions, playerOneAvatar, playerTwoAvatar;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            duelId = req.params.id;
            player = req.user;
            _context3.next = 4;
            return _duelService["default"].findByIdUnfinished(duelId);

          case 4:
            duel = _context3.sent;
            _context3.next = 7;
            return _duelQuestionsService["default"].findByDuelId(duelId);

          case 7:
            duelQuestions = _context3.sent;

            if (duel) {
              _context3.next = 12;
              break;
            }

            next(_apiError["default"].notFound('Duel not found!'));
            _context3.next = 27;
            break;

          case 12:
            if (!(duel['playerTwoId'] !== player.id)) {
              _context3.next = 16;
              break;
            }

            next(_apiError["default"].unauthorized('Only players in duel can see the game'));
            _context3.next = 27;
            break;

          case 16:
            if (!(duelQuestions.length === 0)) {
              _context3.next = 20;
              break;
            }

            next(_apiError["default"].notFound('Questions have not been assigned yet'));
            _context3.next = 27;
            break;

          case 20:
            _context3.next = 22;
            return _userService["default"].getUsersAvatar(duel['playerOneId']);

          case 22:
            playerOneAvatar = _context3.sent;
            _context3.next = 25;
            return _userService["default"].getUsersAvatar(duel['playerTwoId']);

          case 25:
            playerTwoAvatar = _context3.sent;
            res.json({
              duel: duel,
              playerOneAvatar: playerOneAvatar,
              playerTwoAvatar: playerTwoAvatar
            });

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function areQuestionsChosen(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var setCategories = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var duelId, player, categories, duel, categoriesSet, playerOneAvatar, playerTwoAvatar;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            duelId = req.params.id;
            player = req.user;
            categories = req.body['categories'];
            _context4.next = 5;
            return _duelService["default"].findByIdUnfinished(duelId);

          case 5:
            duel = _context4.sent;

            if (!categories) {
              next(_apiError["default"].badRequest('Categories must be provided!'));
            } else if (categories.length !== 5) {
              next(_apiError["default"].badRequest('Five categories must be chosen!'));
            }

            categoriesSet = new Set(categories);

            if (!(categoriesSet.size !== 5)) {
              _context4.next = 12;
              break;
            }

            next(_apiError["default"].badRequest('Categories must be unique!'));
            _context4.next = 29;
            break;

          case 12:
            if (duel) {
              _context4.next = 16;
              break;
            }

            next(_apiError["default"].notFound('Duel not found!'));
            _context4.next = 29;
            break;

          case 16:
            if (!(duel['playerOneId'] !== player.id)) {
              _context4.next = 20;
              break;
            }

            next(_apiError["default"].badRequest('Only host player can set categories!'));
            _context4.next = 29;
            break;

          case 20:
            _context4.next = 22;
            return _duelService["default"].setCategories(duelId, categories);

          case 22:
            _context4.next = 24;
            return _userService["default"].getUsersAvatar(duel['playerOneId']);

          case 24:
            playerOneAvatar = _context4.sent;
            _context4.next = 27;
            return _userService["default"].getUsersAvatar(duel['playerTwoId']);

          case 27:
            playerTwoAvatar = _context4.sent;
            res.json({
              duel: duel,
              playerOneAvatar: playerOneAvatar,
              playerTwoAvatar: playerTwoAvatar
            });

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setCategories(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var getQuestion = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var duelId, player, duel, questionsCount, question;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            duelId = req.params.id;
            player = req.user;
            _context5.next = 4;
            return _duelService["default"].findByIdUnfinished(duelId);

          case 4:
            duel = _context5.sent;
            questionsCount = req.query['count'];

            if (duel) {
              _context5.next = 10;
              break;
            }

            next(_apiError["default"].notFound('Duel not found!'));
            _context5.next = 30;
            break;

          case 10:
            if (!(!duel['playerOneId'] && !duel['playerTwoId'])) {
              _context5.next = 14;
              break;
            }

            next(_apiError["default"].badRequest('Two players must play the game!'));
            _context5.next = 30;
            break;

          case 14:
            if (_duelService["default"].isPlayerInDuel(player.id, duel)) {
              _context5.next = 18;
              break;
            }

            next(_apiError["default"].forbidden('Player not part of this duel!'));
            _context5.next = 30;
            break;

          case 18:
            if (questionsCount) {
              _context5.next = 22;
              break;
            }

            next(_apiError["default"].badRequest('Questions count must be provided!'));
            _context5.next = 30;
            break;

          case 22:
            if (!(questionsCount > 1)) {
              _context5.next = 26;
              break;
            }

            next(_apiError["default"].badRequest('Questions count must be equal to 1!'));
            _context5.next = 30;
            break;

          case 26:
            _context5.next = 28;
            return _duelService["default"].getQuestion(duelId, player.id);

          case 28:
            question = _context5.sent;

            if (!question) {
              next(_apiError["default"].notFound("Questions haven't been assigned yet"));
            } else {
              res.json(question);
            }

          case 30:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getQuestion(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var checkAnswer = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var duelId, questionId, guessAnswerId, player, answeredQuestion, isQuestionInDuel, duel, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            duelId = req.params.id;
            questionId = req.params.questionId;
            guessAnswerId = req.query['guess'];
            player = req.user;
            _context6.next = 6;
            return _answeredQuestionsService["default"].findByDuelIdPlayerIdAndQuestionId(duelId, player.id, questionId);

          case 6:
            answeredQuestion = _context6.sent;

            try {
              guessAnswerId = parseInt(guessAnswerId);
            } catch (e) {
              next(_apiError["default"].badRequest('Guess must be a number!'));
            }

            _context6.next = 10;
            return _duelQuestionsService["default"].isQuestionInDuel(questionId, duelId);

          case 10:
            isQuestionInDuel = _context6.sent;
            _context6.next = 13;
            return _duelService["default"].findByIdUnfinished(duelId);

          case 13:
            duel = _context6.sent;

            if (duel) {
              _context6.next = 18;
              break;
            }

            next(_apiError["default"].notFound('Duel not found!'));
            _context6.next = 38;
            break;

          case 18:
            if (isQuestionInDuel) {
              _context6.next = 22;
              break;
            }

            next(_apiError["default"].badRequest('Question not part of duel!'));
            _context6.next = 38;
            break;

          case 22:
            if (_duelService["default"].isPlayerInDuel(player.id, duel)) {
              _context6.next = 26;
              break;
            }

            next(_apiError["default"].forbidden('Player not part of this duel!'));
            _context6.next = 38;
            break;

          case 26:
            if (guessAnswerId) {
              _context6.next = 30;
              break;
            }

            next(_apiError["default"].badRequest('Guess must be provided!'));
            _context6.next = 38;
            break;

          case 30:
            if (!answeredQuestion) {
              _context6.next = 34;
              break;
            }

            next(_apiError["default"].badRequest("You've already answered this question!"));
            _context6.next = 38;
            break;

          case 34:
            _context6.next = 36;
            return _duelService["default"].checkAnswer(duelId, player.id, guessAnswerId, questionId);

          case 36:
            result = _context6.sent;
            res.json(result);

          case 38:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function checkAnswer(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var showRoundScore = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var duelId, player, duel, duelWithResults, playerOneAvatar, playerTwoAvatar;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            duelId = req.params.id;
            player = req.user;
            _context7.next = 4;
            return _duelService["default"].findByIdUnfinished(duelId);

          case 4:
            duel = _context7.sent;

            if (duel) {
              _context7.next = 9;
              break;
            }

            next(_apiError["default"].notFound('Duel not found!'));
            _context7.next = 23;
            break;

          case 9:
            _context7.next = 11;
            return _duelService["default"].getRoundResults(duelId, player.id);

          case 11:
            duelWithResults = _context7.sent;

            if (duelWithResults) {
              _context7.next = 16;
              break;
            }

            next(_apiError["default"].badRequest('Wait a moment for other player to finish this round too ☺️'));
            _context7.next = 23;
            break;

          case 16:
            _context7.next = 18;
            return _userService["default"].getUsersAvatar(duel['playerOneId']);

          case 18:
            playerOneAvatar = _context7.sent;
            _context7.next = 21;
            return _userService["default"].getUsersAvatar(duel['playerTwoId']);

          case 21:
            playerTwoAvatar = _context7.sent;
            res.json({
              duelWithResults: duelWithResults,
              playerOneAvatar: playerOneAvatar,
              playerTwoAvatar: playerTwoAvatar
            });

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function showRoundScore(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  storeDuel: storeDuel,
  isSecondPlayerIn: isSecondPlayerIn,
  setCategories: setCategories,
  getQuestion: getQuestion,
  checkAnswer: checkAnswer,
  showRoundScore: showRoundScore,
  areQuestionsChosen: areQuestionsChosen
};
exports["default"] = _default;
//# sourceMappingURL=duel-controller.js.map