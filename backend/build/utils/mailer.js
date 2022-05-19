"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

var sendPasswordResetMail = function sendPasswordResetMail(userEmail, token, username) {
  username = username[0].toUpperCase() + username.substring(1);
  var mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Password reset link',
    html: "Dear ".concat(username, ",\n\n") + '<p>Click <a href="http://localhost:3001/users/recover?token=' + token + '">here</a> to reset your password.</p>' + "\n\nQuizzer Team"
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

var sendConfirmationMail = function sendConfirmationMail(userEmail, token, username) {
  username = username[0].toUpperCase() + username.substring(1);
  var mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Activate your account',
    html: "Dear ".concat(username, ",\n\n") + '<p>Click <a href="http://localhost:3001/users?confirmation=' + token + '">here</a> to complete your registration.</p>' + "\n\nQuizzer Team"
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

var confirmPasswordChange = function confirmPasswordChange(userEmail, username) {
  username = username[0].toUpperCase() + username.substring(1);
  var mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Your account has been updated',
    html: "Dear ".concat(username, ",\n\n") + '<p>The password on your account has been changed. If you did not do this change. Change your <a href="http://localhost:3001">password</a></p>' + "\n\nQuizzer Team"
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

var _default = {
  sendPasswordResetMail: sendPasswordResetMail,
  sendConfirmationMail: sendConfirmationMail,
  confirmPasswordChange: confirmPasswordChange
};
exports["default"] = _default;
//# sourceMappingURL=mailer.js.map