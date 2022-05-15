import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosService from "../services/AxiosService";
import Loader from "../components/Loader";
import '../assets/choose-avatar.scss';

const ChooseAvatar = () => {
  const querySearcher = new URLSearchParams(useLocation().search);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let confirmationToken = querySearcher.get('confirmation');

  useEffect(() => {
    setTimeout(() => {
      AxiosService.getUserNameByConfirmation(confirmationToken, navigate)
      .then(res => {
        setUsername(res.data.username);
        setLoading(!loading);
      })
      .catch(err => {
        navigate('/');
        AxiosService.errorToast(err);
      });
    }, 3000);
  }, []);

  return (
      <>
        {
          loading ? <Loader/> :
              <>
                <div className={'choose-avatar-page-background'}>
                  <p className={'main-welcome-message-background'}>Welcome to
                    Quizzer {username}!</p>
                  <p className={'welcome-message-background'}>Choose your avatar</p>
                </div>
                <div className={'choose-avatar-page'}>
                  <p className={'main-welcome-message'}>Welcome to
                    Quizzer {username}!</p>
                  <p className={'welcome-message'}>Choose your avatar</p>
                </div>
              </>
        }


      </>
  );
};

export default ChooseAvatar;
