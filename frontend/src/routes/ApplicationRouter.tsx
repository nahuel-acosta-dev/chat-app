
import {Routes,Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppHome from '../pages/AppHome';

const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="home" element={<AppHome/>} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;