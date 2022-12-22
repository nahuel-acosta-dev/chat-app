import {Routes, Route} from 'react-router-dom';
import Error404 from '../pages/error/Error404';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import ActivateScreen from '../pages/auth/ActivateScreen';
import ResendActivationEmailScreen from '../pages/auth/ResendActivationEmailScreen';
import ResetPasswordConfirmScreen from '../pages/auth/ResetPasswordConfirmScreen';
import ResetEmailConfirmScreen from '../pages/auth/ResetEmailConfirmScreen';
import ResetPasswordScreen from '../pages/auth/ResetPasswordScreen';
import GoogleButtonLogin from '../components/auth/GoogleButtonLogin';
import ErrorLogin from '../pages/error/ErrorLogin';

const AuthRouter = () => {
    return(
            <Routes>
                <Route path='*' element={<Error404/>} />
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />
                <Route path='activate/:uid/:token' element={<ActivateScreen/>} />
                <Route path='password/reset/confirm/:uid/:token' element={<ResetPasswordConfirmScreen />} />
                <Route path='email/reset/confirm/:uid/:token' element={<ResetEmailConfirmScreen />} />
                <Route path='redirect/activation/email' element={<ResendActivationEmailScreen />} />
                <Route path='reset-password' element={<ResetPasswordScreen />} />
                <Route path='errorLogin' element={<ErrorLogin/>} />
            </Routes>)
}

export default AuthRouter;