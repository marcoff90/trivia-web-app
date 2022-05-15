import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosService from "../services/AxiosService";
import colors from "../assets/color-scheme.scss";
import Input from "../components/Input";
import '../assets/reset-password.scss';
import Button from "../components/Button";
import NameLogo from "../components/NameLogo";

const ResetPassword = () => {
  const querySearcher = new URLSearchParams(useLocation().search);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  let token = querySearcher.get('token');
  let navigate = useNavigate();
  let screenWidth = window.innerWidth;

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (loading) {
      AxiosService.identifyUser(token, navigate)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        navigate('/');
        AxiosService.errorToast(err);
      })
    }
  });

  return (
      <>
        {
          loading ? <></> :
              <>
                <div className={'reset-page'}>
                  <div className={'reset-logo'}>
                    <NameLogo/>
                  </div>
                  <div className={'reset-box'}>
                    <div className={'header'}>Reset password</div>
                    <div className={'user-input'}>
                      <Input borderColor={colors['main-green']}
                             color={colors['main-green']}
                             placeholder={'email'}
                             value={email}
                             onChange={onChangeEmailHandler}
                             type={'email'}/>
                    </div>
                    <div className={'password-input'}>
                      <Input borderColor={colors['main-green']}
                             color={colors['main-green']}
                             placeholder={'password'}
                             value={password}
                             onChange={onChangePasswordHandler}
                             type={'password'}/>
                      <div className={'password-specifics'}>At least 8
                        characters, 1
                        digit, 1 capital letter
                      </div>
                    </div>
                    <div className={'button-container'}>
                      <Button text={'Reset'}/>
                    </div>
                  </div>
                  .
                </div>
              </>
        }
      </>
  );
};

export default ResetPassword;
