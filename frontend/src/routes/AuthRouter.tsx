import {Routes, Route} from 'react-router-dom';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import ActivateScreen from '../pages/auth/ActivateScreen';
import ResendActivationEmail from '../pages/auth/ResendActivationEmail';
import GoogleButtonLogin from '../pages/auth/GoogleButtonLogin';

const AuthRouter = () => {
    return(
            <Routes>
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />
                <Route path='activate/:uid/:token' element={<ActivateScreen/>} />
                <Route path='redirect/activation/email' element={<ResendActivationEmail />} />
                <Route path='google' element={<GoogleButtonLogin/>} />
            </Routes>)
}

export default AuthRouter;