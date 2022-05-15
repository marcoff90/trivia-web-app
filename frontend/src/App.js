import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ChooseAvatar from "./pages/ChooseAvatar";
import './assets/app.scss';
import ResetPassword from "./pages/ResetPassword";
import {ToastContainer} from "react-toastify";
import ChooseGameType from "./pages/ChooseGameType";

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
            <Route path={'/games'} element={<ChooseGameType/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;
