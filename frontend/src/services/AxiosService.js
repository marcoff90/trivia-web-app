import axios from "axios";
import {toast} from "react-toastify";

const url = 'http://localhost:3000/api/';

const afterLoginSetup = (data) => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
  window.localStorage.setItem('token', data.token);
  window.localStorage.setItem('avatar', data.avatar);
  window.localStorage.setItem('username', data.username);
  window.localStorage.setItem('totalScore', data.totalScore);
};

const login = (username, password, navigate) => {
  axios.post(url + 'login', {
    username: username,
    password: password
  })
  .then(res => {
    afterLoginSetup(res.data)
    navigate('/games/duels');
  })
  .catch(err => {
    errorToast(err);
  });
};

const register = (username, email, password) => {
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

const forgottenPassword = (email) => {
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
    afterLoginSetup(res.data)
    navigate('/games/duels');
  })
  .catch(err => {
    errorToast(err)
  });
};

const identifyUser = (resetToken, navigate) => {
  return axios.get(url + 'users/identify?token=' + resetToken)
  .catch(err => {
    navigate('/')
    errorToast(err);
  });
};

const resetPassword = (email, password, resetToken, navigate) => {
  axios.post(url + 'users/recover?token=' + resetToken, {
    email: email,
    password: password
  })
  .then(res => {
    navigate('/');
    successToast('Password changed successfully');
  })
  .catch(err => {
    errorToast(err);
  });
};

const startDuel = (navigate) => {
  axios.get(url + 'duels/new')
  .then(res => {
    let duel = res.data;
    if (duel['playerTwoId'] === null) {
      navigate(`/games/duels/${duel.id}/searching-player`)
    } else {
      navigate(`/games/duels/${duel.id}/waiting-player`)
    }
  })
  .catch(err => {
    errorToast(err);
  })
};

const findSecondPlayer = (id, navigate) => {
  axios.get(url + `duels/${id}/player-check`)
  .then(res => {
    console.log(res);
    navigate(`/duels/${id}/choose-category`)
  })
  .catch(err => {
    errorToast(err);
  });
};

const areQuestionsChosen = (id, navigate) => {
  axios.get(url + `duels/${id}/questions-check`)
  .then(res => {
    console.log(res);
    navigate(`/duels/${id}/start`)
  })
  .catch(err => {
    errorToast(err)
  });
};

const getQuestion = (duelId, navigate) => {
  axios.get(url + `duels/${duelId}/questions?count=1`)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    errorToast(err);
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
  activateUser,
  identifyUser,
  resetPassword,
  startDuel,
  findSecondPlayer,
  getQuestion,
  areQuestionsChosen
};
