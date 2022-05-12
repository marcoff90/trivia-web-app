import '../assets/question.scss';

const Question = (props) => {
  return (
      <>
        <div className={'question-container'}>
          <p className={'question'}>{props['question']}</p>
        </div>
      </>
  );
};

export default Question;
