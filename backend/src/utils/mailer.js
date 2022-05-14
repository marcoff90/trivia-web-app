import nodemailer from 'nodemailer';

const sendPasswordResetMail = (userEmail, token, username) => {
  username = username[0].toUpperCase() + username.substring(1);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Password reset link',
    html: `Dear ${username},\n\n` + '<p>Click <a href="http://localhost:3001/users/recover?token=' + token + '">here</a> to reset your password.</p>' + `\n\nQuizzer Team`
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

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Activate your account',
    html: `Dear ${username},\n\n` + '<p>Click <a href="http://localhost:3001/users?confirmation=' + token + '">here</a> to complete your registration.</p>' + `\n\nQuizzer Team`
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
  sendConfirmationMail
};
