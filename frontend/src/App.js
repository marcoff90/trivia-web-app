import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ChooseAvatar from "./pages/ChooseAvatar";
import './assets/app.scss';

const App = () => {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/users'} element={<ChooseAvatar/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;
