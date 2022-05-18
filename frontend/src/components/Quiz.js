import '../assets/quiz.scss';

const Quiz = (props) => {


  return (
      <>
        <div className={'quiz-container'}>
          {props.children}
        </div>
      </>
  );
};

export default Quiz;
