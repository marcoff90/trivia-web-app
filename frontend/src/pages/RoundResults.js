import {useLocation, useNavigate, useParams} from "react-router-dom";
import Auth from "../services/Auth";
import UserInfo from "../components/UserInfo";
import Avatar from "../components/Avatar";
import '../assets/round-results.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import {toast} from "react-toastify";
import AxiosService from "../services/AxiosService";

const RoundResults = () => {
  const {state} = useLocation();
  let username = window.localStorage.getItem('username');
  let avatar = window.localStorage.getItem('avatar');
  let score = window.localStorage.getItem('totalScore');
  let navigate = useNavigate();
  let duelId = useParams();
  console.log(state)
  let duel = state['data']['duelWithResults']['duel'];
  let scores = [] = state['data']['duelWithResults']['scores'];

  const finishDuelForPlayerOne = () => {
    duel['playerOneWins'] > duel['duel']['playerTwoWins']
        ?
        toast.info('Congratulations! You have won the game!', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored',
        }) :
        toast.info('You have lost 😔 Better luck next time!️', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored',
        });
    redirectToGamePage();
  };

  const finishDuelForPlayerTwo = () => {
    duel['playerOneWins'] < duel['duel']['playerTwoWins']
        ?
        toast.info('Congratulations! You have won the game!', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored',
        }) :
        toast.info('You have lost 😔 Better luck next time!️', {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored',
        });
    redirectToGamePage();
  };

  const continueGameForPlayerOne = () => {
    scores[scores.length - 1]['playerOneScore'] > scores[scores.length
    - 1]['playerTwoScore']
        ?
        toast.info(
            'Congratulations! You have won the round! The game continues in 5 seconds ☺️',
            {
              position: "top-center",
              autoClose: 4000,
              theme: 'colored',
            }) :
        toast.info('There is still time to get ahead️', {
          position: "top-center",
          autoClose: 4000,
          theme: 'colored',
        });
    redirectToQuestion();
  };

  const continueGameForPlayerTwo = () => {
    scores[scores.length - 1]['playerOneScore'] < scores[scores.length
    - 1]['playerTwoScore']
        ?
        toast.info(
            'Congratulations! You have won the round! The game continues in 5 seconds ☺️',
            {
              position: "top-center",
              autoClose: 4000,
              theme: 'colored',
            }) :
        toast.info('There is still time to get ahead️', {
          position: "top-center",
          autoClose: 4000,
          theme: 'colored',
        });
    redirectToQuestion();
  };

  const redirectToGamePage = () => {

  };

  const redirectToQuestion = () => {
    setTimeout(() => {
      AxiosService.getQuestion(duelId.duelId)
      .then(res => {
        navigate(`/games/duels/${duelId.duelId}/questions`,
            {state: {data: res.data}});
      })
      .catch(err => {
        AxiosService.errorToast(err);
      });
    }, 5000);
  };

  useEffect(() => {
    if (username === duel['playerOneUsername']) {
      if (duel['questionsNumPlayerOne'] == 26) {
        // game finished -> based on player position show pop up and redirect
        console.log('finish')
        finishDuelForPlayerOne();
        setTimeout(() => {
          navigate('/games/duels');
        }, 3000);
      } else {
        console.log('redirect player one')
        continueGameForPlayerOne();
      }

    } else if (username === duel['playerTwoUsername']) {
      if (duel['questionsNumPlayerTwo'] == 26) {
        console.log('finish')
        // game finished -> based on player position show pop up and redirect
        finishDuelForPlayerTwo();
        setTimeout(() => {
          navigate('/games/duels');
        }, 3000);
      } else {
        continueGameForPlayerTwo();
      }
    }

  }, []);

  return (
      <>
        <Auth/>
          <div className={'round-results-page'}>

            <div className={'round-header-container'}>

              <div className={'round-header-box'}>
                <p className={'round-header'}>Round {username == duel['playerOneUsername'] ? duel['playerOneRound'] - 1  : duel['playerTwoRound'] - 1}</p>
              </div>

              <div className={'round-user-info-container'}>
                <UserInfo username={username}
                          avatar={avatar}
                          userScore={score}/>
              </div>
            </div>

            <div className={'round-players-container'}>
              <div className={'round-player-one-score'}>
                {scores.filter(e => e.playerOneScore >= 0).map(
                    ({id, playerOneScore}, index) => (
                        <div className={'score-circle'}>
                          <p>{playerOneScore}</p>
                        </div>
                    ))}
              </div>

              <div
                  className={'round-background-container-results grid-container'}>

                <div className={'round-player-one-container grid-item'}>

                  <div className={'round-player-one-box'}>
                    <Avatar avatar={state['data']['playerOneAvatar']}/>
                    <p className={'round-player-name'}>{duel['playerOneUsername']}</p>

                    <div className={'round-wins'}>
                      <p className={'round-player-name'}>{duel['playerOneWins']}</p>
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
                    <p className={'round-player-name'}>{duel['playerTwoUsername']}</p>

                    <div className={'round-wins'}>
                      <p className={'round-player-name'}>{duel['playerTwoWins']}</p>
                      <FontAwesomeIcon style={{color: 'white'}}
                                       icon={faTrophy}
                                       size='lg'/>
                    </div>
                  </div>

                </div>

              </div>

              <div className={'round-player-two-score'}>
                {scores.filter(e => e.playerTwoScore >= 0).map(
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
