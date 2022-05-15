import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Auth = () => {
  let token = window.localStorage.getItem('token');
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  },[])
  return (
      <></>
  );
};

export default Auth;
