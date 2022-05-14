import '../assets/logo.scss';

const Logo = (props) => {
  return (
      <>
        <img className={'logo ' + props.className}
             src={'../img/Logo.png'}
             width={props.width}
             height={props.height}
             alt={'quizzer-logo'}/>
      </>
  );
};

export default Logo;
