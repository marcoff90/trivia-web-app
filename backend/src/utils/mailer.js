import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const sendPasswordResetMail = (userEmail, token, username) => {
  username = username[0].toUpperCase() + username.substring(1);

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Password reset link',
    html: `Dear ${username},\n\n`
        + '<p>Click <a href="https://master.d6jcsgqi9y2ht.amplifyapp.com/users/recover?token=' + token
        + '">here</a> to reset your password.</p>' + `\n\nQuizzer Team`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendConfirmationMail = (userEmail, token, username) => {
  username = username[0].toUpperCase() + username.substring(1);

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Activate your account',
    html: `Dear ${username},\n\n`
        + '<p>Click <a href="https://master.d6jcsgqi9y2ht.amplifyapp.com/users?confirmation=' + token
        + '">here</a> to complete your registration.</p>' + `\n\nQuizzer Team`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const confirmPasswordChange = (userEmail, username) => {
  username = username[0].toUpperCase() + username.substring(1);

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Your account has been updated',
    html: `Dear ${username},\n\n`
        + '<p>The password on your account has been changed. If you did not do this change. Change your <a href="https://master.d6jcsgqi9y2ht.amplifyapp.com">password</a></p>'
        + `\n\nQuizzer Team`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default {
  sendPasswordResetMail,
  sendConfirmationMail,
  confirmPasswordChange
};
