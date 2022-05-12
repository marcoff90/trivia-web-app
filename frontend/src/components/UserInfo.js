import Avatar from "./Avatar";
import '../assets/user-info.scss'
import {useState} from "react";
import Button from "./Button";
import colors from "../assets/color-scheme.scss";

const UserInfo = (props) => {

  const [showButton, setShowButton] = useState(false);

  const showLogout = () => {
    setShowButton(!showButton);
  };

  const logout = () => {
    // delete sessionStorage, redirect to landing page
  }

  return (
      <>
        <div className='user-info grid-container'>
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
