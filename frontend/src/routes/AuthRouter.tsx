import {Routes, Route} from 'react-router-dom';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';

const AuthRouter = () => {
    console.log('estoy aqui')

    return(
            <Routes>
                <Route path='login' element={<LoginScreen/>} />
                <Route path='register' element={<RegisterScreen/>} />
            </Routes>)
}

export default AuthRouter;