import logo from "../assets/img/Logo.png";
import '../assets/logo.scss';

const Logo = (props) => {
  return (
      <>
        <img className={'logo ' + props.className}
             src={logo}
             width={props.width}
             height={props.height}
             alt={'quizzer-logo'}/>
      </>
  );
};

export default Logo;
