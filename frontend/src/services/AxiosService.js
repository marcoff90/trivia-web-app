import axios from "axios";
import {toast} from "react-toastify";

const url = ' https://cors-everywhere.herokuapp.com/http://quizzer-env.eba-auujfmw8.eu-central-1.elasticbeanstalk.com/api/';

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
    if (!duel['playerTwoId']) {
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
    navigate(`/games/duels/${id}/choose-category`)
  })
  .catch(err => {
    if (err.response.status === 404) {
      infoToast("Didn't find any available player. Try again  ☺️")
      navigate('/games/duels')
    }
  });
};

const areQuestionsChosen = (id, navigate) => {
  axios.get(url + `duels/${id}/questions-check`)
  .then(res => {
    navigate(`/games/duels/${id}/start`, {state: {data: res.data}});
  })
  .catch(err => {
    if (err.response.status === 404) {
      infoToast("Other player disconnected 😔️")
      navigate('/games/duels')
    }
    console.log(err);
  });
};

const getQuestion = (duelId) => {
  return axios.get(url + `duels/${duelId}/questions?count=1`)
  .catch(err => {
    console.log(err);
  });
};

const checkAnswer = (duelId, questionId, guessId) => {
  return axios.get(
      url + `duels/${duelId}/questions/${questionId}?guess=${guessId}`)
  .catch(err => {
    console.log(err);
  });
};

const getCategories = () => {
  return axios.get(url + 'categories')
  .catch(err => {
    errorToast(err);
  });
};

const setCategories = (duelId, categories, navigate) => {
  axios.post(url + `duels/${duelId}/categories`, {
    categories: categories
  })
  .then(res => {
    navigate(`/games/duels/${duelId}/start`, {state: {data: res.data}});
  })
  .catch(err => {
    if (err.response.status === 404) {
      infoToast("Other player disconnected 😔️")
      navigate('/games/duels')
    } else {
      errorToast(err);
    }
  });
};

const getResults = (duelId) => {
  return axios.get(url + `duels/${duelId}/results`)
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
  areQuestionsChosen,
  getCategories,
  setCategories,
  checkAnswer,
  getResults
};
