import Layout from "../hocs/Layout";
import Loading from '../components/loading/Loading';
import {useSelector} from 'react-redux';
import { selectCurrentProfile } from '../features/profile/profileSlice';

import { ChatGroupType } from '../types/chat';
import {ProfileUser} from '../types/profile';
import { Accordion, Button, ListGroup } from "react-bootstrap";
import ChatGroup from '../components/chat_group/ChatGroup';
import Chat from '../components/chats/Chat';

const AppHome = () => {
    const profile: ProfileUser = useSelector(selectCurrentProfile);
    
    return(
        <Layout>
            
            {
            profile.id !== null ?
                <div>
                    <Accordion defaultActiveKey="0" flush>
                        <ChatGroup />
                        <Chat/>
                    </Accordion>
                </div>
            :
            <Loading />
            }
        </Layout>
    )

}

export default AppHome;