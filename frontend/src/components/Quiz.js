import '../assets/quiz.scss';

const Quiz = (props) => {


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
