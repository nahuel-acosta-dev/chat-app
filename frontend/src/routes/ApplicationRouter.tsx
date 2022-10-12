
import {Routes,Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="" element={<Navigate to="/home"/>} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;