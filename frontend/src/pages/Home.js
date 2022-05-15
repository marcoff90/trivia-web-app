import '../assets/home.scss';
import colors from '../assets/color-scheme.scss';
import Background from "../components/Background";
import NameLogo from "../components/NameLogo";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputModal from "../components/InputModal";
import Input from "../components/Input";
import {useState} from "react";
import AxiosService from "../services/AxiosService";
import {useNavigate} from 'react-router-dom';

const Home = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showSendMail, setShowSendMail] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let navigate = useNavigate();
  const screenWidth = window.innerWidth;

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const toggleMailModal = () => {
    setShowLogin(false);
    setShowSendMail(!showSendMail);
  };

  const toggleSignUpModal = () => {
    setShowLogin(false);
    setShowSendMail(false);
    setShowSignUp(!showSignUp);
  };

  const onChangeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

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
                      color={screenWidth >= 1024 ? colors['main-green']
                          : colors['main-red']}
                      onClick={() => toggleLoginModal()}/>
              <Button text={'Sign Up'}
                      color={colors['main-blue']}
                      onClick={() => toggleSignUpModal()}/>
            </div>

            <div className={'modal'}>
              <InputModal color={screenWidth >= 1024 ? 'rgba(49, 207, 160,0.49)'
                  : colors['main-orange']}
                          show={showLogin}
                          onClickOutside={() => {
                            toggleLoginModal()
                          }}>
                <div className={'user-input'}>
                  <Input borderColor={colors['main-green']}
                         color={colors['main-green']}
                         placeholder={'username'}
                         type={'text'}
                         onChange={onChangeUsernameHandler}
                         value={username}/>
                </div>

                <div className={'user-input'}>
                  <Input borderColor={colors['main-green']}
                         color={colors['main-green']}
                         placeholder={'password'}
                         type={'password'}
                         value={password}
                         onChange={onChangePasswordHandler}/>
                </div>

                <div className={'button-container'}>
                  <Button color={colors['main-green']}
                          text={'Login'}
                          onClick={() => AxiosService.login(username,
                              password, navigate)}/>

                  <div className={'forgotten-password'}
                       onClick={() => toggleMailModal()}>forgotten
                    password?
                  </div>
                </div>

              </InputModal>
            </div>

            <div className={'modal'}>
              <InputModal
                  color={screenWidth >= 1024 ? 'rgba(244, 113, 113, 0.49)'
                      : colors['main-yellow']}
                  show={showSendMail}
                  onClickOutside={() => {
                    toggleMailModal()
                  }}>

                <div className={'user-input'}>
                  <Input borderColor={colors['main-red']}
                         color={colors['main-red']}
                         placeholder={'email'}
                         value={email}
                         onChange={onChangeEmailHandler}
                         type={'email'}/>
                </div>

                <div className={'button-container'}>
                  <Button color={colors['main-red']}
                          onClick={() => AxiosService.forgottenPassword(email)}
                          text={'Send Mail'}/>
                </div>

              </InputModal>
            </div>

            <div className={'modal'}>
              <InputModal
                  color={screenWidth >= 1024 ? 'rgba(15, 221, 221, 0.49)'
                      : colors['main-blue']}
                  show={showSignUp}
                  onClickOutside={() => {
                    toggleSignUpModal()
                  }}>
                <div className={'user-input'}>
                  <Input borderColor={screenWidth >= 1024 ? colors['main-blue']
                      : colors['main-orange']}
                         color={screenWidth >= 1024 ? colors['main-blue']
                             : colors['main-orange']}
                         placeholder={'username'}
                         value={username}
                         onChange={onChangeUsernameHandler}
                         type={'text'}/>
                </div>

                <div className={'user-input'}>
                  <Input borderColor={screenWidth >= 1024 ? colors['main-blue']
                      : colors['main-orange']}
                         color={screenWidth >= 1024 ? colors['main-blue']
                             : colors['main-orange']}
                         placeholder={'email'}
                         value={email}
                         onChange={onChangeEmailHandler}
                         type={'email'}/>
                </div>

                <div className={'password-input'}>

                  <Input borderColor={screenWidth >= 1024 ? colors['main-blue']
                      : colors['main-orange']}
                         color={screenWidth >= 1024 ? colors['main-blue']
                             : colors['main-orange']}
                         placeholder={'password'}
                         value={password}
                         onChange={onChangePasswordHandler}
                         type={'password'}/>

                  <div className={'password-specifics'}>At least 8 characters, 1
                    digit, 1 capital letter
                  </div>
                </div>

                <div className={'button-container'}>
                  <Button color={screenWidth >= 1024 ? colors['main-blue']
                      : colors['main-orange']}
                          onClick={() => AxiosService.register(username, email,
                              password)}
                          text={'Sign Up'}/>
                </div>

              </InputModal>
            </div>

          </div>
        </div>
      </>
  );
}

export default Home;
