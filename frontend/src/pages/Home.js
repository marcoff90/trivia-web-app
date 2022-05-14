import '../assets/home.scss';
import colors from '../assets/color-scheme.scss';
import Background from "../components/Background";
import NameLogo from "../components/NameLogo";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputModal from "../components/InputModal";
import Input from "../components/Input";
import {useState} from "react";

const Home = (props) => {

  const [showLogin, setShowLogin] = useState(false);
  const openLoginModal = () => {
    setShowLogin(!showLogin);
  }
  const [showSendMail, setShowSendMail] = useState(false);
  const openMailModal = () => {
    console.log('click')
    setShowSendMail(!showSendMail);
  }

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

            <div className={'button-group'}>
              <Button text={'Login'}
                      color={colors['main-green']}
                      onClick={() => openLoginModal()}/>
              <Button text={'Sign Up'}
                      color={colors['main-blue']}/>
            </div>

            <div className={'modal'}>
                  <InputModal color={'rgba(49, 207, 160,0.49)'}
                              show={showLogin}
                              onClickOutside={() => {
                                openLoginModal()
                              }}>
                    <div className={'user-input'}>
                      <Input borderColor={colors['main-green']}
                             color={colors['main-green']}
                             placeholder={'username'}
                             type={'text'}/>
                    </div>

                    <div className={'user-input'}>
                      <Input borderColor={colors['main-green']}
                             color={colors['main-green']}
                             placeholder={'password'}
                             type={'text'}/>
                    </div>

                    <div className={'button-container'}>
                      <Button color={colors['main-green']}
                              text={'Login'}/>

                      <div className={'forgotten-password'}
                           onClick={() => openMailModal()}>forgotten
                        password?
                      </div>
                    </div>

                  </InputModal>
            </div>

            <div className={'modal'}>
              <InputModal color={'rgba(244, 113, 113, 0.49)'}
                          show={showSendMail}
                          onClickOutside={() => {
                            openMailModal()
                          }}>

                <div className={'user-input'}>
                  <Input borderColor={colors['main-red']}
                         color={colors['main-red']}
                         placeholder={'email'}
                         type={'email'}/>
                </div>

                <div className={'button-container'}>
                  <Button color={colors['main-red']}
                          text={'Send Mail'}/>
                </div>

              </InputModal>
            </div>
          </div>
        </div>
      </>
  );
}

export default Home;
