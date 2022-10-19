import { GoogleLogin } from 'react-google-login';
import { useLocation } from 'react-router-dom';


const GoogleButtonLogin = () => {
    let location = useLocation();


    const responseGoogle = (response: any) => {
        console.log(response);
      }
      

    return(

        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    )
}

export default GoogleButtonLogin;