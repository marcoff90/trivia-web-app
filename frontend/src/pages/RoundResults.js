import {useLocation, useNavigate, useParams} from "react-router-dom";
import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import Avatar from "../components/Avatar";
import '../assets/round-results.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";


const RoundResults = () => {
  const {state} = useLocation();
  let username = window.localStorage.getItem('username');
  const [loading, setLoading] = useState(true);
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();

  console.log(state['data']);

  useEffect(() => {

  })

  // render from state
  // pop up toast we'll continue in 5 seconds
  // after time out get question request
  // if round number 5 pop up toast saying you won/lost and redirect to start duel

  return (
      <>
        <Auth/>
        <div className={'player-vs-player-page'}>

          <div className={'header-container'}>

            <div className={'header-box'}>
              <p className={'header'}>Round {state['data']['duelWithResults']['duel']['playerOneRound']}</p>
            </div>


            <div className={'user-info-container'}>
              <UserInfo username={username}
                        avatar={avatar}
                        userScore={score}/>
            </div>
          </div>



          <div className={'players-container'}>
            <div className={'background-container-results grid-container'}>

              <div className={'player-one-container grid-item'}>
                <div className={'player-one-box'}>
                  <Avatar avatar={state['data']['playerOneAvatar']}/>
                  <p className={'player-name'}>{state['data']['duelWithResults']['duel']['playerOneUsername']}</p>

                  <div className={'wins'}>
                    <p className={'player-name'}>{state['data']['duelWithResults']['duel']['playerOneWins']}</p>
                    <FontAwesomeIcon icon={faTrophy}/>
                  </div>

                </div>
                <div className={'empty-box'}/>
              </div>

              <div className={'player-two-container grid-item'}>

                <div className={'empty-box'}/>
                <div className={'player-two-box'}>
                  <Avatar avatar={state['data']['playerTwoAvatar']}/>
                  <p className={'player-name'}>{state['data']['duelWithResults']['duel']['playerTwoUsername']}</p>

                  <div className={'wins'}>
                    <p className={'player-name'}>{state['data']['duelWithResults']['duel']['playerTwoWins']}</p>
                    <FontAwesomeIcon icon={faTrophy}/>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
  );
};

export default RoundResults;
