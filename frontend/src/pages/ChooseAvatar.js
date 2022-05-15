import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosService from "../services/AxiosService";
import Loader from "../components/Loader";
import '../assets/choose-avatar.scss';
import Button from "../components/Button";
import Avatar from "../components/Avatar";

const ChooseAvatar = () => {
  const querySearcher = new URLSearchParams(useLocation().search);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarsState, setAvatarsState] = useState([
    {id: 1, selected: false},
    {id: 2, selected: false},
    {id: 3, selected: false},
    {id: 4, selected: false},
    {id: 5, selected: false},
    {id: 6, selected: false},
    {id: 7, selected: false},
    {id: 8, selected: false},
    {id: 9, selected: false},
    {id: 10, selected: false},
    {id: 11, selected: false}]
  );
  const avatars = [
    {id: 1, avatar: 'avatars/memoji.svg'},
    {id: 2, avatar: 'avatars/memoji-1.svg'},
    {id: 3, avatar: 'avatars/memoji-2.svg'},
    {id: 4, avatar: 'avatars/memoji-3.svg'},
    {id: 5, avatar: 'avatars/memoji-4.svg'},
    {id: 6, avatar: 'avatars/memoji-5.svg'},
    {id: 7, avatar: 'avatars/memoji-6.svg'},
    {id: 8, avatar: 'avatars/memoji-7.svg'},
    {id: 9, avatar: 'avatars/memoji-8.svg'},
    {id: 10, avatar: 'avatars/memoji-9.svg'},
    {id: 11, avatar: 'avatars/memoji-10.svg'}
  ];

  let navigate = useNavigate();
  let confirmationToken = querySearcher.get('confirmation');

  const chosenAvatar = {
    border: '7px solid #FEF17C',
    borderRadius: '50%'
  };

  const changeAvatarStyle = (id) => {
    for (let avatar of avatarsState) {
      avatar.selected = avatar.id === id;
    }
    setAvatarsState(avatarsState)
  };

  const getAvatarUrl = (path) => {
    setAvatarUrl(path);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        AxiosService.getUserNameByConfirmation(confirmationToken, navigate)
        .then(res => {
          setUsername(res.data.username);
          setLoading(false);
        })
        .catch(err => {
          navigate('/');
          AxiosService.errorToast(err);
        });
      }, 3000);
    }
  }, []);

  return (
      <>
        {
          loading ? <Loader/> :
              <>
                <div className={'choose-avatar-page-background'}>
                  <p className={'main-welcome-message-background'}>Welcome to
                    Quizzer {username}!</p>
                  <p className={'welcome-message-background'}>Choose your
                    avatar</p>
                </div>

                <div className={'choose-avatar-page'}>
                  <p className={'main-welcome-message'}>Welcome to
                    Quizzer {username}!</p>
                  <p className={'welcome-message'}>Choose your avatar</p>

                  <div className={'box'}>

                    <>
                      {avatars.map(
                          ({id, avatar}, index) => (
                              <div className={'avatar-icon'}>
                                <Avatar avatar={avatar}
                                        style={avatarsState[index].selected
                                            ? chosenAvatar : {}}
                                        onClick={() => {
                                          getAvatarUrl(avatar);
                                          changeAvatarStyle(id);
                                        }}/>
                              </div>
                          ))}
                    </>
                    <div className={'button-container'}>
                      <Button text={'Choose'}/>
                    </div>
                  </div>

                </div>
              </>
        }
      </>
  );
};

export default ChooseAvatar;
