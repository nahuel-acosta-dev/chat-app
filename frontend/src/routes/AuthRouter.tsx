import {Routes, Route} from 'react-router-dom';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import GoogleButtonLogin from '../pages/auth/GoogleButtonLogin';
import GoogleAuthScreen from '../pages/auth/GoogleAuthScreen';

const AuthRouter = () => {
    console.log('estoy aqui')

    return(
            <Routes>
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />
                <Route path='google' element={<GoogleButtonLogin/>} />
            </Routes>)
}

export default AuthRouter;