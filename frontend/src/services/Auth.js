import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AxiosService from "./AxiosService";

const Auth = () => {
  let token = window.localStorage.getItem('token');
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
      AxiosService.infoToast('Please login or sign up to continue')
    }
  },[])
  return (
      <></>
  );
};

export default Auth;
