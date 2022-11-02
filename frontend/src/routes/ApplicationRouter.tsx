
import {Routes,Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppHome from '../pages/AppHome';
import ChatPage from '../pages/ChatPage';
import ChatGroupPage from '../pages/ChatGroupPage';

const ApplicationRouter = () =>{
    //Aqui van las rutas que puede ver el usuario logueado

    return (
        <>
            <Routes>
                <Route path="home" element={<AppHome/>} />
                <Route path="chat/:number" element={<ChatPage/>} />
                <Route path="chat_group/chat_group_:number" element={<ChatGroupPage/>} />
            </Routes>
        </>
    )
}

export default ApplicationRouter;