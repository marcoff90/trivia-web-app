import '../assets/avatar.scss';

const Avatar = (props) => {
  return (
      <>
        <img className={'avatar'}
             src={props.avatar[0].toUpperCase() + props.avatar.substring(1)}
             onClick={props.onClick}
             width={props.width}
             height={props.height}
             style={props.style}
             alt={'avatar'}/>
      </>
  );
};

export default Avatar;
