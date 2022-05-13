import {BrowserRouter, Route, Routes} from "react-router-dom";
import Button from "./components/Button";
import colors from './assets/color-scheme.scss'
import Input from "./components/Input";
import Avatar from "./components/Avatar";
import avatar from './assets/avatars/memoji-2.svg'
import UserInfo from "./components/UserInfo";
import Category from "./components/Category";
import Quiz from "./components/Quiz";
import Home from "./pages/Home";

const App = () => {
  const answers = [{id: 1, answer: 'answer1'}, {id: 2, answer: 'answer1'},
    {id: 3, answer: 'answer1'}, {id: 4, answer: 'answer1'}];

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
          </Routes>
        </BrowserRouter>

        {/*<Button text={'Button'} color={colors['main-red']}/>*/}
        {/*<Input borderColor={colors['main-blue']} placeholder={'username'} color={colors['main-red']}/>*/}
        {/*<Avatar avatar={avatar}/>*/}
        {/*<UserInfo username={'marcoff'} avatar={avatar} userScore={1990}/>*/}
        {/*<Category category={'Video Games'}/>*/}
        {/*<Quiz question={'question'} answers={answers}/>*/}
      </>
  );
};

export default App;
