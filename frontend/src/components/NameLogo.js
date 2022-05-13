import quizzer from '../assets/img/Quizzer.png';
import '../assets/name-logo.scss';

const NameLogo = (props) => {
  return (
      <>
        <img className={'name-logo'}
             src={quizzer}
             width={props.width}
             height={props.height}
             alt={'quizzer-logo'}/>
      </>
  );
};

export default NameLogo;
