import {useNavigate, useParams} from "react-router-dom";
import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import Loader from "../components/Loader";
import '../assets/waiting-for-second-player.scss';
import {useEffect} from "react";
import AxiosService from "../services/AxiosService";

const WaitingForSecondPlayer = () => {
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();

  useEffect(() => {
    const intervalCall = setInterval(() => {
      AxiosService.findSecondPlayer(duelId.duelId, navigate);
    }, 5000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  return (
      <>
        <Auth/>
          <div className={'waiting-for-second-player-page'}>
            <div className={'user-info-container'}>
              <UserInfo username={username}
                        avatar={avatar}
                        userScore={score}/>
            </div>
            <p className={'header'}>Looking for second player</p>
            <Loader/>
          </div>
      </>
  );
};

export default WaitingForSecondPlayer;
