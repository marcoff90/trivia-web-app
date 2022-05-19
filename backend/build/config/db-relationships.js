"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("./database"));

var _question = _interopRequireDefault(require("../models/question"));

var _category = _interopRequireDefault(require("../models/category"));

var _possibleAnswer = _interopRequireDefault(require("../models/possible-answer"));

var _duelQuestions = _interopRequireDefault(require("../models/duel-questions"));

var _duel = _interopRequireDefault(require("../models/duel"));

var _user = _interopRequireDefault(require("../models/user"));

var _duelRoundScore = _interopRequireDefault(require("../models/duel-round-score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createRelationships = function createRelationships() {
  _category["default"].hasMany(_question["default"], {
    as: 'categoryQuestions',
    foreignKey: 'category_id'
  });

  _question["default"].belongsTo(_category["default"], {
    as: 'categoryQuestion',
    foreignKey: 'category_id'
  });

  _question["default"].hasMany(_possibleAnswer["default"], {
    as: 'possibleAnswers',
    foreignKey: 'question_id',
    getPossibleAnswers: function getPossibleAnswers() {
      return this.getDataValue('possibleAnswers');
    }
  });

  _possibleAnswer["default"].belongsTo(_question["default"], {
    as: 'possibleAnswer',
    foreignKey: 'question_id'
  });

  _question["default"].belongsToMany(_duel["default"], {
    through: _duelQuestions["default"]
  });

  _duel["default"].belongsToMany(_question["default"], {
    through: _duelQuestions["default"],
    getQuestions: function getQuestions() {
      return this.getDataValue;
    }
  });

  _duel["default"].belongsTo(_user["default"], {
    as: 'playerOne',
    foreignKey: 'playerOneId',
    setPlayerOne: function setPlayerOne(playerOne) {
      this.setDataValue('playerOne', playerOne);
    }
  });

  _duel["default"].belongsTo(_user["default"], {
    as: 'playerTwo',
    foreignKey: 'playerTwoId',
    setPlayerTwo: function setPlayerTwo(playerTwo) {
      this.setDataValue('playerTwo', playerTwo);
    }
  });

  _duel["default"].hasMany(_duelRoundScore["default"], {
    as: 'duelRoundScores',
    foreignKey: 'duel_id',
    getDuelRoundScores: function getDuelRoundScores() {
      return this.getDataValue('duelRoundScores');
    }
  });

  _duelRoundScore["default"].belongsTo(_duel["default"], {
    as: 'duelRoundScore',
    foreignKey: 'duel_id'
  });

  _database["default"].sync().then(function (res) {
    console.log(res);
  });
};

var _default = createRelationships;
exports["default"] = _default;
//# sourceMappingURL=db-relationships.js.map