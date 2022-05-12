import {BrowserRouter, Route, Routes} from "react-router-dom";
import Button from "./components/Button";
import colors from './assets/color-scheme.scss'

const App = () => {
  return (
    <>
      <h1>Hello world</h1>
      <Button text={'hi'} color={colors['main-red']}/>
    </>
  );
};

export default App;
