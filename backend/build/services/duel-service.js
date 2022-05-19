"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _duelRepository = _interopRequireDefault(require("../repositories/duel-repository"));

var _userService = _interopRequireDefault(require("./user-service"));

var _questionService = _interopRequireDefault(require("./question-service"));

var _duelQuestionsRepository = _interopRequireDefault(require("../repositories/duel-questions-repository"));

var _answerPointsRules = _interopRequireDefault(require("../rules/answer-points-rules"));

var _duelRoundScoreService = _interopRequireDefault(require("./duel-round-score-service"));

var _duelQuestionsService = _interopRequireDefault(require("./duel-questions-service"));

var _answeredQuestionRepository = _interopRequireDefault(require("../repositories/answered-question-repository"));

var _answeredQuestionsService = _interopRequireDefault(require("./answered-questions-service"));

var _utils = require("express/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var storeDuel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(playerId) {
    var unfinishedDuel, possibleDuel, player, duel, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _duelRepository["default"].findOneUnfinishedOnePlayerOnly(playerId);

          case 2:
            unfinishedDuel = _context.sent;

            if (!unfinishedDuel) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", unfinishedDuel);

          case 5:
            _context.next = 7;
            return _duelRepository["default"].findOneUnfinished();

          case 7:
            possibleDuel = _context.sent;
            _context.next = 10;
            return _userService["default"].findById(playerId);

          case 10:
            player = _context.sent;

            if (!possibleDuel) {
              _context.next = 17;
              break;
            }

            possibleDuel.setPlayerTwo(player);
            possibleDuel['playerTwoUsername'] = player['username'];
            _context.next = 16;
            return possibleDuel.save();

          case 16:
            return _context.abrupt("return", possibleDuel);

          case 17:
            _context.next = 19;
            return _duelRepository["default"].create();

          case 19:
            duel = _context.sent;
            i = 1;

          case 21:
            if (!(i <= 5)) {
              _context.next = 27;
              break;
            }

            _context.next = 24;
            return _duelRoundScoreService["default"].create(i, duel.id);

          case 24:
            i++;
            _context.next = 21;
            break;

          case 27:
            duel.setPlayerOne(player);
            duel['playerOneUsername'] = player['username'];
            _context.next = 31;
            return duel.save();

          case 31:
            return _context.abrupt("return", duel);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeDuel(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isSecondPlayerIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(duelId) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _duelRepository["default"].findByIdUnfinished(duelId);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isSecondPlayerIn(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var setCategories = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(duelId, categories) {
    var possibleQuestions, questions, _iterator, _step, q;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _duelQuestionsService["default"].findByDuelId(duelId);

          case 2:
            possibleQuestions = _context3.sent;

            if (!(possibleQuestions.length === 0)) {
              _context3.next = 24;
              break;
            }

            _context3.next = 6;
            return _questionService["default"].getQuestionsForDuel(categories);

          case 6:
            questions = _context3.sent;
            _iterator = _createForOfIteratorHelper(questions);
            _context3.prev = 8;

            _iterator.s();

          case 10:
            if ((_step = _iterator.n()).done) {
              _context3.next = 16;
              break;
            }

            q = _step.value;
            _context3.next = 14;
            return _duelQuestionsService["default"].create(duelId, q.id);

          case 14:
            _context3.next = 10;
            break;

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](8);

            _iterator.e(_context3.t0);

          case 21:
            _context3.prev = 21;

            _iterator.f();

            return _context3.finish(21);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 18, 21, 24]]);
  }));

  return function setCategories(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getQuestion = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(duelId, playerId) {
    var duel, questionNumber, questions, question, answersFull, answers;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _duelRepository["default"].findById(duelId);

          case 2:
            duel = _context4.sent;
            _context4.prev = 3;
            questionNumber = playerId === duel['playerOneId'] ? duel['questionsNumPlayerOne'] - 1 : duel['questionsNumPlayerTwo'] - 1;
            _context4.next = 7;
            return duel.getQuestions();

          case 7:
            questions = _context4.sent;
            question = questions[questionNumber];
            _context4.next = 11;
            return question.getPossibleAnswers();

          case 11:
            answersFull = _context4.sent;
            answers = [];
            answersFull.forEach(function (e) {
              return answers.push({
                id: e.id,
                answer: e.answer
              });
            });
            return _context4.abrupt("return", {
              id: question.id,
              difficulty: question['difficulty'],
              question: question['question'],
              answers: shuffle(answers)
            });

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](3);
            return _context4.abrupt("return", null);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 17]]);
  }));

  return function getQuestion(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var checkAnswer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(duelId, playerId, guessAnswerId, questionId) {
    var duel, question, player, points;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _duelRepository["default"].findById(duelId);

          case 2:
            duel = _context5.sent;
            _context5.next = 5;
            return _questionService["default"].findById(questionId);

          case 5:
            question = _context5.sent;
            _context5.next = 8;
            return _userService["default"].findById(playerId);

          case 8:
            player = _context5.sent;
            points = question['correct_answer_id'] === guessAnswerId ? _answerPointsRules["default"].points(question['difficulty']) : 0;
            duel['playerOneRoundScore'] += duel['playerOneId'] === playerId && points;
            duel['playerTwoRoundScore'] += duel['playerTwoId'] === playerId && points;
            player['totalScore'] += duel['playerOneId'] === playerId && points;
            player['totalScore'] += duel['playerTwoId'] === playerId && points;
            _context5.next = 16;
            return player.save();

          case 16:
            duel['questionsNumPlayerOne'] += duel['playerOneId'] === playerId && 1;
            duel['questionsNumPlayerTwo'] += duel['playerTwoId'] === playerId && 1;
            _context5.next = 20;
            return duel.save();

          case 20:
            if (!((duel['questionsNumPlayerOne'] - 1) % 5 === 0 && playerId === duel['playerOneId'])) {
              _context5.next = 24;
              break;
            }

            console.log('setting res');
            _context5.next = 24;
            return setPlayerOneResults(duelId, playerId);

          case 24:
            if (!((duel['questionsNumPlayerTwo'] - 1) % 5 === 0 && playerId === duel['playerTwoId'])) {
              _context5.next = 28;
              break;
            }

            console.log('setting res player two');
            _context5.next = 28;
            return setPlayerTwoResults(duelId, playerId);

          case 28:
            _context5.next = 30;
            return _answeredQuestionsService["default"].create(duelId, playerId, questionId);

          case 30:
            return _context5.abrupt("return", {
              points: points,
              playerTotalScore: player['totalScore'],
              correctAnswerId: question['correct_answer_id'],
              guessAnswerId: guessAnswerId,
              questionNumber: duel['playerOneId'] === playerId ? duel['questionsNumPlayerOne'] : duel['questionsNumPlayerTwo']
            });

          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function checkAnswer(_x7, _x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var setPlayerOneResults = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(duelId, playerId) {
    var duel, roundNumber, duelScore;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _duelRepository["default"].findById(duelId);

          case 2:
            duel = _context6.sent;
            roundNumber = playerId == duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];
            _context6.next = 6;
            return _duelRoundScoreService["default"].findOneByDuelIdAndRound(duelId, roundNumber);

          case 6:
            duelScore = _context6.sent;

            if (duelScore.playerOneScore < 0) {
              duelScore.playerOneScore = duel['playerOneRoundScore'];
              duel['playerOneRoundScore'] = 0;
            }

            _context6.next = 10;
            return duelScore.save();

          case 10:
            _context6.next = 12;
            return duel.save();

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function setPlayerOneResults(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var setPlayerTwoResults = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(duelId, playerId) {
    var duel, roundNumber, duelScore;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _duelRepository["default"].findById(duelId);

          case 2:
            duel = _context7.sent;
            console.log(playerId + ' is player two');
            roundNumber = playerId == duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];
            _context7.next = 7;
            return _duelRoundScoreService["default"].findOneByDuelIdAndRound(duelId, roundNumber);

          case 7:
            duelScore = _context7.sent;

            if (duelScore.playerTwoScore <= 0) {
              duelScore.playerTwoScore = duel['playerTwoRoundScore'];
              duel['playerTwoRoundScore'] = 0;
            }

            _context7.next = 11;
            return duelScore.save();

          case 11:
            _context7.next = 13;
            return duel.save();

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function setPlayerTwoResults(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var getRoundResults = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(duelId, playerId) {
    var duel, roundNumber, results, scores;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _duelRepository["default"].findById(duelId);

          case 2:
            duel = _context8.sent;
            roundNumber = playerId === duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];
            _context8.next = 6;
            return _duelRoundScoreService["default"].findByDuelIdAndRoundNumberWhereBothPlayers(duelId, roundNumber);

          case 6:
            results = _context8.sent;

            if (results) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt("return", null);

          case 11:
            if (results['playerOneScore'] > results['playerTwoScore']) {
              duel['playerOneWins'] = duel['playerOneWins'] + 1;
            } else if (results['playerOneScore'] < results['playerTwoScore']) {
              duel['playerTwoWins'] = duel['playerTwoWins'] + 1;
            }

            if (duel['questionsNumPlayerOne'] === 26 && duel['questionsNumPlayerTwo'] === 26) {
              duel.finished = true;
            }

            if (playerId === duel['playerOneId']) {
              duel['playerOneRound'] = duel['playerOneRound'] + 1;
            } else if (playerId === duel['playerTwoId']) {
              duel['playerTwoRound'] = duel['playerTwoRound'] + 1;
            }

            _context8.next = 16;
            return duel.save();

          case 16:
            _context8.next = 18;
            return duel.getDuelRoundScores(duelId);

          case 18:
            scores = _context8.sent;
            return _context8.abrupt("return", {
              duel: duel,
              scores: scores
            });

          case 20:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getRoundResults(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var findByIdUnfinished = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(duelId) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _duelRepository["default"].findByIdUnfinished(duelId);

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function findByIdUnfinished(_x17) {
    return _ref9.apply(this, arguments);
  };
}();

var isPlayerInDuel = function isPlayerInDuel(playerId, duel) {
  if (duel['playerOneId'] === playerId) {
    return true;
  }

  if (duel['playerTwoId'] === playerId) {
    return true;
  }

  return false;
};

var shuffle = function shuffle(array) {
  var currentIndex = array.length,
      randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    var _ref10 = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref10[0];
    array[randomIndex] = _ref10[1];
  }

  return array;
};

var _default = {
  storeDuel: storeDuel,
  isSecondPlayerIn: isSecondPlayerIn,
  setCategories: setCategories,
  findByIdUnfinished: findByIdUnfinished,
  getQuestion: getQuestion,
  checkAnswer: checkAnswer,
  getRoundResults: getRoundResults,
  isPlayerInDuel: isPlayerInDuel
};
exports["default"] = _default;
//# sourceMappingURL=duel-service.js.map