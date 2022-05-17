import {useLocation, useNavigate, useParams} from "react-router-dom";
import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import Avatar from "../components/Avatar";
import '../assets/round-results.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";

const RoundResults = () => {
  const {state} = useLocation();
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();

  // render from state
  // pop up toast we'll continue in 5 seconds
  // after time out get question request
  // if round number 5 pop up toast saying you won/lost and redirect to start duel

  return (
      <>
        <Auth/>
        <div className={'round-results-page'}>

          <div className={'round-header-container'}>

            <div className={'round-header-box'}>
              <p className={'round-header'}>Round {state['data']['duelWithResults']['duel']['playerOneRound']}</p>
            </div>

            <div className={'round-user-info-container'}>
              <UserInfo username={username}
                        avatar={avatar}
                        userScore={score}/>
            </div>
          </div>

          <div className={'round-players-container'}>
            <div className={'round-player-one-score'}>
              {state['data']['duelWithResults']['scores'].map(
                  ({id, playerOneScore}, index) => (
                      <div className={'score-circle'}>
                        <p>{playerOneScore}</p>
                      </div>
                  ))}
            </div>

            <div className={'round-background-container-results grid-container'}>

              <div className={'round-player-one-container grid-item'}>

                <div className={'round-player-one-box'}>
                  <Avatar avatar={state['data']['playerOneAvatar']}/>
                  <p className={'round-player-name'}>{state['data']['duelWithResults']['duel']['playerOneUsername']}</p>

                  <div className={'round-wins'}>
                    <p className={'round-player-name'}>{state['data']['duelWithResults']['duel']['playerOneWins']}</p>
                    <FontAwesomeIcon style={{color: 'white'}}
                                     icon={faTrophy}
                                     size='lg'/>
                  </div>

                </div>
                <div className={'round-empty-box'}/>
              </div>

              <div className={'round-player-two-container grid-item'}>

                <div className={'round-empty-box'}/>

                <div className={'round-player-two-box'}>
                  <Avatar avatar={state['data']['playerTwoAvatar']}/>
                  <p className={'round-player-name'}>{state['data']['duelWithResults']['duel']['playerTwoUsername']}</p>

                  <div className={'round-wins'}>
                    <p className={'round-player-name'}>{state['data']['duelWithResults']['duel']['playerTwoWins']}</p>
                    <FontAwesomeIcon style={{color: 'white'}}
                                     icon={faTrophy}
                                     size='lg'/>
                  </div>
                </div>

              </div>

            </div>

            <div className={'round-player-two-score'}>
              {state['data']['duelWithResults']['scores'].map(
                  ({id, playerTwoScore}, index) => (
                      <div className={'score-circle'}>
                        <p>{playerTwoScore}</p>
                      </div>
                  ))}
            </div>

          </div>
        </div>
      </>
  );
};

export default RoundResults;
