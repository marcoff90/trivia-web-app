import '../assets/answer.scss';

const Answer = (props) => {
  let screenWidth = window.innerWidth;
  const correctAnswerBorder = {
    border: screenWidth >= 1024 ? '7px solid #7EFF8B' : '3px solid #7EFF8B',
  };

  return (
      <>
        <div className={'answer-container'}
             style={{
               backgroundColor: props.color,
               border: props['correct'] ? correctAnswerBorder.border : '0px'
        }}
             onClick={props.onClick}>
          <p className={'answer'}>{props.answer}</p>
        </div>
      </>
  );
};

export default Answer;
