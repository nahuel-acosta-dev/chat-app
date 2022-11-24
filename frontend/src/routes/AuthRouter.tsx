import {Routes, Route} from 'react-router-dom';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import ActivateScreen from '../pages/auth/ActivateScreen';
import ResendActivationEmail from '../pages/auth/ResendActivationEmail';
import ResetPasswordConfirmScreen from '../pages/auth/ResetPasswordConfirmScreen';
import ResetPasswordScreen from '../pages/auth/ResetPasswordScreen';
import GoogleButtonLogin from '../pages/auth/GoogleButtonLogin';

const AuthRouter = () => {
    return(
            <Routes>
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />
                <Route path='activate/:uid/:token' element={<ActivateScreen/>} />
                <Route path='password/reset/confirm/:uid/:token' element={<ResetPasswordConfirmScreen />} />
                <Route path='redirect/activation/email' element={<ResendActivationEmail />} />
                <Route path='reset-password' element={<ResetPasswordScreen />} />
                <Route path='google' element={<GoogleButtonLogin/>} />
            </Routes>)
}

export default AuthRouter;