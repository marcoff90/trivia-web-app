import '../assets/avatar.scss';

const Avatar = (props) => {
  return (
      <>
        <img className={'avatar'}
             src={props.avatar}
             onClick={props.onClick}
             width={props.width}
             height={props.height}
             alt={'avatar'}/>
      </>
  );
};

export default Avatar;
