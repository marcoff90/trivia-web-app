import '../assets/background.scss';

const Background = (props) => {
  return (
      <>
        <div className="background" style={{zIndex: props.zIndex}}/>
      </>
  );
};

export default Background;
