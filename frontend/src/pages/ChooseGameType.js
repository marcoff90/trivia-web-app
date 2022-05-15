import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import '../assets/choose-game-type.scss';
import {useState} from "react";

const ChooseGameType = () => {
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  const [buttonText, setButtonText] = useState('START DUEL');
  const [clickableButton, setClickableButton] = useState({pointerEvents: 'auto'})


  const changeButtonText = () => {
    setClickableButton({pointerEvents: 'none'});
    setButtonText('3');
    setTimeout(() => {
      setButtonText('2')
    }, 1000);
    setTimeout(() => {
      setButtonText('1');
    }, 2000);
  };

  return (
      <>
        <Auth/>
        <div className={'choose-game-type-page'}>
          <div className={'user-info-container'}>
            <UserInfo username={username} avatar={avatar} userScore={score}/>
          </div>
          <div className={'circle-container'}
               style={clickableButton}
               onClick={() => changeButtonText()}>
            <div className={'circle'}>
              <div className={'text'}>
                {buttonText}
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default ChooseGameType;
