import Avatar from "./Avatar";
import '../assets/user-info.scss'
import {useState} from "react";
import Button from "./Button";
import colors from "../assets/color-scheme.scss";
import {useNavigate} from "react-router-dom";
import AxiosService from "../services/AxiosService";

const UserInfo = (props) => {
  const [showButton, setShowButton] = useState(false);

  const showLogout = () => {
    setShowButton(!showButton);
  };

  let navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate('/');
    AxiosService.infoToast('See you next time 👋');
  }

  return (
      <>
        <div className='user-info grid-container' onMouseLeave={() => setShowButton(false)}>
          <div className='user grid-item'>
            {
              showButton ? <Button text={'Log out'} color={colors['main-red']} onClick={() => logout()}/>
                  :
                  <>
                    <p className='username'>{props.username}</p>
                    <p className='user-score'>score: {props['userScore']}</p>
                  </>
            }
          </div>
          <div className='avatar grid-item'>
            <Avatar avatar={props.avatar} onClick={() => showLogout()}/>
          </div>
        </div>
      </>
  );
};

export default UserInfo;
