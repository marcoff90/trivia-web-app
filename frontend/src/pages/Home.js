import '../assets/home.scss';
import colors from '../assets/color-scheme.scss';
import Background from "../components/Background";
import NameLogo from "../components/NameLogo";
import Logo from "../components/Logo";
import Button from "../components/Button";

const Home = (props) => {

  return (
      <>
        <Background/>
        <div className={'main-logo'}>
          <Logo/>
        </div>

        <div className={'home-page'}>

          <div className={'info-container'}>
            <NameLogo/>

            <p className={'primary-info'}>Test your knowledge in a multiplayer
              trivia game!</p>

            <p className={'secondary-info'}>Over 20 000 questions!</p>
            <p className={'secondary-info'}>Choose from 12 categories!</p>
            <p className={'secondary-info'}>5 rounds with 5 questions!</p>
          </div>



          <div className={'control'}>
            <Button text={'Login'} color={colors['main-green']}/>
            <Button text={'Sign Up'} color={colors['main-blue']}/>
          </div>
        </div>
      </>
  );
}

export default Home;
