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
                 placeholder={props.placeholder}
                 type={props.type}
                 onChange={props['onChange']}
          />
        </div>
      </>
  );
};

export default Input;
