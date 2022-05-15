import axios from "axios";
import {toast} from "react-toastify";

const url = 'http://localhost:3000/api/';

const login = (username, password, navigate) => {
  axios.post(url + 'login', {
    username: username,
    password: password
  })
  .then(res => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;
    window.localStorage.setItem('token', res.data.token);
    // TODO navigate to choose-game
  })
  .catch(err => {
    errorToast(err);
  });
};

const register = (username, email, password, navigate) => {
  axios.post(url + 'registration', {
    username: username,
    email: email,
    password: password
  })
  .then(() => {
    infoToast('Check your email and confirm your email address to login 😻')
  })
  .catch(err => {
    errorToast(err);
  });
};

const forgottenPassword = (email, navigate) => {
  axios.post(url + 'users/forgotten-password', {
    email: email
  })
  .then(() => {
    infoToast('Check your email to reset your password 😊');
  })
  .catch(err => {
    errorToast(err);
  });
};

const getUserNameByConfirmation = (confirmationToken, navigate) => {
 return axios.get(url + 'users/welcome?confirmation=' + confirmationToken)
  .catch(err => {
    navigate('/');
    errorToast(err);
  });
};

const activateUser = (confirmationToken, navigate, avatarUrl) => {
  axios.post(url + 'users/activate?confirmation=' + confirmationToken, {
    avatar: avatarUrl
  })
  .then(res => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;
    window.localStorage.setItem('token', res.data.token);
    window.localStorage.setItem('avatar', res.data.avatar);
    window.localStorage.setItem('username', res.data.username);
    // TODO navigate to choose-game
  })
  .catch(err => {
    errorToast(err)
  });
};

const errorToast = (err) => {
  return toast.error(err.response.data.error, {
    position: "top-center",
    autoClose: 3000,
    theme: 'colored'
  });
};

const successToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    theme: 'colored'
  });
};

const infoToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
    theme: 'colored'
  });
}

export default {
  login,
  register,
  forgottenPassword,
  getUserNameByConfirmation,
  infoToast,
  errorToast,
  successToast,
  activateUser
};
