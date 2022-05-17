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

  const answersInitialState = [false, false, false, false];
  const [correctAnswerState, setCorrectAnswerState] = useState(answersInitialState);

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

  const [loading, setLoading] = useState(true);
  const [pointsForAnswer, setPointsForAnswer] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [question, setQuestion] = useState({
    id: state['data']['id'],
    question: state['data']['question']
  });

  const [answers, setAnswers] = useState(state['data']['answers']);
  const [timer, setTimer] = useState(15);

  const answerColors = [
    colors['main-green'],
    colors['main-blue'],
    colors['main-red'],
    colors['main-orange']
  ];

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
      setPointsForAnswer(res.data['points']);
      console.log(findAnswerIndex(correctAnswerId));
      tagCorrectAnswer(correctAnswerId);

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
      setLoading(false)
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
