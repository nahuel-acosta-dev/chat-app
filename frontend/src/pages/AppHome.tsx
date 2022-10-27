import Layout from "../hocs/Layout";
import Loading from '../components/loading/Loading';
import {useSelector} from 'react-redux';
import { selectCurrentProfile } from '../features/profile/profileSlice';
import { ChatGroupType } from '../types/chat';
import {ProfileUser} from '../types/profile';
import { ListGroup } from "react-bootstrap";
import ChatGroup from '../components/chat_group/ChatGroup';
import Chat from '../components/chats/Chat';

const AppHome = () => {
    const profile: ProfileUser = useSelector(selectCurrentProfile);

    return(
        <Layout>
            <div>
                {
                profile.user && 
                    profile.user.email
                }
                <ChatGroup />
                <Chat/>
            </div>
        </Layout>
    )

}

export default AppHome;