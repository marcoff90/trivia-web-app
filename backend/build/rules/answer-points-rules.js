"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var points = function points(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 1;

    case 'medium':
      return 2;

    case 'hard':
      return 3;

    default:
      return 1;
  }
};

var _default = {
  points: points
};
exports["default"] = _default;
//# sourceMappingURL=answer-points-rules.js.map