import '../assets/answer.scss';

const Answer = (props) => {
  return (
      <>
        <div className={'answer-container'}
             style={{backgroundColor: props.backgroundColor}}
             onClick={props.onClick}>
          <p className={'answer'}>{props.answer}</p>
        </div>
      </>
  );
};

export default Answer;
