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
import {Slide} from "react-awesome-reveal";
import Loader from "../components/Loader";
import '../assets/quiz-page.scss';

const QuizPage = () => {
  const {state} = useLocation();
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();
  let screenWidth = window.innerWidth;

  const [loading, setLoading] = useState(true);
  const [pointsForAnswer, setPointsForAnswer] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [question, setQuestion] = useState({
    id: state['data']['id'],
    question: state['data']['question']
  });

  const [answers, setAnswers] = useState(state['data']['answers']);
  const [timer, setTimer] = useState(15);
  const [correctAnswerState, setCorrectAnswerState] = useState([]);
  const [wrongAnswerState, setWrongAnswerState] = useState([]);

  const correctAnswerBorder = {
    border: screenWidth >= 1024 ? '7px solid #7EFF8B' : '3px solid #7EFF8B',
  };

  const wrongAnswerBorder = {
    border: screenWidth >= 1024 ? '7px solid #FF9292' : '3px solid #FF9292',
  };

  const setBorder = (index) => {
    if (correctAnswerState[index].selected) {
      return correctAnswerBorder.border;
    } else if (wrongAnswerState[index].selected) {
      return wrongAnswerBorder.border;
    } else {
      return {};
    }
  };

  const answerColors = [
    colors['main-green'],
    colors['main-blue'],
    colors['main-red'],
    colors['main-orange']
  ];

  const setAnswersState = () => {
    console.log(correctAnswerState);
    console.log(wrongAnswerState);
    setCorrectAnswerState(answers.forEach(item => {
      correctAnswerState.push({
        id: item.id,
        selected: false
      })
    }));
    setWrongAnswerState(answers.forEach(item => {
      wrongAnswerState.push({
        id: item.id,
        selected: false
      })
    }));
    setCorrectAnswerState(correctAnswerState);
    setWrongAnswerState(wrongAnswerState);
    setLoading(false);
  };

  const loadQuestion = () => {
    AxiosService.getQuestion(duelId.duelId)
    .then(res => {
      setShowPoints(false);
      setLoading(true);
      setQuestion({
        id: res.data['id'],
        question: res.data['question']
      });
      setAnswers(res.data['answers']);
      setAnswersState();
    })
    .catch(err => {
      AxiosService.errorToast(err);
    });
  };

  const tagCorrectAnswer = (answerId) => {
    for (let answer of correctAnswerState) {
      answer.selected = answer.id === answerId;
    }
    setCorrectAnswerState(correctAnswerState);
  };

  const tagWrongAnswer = (answerId) => {
    for (let answer of wrongAnswerState) {
      answer.selected = answer.id === answerId;
    }
    setWrongAnswerState(wrongAnswerState);
  };

  const tagAnswers = (correctAnswerId, guessId) => {
    if (correctAnswerId === guessId) {
      tagCorrectAnswer(guessId);
    } else {
      tagWrongAnswer(guessId);
      tagCorrectAnswer(correctAnswerId);
    }
  };

  const checkAnswer = (guessId) => {
    AxiosService.checkAnswer(duelId.duelId, question.id, guessId)
    .then(res => {

      setPointsForAnswer(res.data['points']);
      tagAnswers(res.data['correctAnswerId'], guessId);

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
          setTimer(15);
          // timerInterval();
        }
        // after three seconds check if question num % 5 = 0
        // if so axios to results in then navigate to results with res.data in state -> results back to questin with new question in state
        // if not reset timer load new question

      }, 3000);
    });
  };

  const timerInterval = () => {
    const intervalCall = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        checkAnswer(duelId.duelId, question.id, 0);
      }
    }, 1000);

    return () => {
      clearInterval(intervalCall);
    };
  };

  useEffect(() => {
    if (loading) {
      setAnswersState();
      // timerInterval();
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
                  <div className={'timer-container'}>
                    <div className={'timer'}>
                      {timer}
                    </div>
                  </div>
                  <div className={'user-info-container'}>
                    <UserInfo username={username}
                              avatar={avatar}
                              userScore={score}/>
                  </div>
                </div>

                <div className={'points-container'}>
                  {
                      showPoints &&
                      <Slide duration={2000}>
                        <div className={'points'}>
                          {pointsForAnswer}
                        </div>
                      </Slide>
                  }
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
                                        style={{
                                          backgroundColor: answerColors[index],
                                          border: setBorder(index)
                                        }}
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
