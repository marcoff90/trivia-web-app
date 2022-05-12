import Question from "./Question";
import Answer from "./Answer";
import colors from '../assets/color-scheme.scss'
import '../assets/quiz.scss';
import {useState} from "react";

const Quiz = (props) => {
  const answerColors = [colors['main-green'], colors['main-blue'],
    colors['main-red'], colors['main-orange']];
  return (
      <>
        <div className={'quiz-container'}>

          <div className={'question'}>
            <Question question={props['question']}/>
          </div>

          <>
            {props.answers.map(
                ({id, answer}, index) => (
                    <div className={'answer'}>
                      <Answer answer={answer} id={id}
                              backgroundColor={answerColors[index]}/>
                    </div>
                ))}
          </>

        </div>
      </>
  );
};

export default Quiz;
