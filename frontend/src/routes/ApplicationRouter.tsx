
import {Routes,Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Error404 from '../pages/error/Error404';
import AppHome from '../pages/AppHome';
import ChatPage from '../pages/ChatPage';
import ChatGroupPage from '../pages/ChatGroupPage';
import ProfileScreen from '../pages/ProfileScreen';

const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="*" element={<Error404/>} />
                <Route path="home" element={<AppHome/>} />
                <Route path="chat/:number" element={<ChatPage/>} />
                <Route path="chat_group/chat_group_:number" element={<ChatGroupPage/>} />
                <Route path="profile" element={<ProfileScreen />} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;