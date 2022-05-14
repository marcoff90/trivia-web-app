import {useLocation} from "react-router-dom";

const ChooseAvatar = () => {
  const querySearcher = new URLSearchParams(useLocation().search);
  console.log(querySearcher.get('confirmation'))
  return (
      <>
        <div className={'choose-avatar-page'}>

        </div>
      </>
  );
};

export default ChooseAvatar;
