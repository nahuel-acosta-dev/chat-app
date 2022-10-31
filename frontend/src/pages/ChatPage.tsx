import { useEffect, useState } from "react";
import FormChat from '../components/form/FormChat';
import Loading from '../components/loading/Loading';
import { useParams } from "react-router-dom";
import {usePostChatListMutation} from '../features/chat/postChatList';

const Chat = () => {
    const [chatListQuery, { isLoading }] = usePostChatListMutation();
    const [chatList, setChatList] = useState<any>(null);
    const {number} = useParams();

    const postChatList = async () => {
        const data = await chatListQuery({"chat_name": number});
        console.log(data);
        setChatList(data);
    }

    useEffect(() =>  {
        if(number) postChatList();
    }, [number]);

    return(
        <div className="">
            {
                !isLoading ?
                chatList &&
                    chatList.data.map((chat: any) => (
                        <p key={chat.id}>{chat.message}</p>
                    ))
                :
                <Loading/>
            }
            <FormChat/>
        </div>
    )
}

export default Chat;