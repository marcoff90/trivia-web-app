import {useLocation, useNavigate, useParams} from "react-router-dom";
import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import '../assets/player-vs-player.scss';
import Avatar from "../components/Avatar";
import {useEffect} from "react";
import AxiosService from "../services/AxiosService";
import Loader from "../components/Loader";

const PlayerVsPlayer = () => {
  const {state} = useLocation();
  let duelId = useParams();
  let navigate = useNavigate();
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');

  useEffect(() => {
    setTimeout(() => {
      AxiosService.getQuestion(duelId.duelId)
      .then(res => {
        navigate(`/games/duels/${duelId.duelId}/questions`,
            {state: {data: res.data}});
      })
      .catch(err => {
        AxiosService.errorToast(err);
      });
    }, 5000)
  }, []);

  return (
      <>
        <Auth/>
          <div className={'player-vs-player-page'}>
            <div className={'user-info-container'}>
              <UserInfo username={username}
                        avatar={avatar}
                        userScore={score}/>
            </div>

            <div className={'players-container'}>
              <div className={'background-container grid-container'}>

                <div className={'player-one-container grid-item'}>
                  <div className={'player-one-box'}>
                    <Avatar avatar={state['data']['playerOneAvatar']}/>
                    <p className={'player-name'}>{state['data']['duel']['playerOneUsername']}</p>
                  </div>
                  <div className={'empty-box'}/>
                </div>

                <div className={'text-box grid-item'}>
                  <p className={'vs-text'}>VS</p>
                </div>

                <div className={'player-two-container grid-item'}>
                  <div className={'empty-box'}/>
                  <div className={'player-two-box'}>
                    <Avatar avatar={state['data']['playerTwoAvatar']}/>
                    <p className={'player-name'}>{state['data']['duel']['playerTwoUsername']}</p>
                  </div>
                </div>

              </div>
            </div>
            <div className={'loading'}>
              <Loader/>
            </div>
          </div>
      </>
  );
};

export default PlayerVsPlayer;
