import '../assets/name-logo.scss';

const NameLogo = (props) => {
  return (
      <>
        <img className={'name-logo'}
             src={'/img/Quizzer.png'}
             width={props.width}
             height={props.height}
             alt={'quizzer-logo'}/>
      </>
  );
};

export default NameLogo;
