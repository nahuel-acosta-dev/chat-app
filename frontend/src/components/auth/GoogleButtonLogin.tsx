import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import queryString from 'query-string';
import GoogleButton from 'react-google-button'

axios.defaults.withCredentials = true;

const GoogleButtonLogin = () => {
  const [stateLoading, setStateLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const errRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  let location = useLocation();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const error = values.error ? values.error : null;
    if (error) {
      setErrMsg("Error signing in to Google");
    }
}, [location]);

  const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://chat-app-indol-mu.vercel.app/google/`);
        console.log(res)
        console.log(res.data.authorization_url)
        window.location.replace(res.data.authorization_url);
        console.log('error en el try');
    } catch (err) {
        console.log("Error logging in");
        console.log('fallo en el catch');
    }
};

  return(
    <div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <GoogleButton className='mx-auto mt-3' onClick={continueWithGoogle}>
        {
          stateLoading ?
          <Loading/>
          :
          <>Continue With Google</>
        }
      </GoogleButton>
    </div>
  )
}

export default GoogleButtonLogin;