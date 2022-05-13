import Question from "./Question";
import Answer from "./Answer";
import colors from '../assets/color-scheme.scss'
import '../assets/quiz.scss';

const Quiz = (props) => {
  /**
   * gets data from get question page
   * sends data to question and answer
   * on click on answer gets back the id of the answer
   * sends request to api
   *
   */


  const answerColors = [colors['main-green'], colors['main-blue'],
    colors['main-red'], colors['main-orange']];
  return (
      <>
        <div className={'quiz-container'}>
          {props.children}
          {/*<div className={'question'}>*/}
          {/*  /!*<Question question={props['question']}/>*!/*/}

          {/*</div>*/}

          {/*<>*/}
          {/*  {props.answers.map(*/}
          {/*      ({id, answer}, index) => (*/}
          {/*          <div className={'answer'}>*/}
          {/*            <Answer answer={answer} id={id}*/}
          {/*                    backgroundColor={answerColors[index]}/>*/}
          {/*          </div>*/}
          {/*      ))}*/}
          {/*</>*/}

        </div>
      </>
  );
};

export default Quiz;
