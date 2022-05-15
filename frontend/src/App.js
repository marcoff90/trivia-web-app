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
            <Route path={'/games/duels/:id/searching-player'} element={<WaitingForSecondPlayer/>}/>
            <Route path={'/games/duels/:id/waiting-player'} element={<PlayerTwoWaits/>}/>
            <Route path={'/games/duels/:id/choose-category'} element={<ChooseCategory/>}/>
            <Route path={'/games/duels/:id/start'} element={<PlayerVsPlayer/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;
