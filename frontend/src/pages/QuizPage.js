import {useLocation, useNavigate, useParams} from "react-router-dom";
import colors from "../assets/color-scheme.scss";
import Auth from "../services/Auth";
import {useState} from "react";
import {useEffect} from "react";
import AxiosService from "../services/AxiosService";
import UserInfo from "../components/UserInfo";
import Quiz from "../components/Quiz";
import Question from "../components/Question";
import Answer from "../components/Answer";
import Loader from "../components/Loader";
import '../assets/quiz-page.scss';
import {toast} from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const QuizPage = () => {
  const {state} = useLocation();
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();
  const answersInitialState = [false, false, false, false];

  const [key, setKey] = useState(0);
  const [answers, setAnswers] = useState(state['data']['answers']);
  const [correctAnswerState, setCorrectAnswerState] = useState(answersInitialState);
  const [loading, setLoading] = useState(true);
  const [showPoints, setShowPoints] = useState(false);

  const [question, setQuestion] = useState({
    id: state['data']['id'],
    question: state['data']['question']
  });

  const answerColors = [
    colors['main-green'],
    colors['main-blue'],
    colors['main-red'],
    colors['main-orange']
  ];

  const tagCorrectAnswer = (correctAnswerId) => {
    let index = findAnswerIndex(correctAnswerId);
    correctAnswerState[index] = true;
    setCorrectAnswerState(correctAnswerState);
  };

  const findAnswerIndex = (answerId) => {
    for (let answer of answers) {
      if (answer.id === answerId) {
        return answers.indexOf(answer);
      }
    }
  };

  const errorToast = (message) => {
    return toast.error(message, {
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

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      // checkAnswer(-1);
    }

    return (
        <div className="timer">
          <div className="value">{remainingTime}</div>
        </div>
    );
  };

  const loadQuestion = () => {
    setCorrectAnswerState(answersInitialState);

    AxiosService.getQuestion(duelId.duelId)
    .then(res => {
      setShowPoints(false);
      setLoading(true);
      setQuestion({
        id: res.data['id'],
        question: res.data['question']
      });
      setAnswers(res.data['answers']);
      setLoading(false)
    })
    .catch(err => {
      AxiosService.errorToast(err);
    });
  };

  const checkAnswer = (guessId) => {

    AxiosService.checkAnswer(duelId.duelId, question.id, guessId)
    .then(res => {
      let correctAnswerId = res.data['correctAnswerId'];
      tagCorrectAnswer(correctAnswerId);

      if (correctAnswerId === guessId) {
        successToast(`+${res.data['points']}p`)
      } else {
        errorToast('Maybe next one!')
      }

      setTimeout(() => {
        setShowPoints(true);
        window.localStorage.setItem('totalScore', res.data['playerTotalScore']);
      }, 500);

      setTimeout(() => {
        if (res.data['questionNumber'] % 5 === 0) {
          // AxiosService.getResults(duelId.duelId, navigate);
          loadQuestion();
        } else {
          loadQuestion();
        }
        setKey(prevKey => prevKey + 1)
      }, 3000);
    });
  };

  useEffect(() => {
    if (loading) {
      setLoading(false)
    }
  }, []);

  return (
      <>
        <Auth/>
        {
          loading ?
              <div className={'loading'}>
                <Loader/>
              </div>
              :

              <div className={'quiz-page'}>

                <div className={'header-container'}>

                  <div className={'timer-wrapper'}>
                    <CountdownCircleTimer
                        isPlaying
                        key={key}
                        duration={15}
                        isSmoothColorTransition={true}
                        colors={[colors['main-blue'], colors['main-yellow'], colors['main-orange'], colors['main-red']]}
                        colorsTime={[11, 8, 3, 0]}
                        onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                        size={80}
                        strokeWidth={7}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </div>

                  <div className={'user-info-container'}>
                    <UserInfo username={username}
                              avatar={avatar}
                              userScore={score}/>
                  </div>
                </div>

                <div className={'quizzer-container'}>

                  <Quiz>
                    <div className={'question'}>
                      <Question question={question.question}/>
                    </div>

                    <>
                      {answers.map(
                          ({id, answer}, index) => (
                              <div className={'answer'}>
                                <Answer answer={answer}
                                        color={answerColors[index]}
                                        correct={correctAnswerState[index]}
                                        onClick={() => checkAnswer(id)}/>
                              </div>
                          ))}
                    </>
                  </Quiz>

                </div>

              </div>
        }
      </>
  );
};

export default QuizPage;
