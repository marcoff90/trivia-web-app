import '../assets/button.scss';

const Button = (props) => {
  return (
      <>
        <div className={'button ' + props.className}
             style={{backgroundColor: props.color}}
             onClick={props.onClick}>
          <div>{props.text}</div>
        </div>
      </>
  );
};

export default Button;
