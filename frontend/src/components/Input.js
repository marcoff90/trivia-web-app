import '../assets/input.scss';

const Input = (props) => {
  return (
      <>
        <div className={'input-container' + props.className}>
          <input className={'input'}
                 style={{
                   borderColor: props.borderColor,
                   color: props.color
                 }}
                 value={props.value}
                 placeholder={props.placeholder}
                 type={props.type}
                 onKeyPress={props.onKeyPress}
                 onChange={props['onChange']}
          />
        </div>
      </>
  );
};

export default Input;
