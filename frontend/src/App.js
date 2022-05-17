import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ChooseAvatar from "./pages/ChooseAvatar";
import './assets/app.scss';
import ResetPassword from "./pages/ResetPassword";
import {ToastContainer} from "react-toastify";
import ChooseGameType from "./pages/ChooseGameType";
import WaitingForSecondPlayer from "./pages/WaitingForSecondPlayer";
import PlayerTwoWaits from "./pages/PlayerTwoWaits";
import ChooseCategory from "./pages/ChooseCategory";
import PlayerVsPlayer from "./pages/PlayerVsPlayer";
import QuizPage from "./pages/QuizPage";
import RoundResults from "./pages/RoundResults";

const App = () => {

  return (
      <>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            closeButton={false}
        />
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/users'}  element={<ChooseAvatar/>}/>
            <Route path={'/users/recover'} element={<ResetPassword/>}/>
            <Route path={'/games/duels/'} element={<ChooseGameType/>}/>
            <Route path={'/games/duels/:duelId/searching-player'} element={<WaitingForSecondPlayer/>}/>
            <Route path={'/games/duels/:duelId/waiting-player'} element={<PlayerTwoWaits/>}/>
            <Route path={'/games/duels/:duelId/choose-category'} element={<ChooseCategory/>}/>
            <Route path={'/games/duels/:duelId/start'} element={<PlayerVsPlayer/>}/>
            <Route path={'/games/duels/:duelId/questions'} element={<QuizPage/>}/>
            <Route path={'/games/duels/:duelId/round-results'} element={<RoundResults/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;
