import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import Loader from "../components/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import AxiosService from "../services/AxiosService";
import '../assets/waiting-for-second-player.scss';

const PlayerTwoWaits = () => {
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();

  useEffect(() => {
    const intervalCall = setInterval(() => {
      AxiosService.areQuestionsChosen(duelId.duelId, navigate);
    }, 5000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [])

  return (
      <>
        <Auth/>
          <div className={'waiting-for-second-player-page'}>
            <div className={'user-info-container'}>
              <UserInfo username={username}
                        avatar={avatar}
                        userScore={score}/>
            </div>
            <p className={'header'}>Other player is choosing categories</p>
            <Loader/>
          </div>
      </>
  );
};

export default PlayerTwoWaits;
