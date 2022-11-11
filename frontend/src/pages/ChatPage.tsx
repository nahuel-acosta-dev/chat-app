import { useEffect, useRef, useState } from "react";
import FormChat from '../components/form/FormChat';
import Loading from '../components/loading/Loading';
import NewChats from '../components/chats/NewChats';
import { useParams } from "react-router-dom";
import {usePostChatListMutation} from '../features/chat/postChatList';
import Layout from "../hocs/Layout";

const Chat = () => {
    const [chatListQuery, { isLoading, isSuccess, isError, isUninitialized }] = usePostChatListMutation();
    const userRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const errRef = useRef<HTMLInputElement>(null);
    const [chatList, setChatList] = useState<any>(null);
    const {number} = useParams();
    const socketChat = new WebSocket(`ws://${process.env.REACT_APP_API_LOCAL_URL}/ws/chat/${number}/`);



    const postChatList = async () => {
        try{
            const data = await chatListQuery({"chat_name": number});
            console.log(data);
            setChatList(data);
        }
        catch (err: any) {
            console.log(err)
            if (err.status === 400){
                setErrMsg("Missing Email or Password");
            }
            else if (err.status === 401){
                setErrMsg("Unauthorized");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) {
                errRef.current.focus();
            }
            
        }
    }
    console.log(isSuccess)
    
    useEffect(() =>  {
        if(number) postChatList();
    }, []);

    return(
        <Layout>
            {
                isLoading ? 
                    <Loading/> 
                :
                isSuccess ? (
                    chatList ?
                        (
                            <>  
                                {chatList.data.map((chat: any) => (
                                    <p key={chat.id}>{chat.message}</p>
                                ))}
                                <NewChats
                                url={`chat/${number}`} 
                                typeChat={'chat'}
                                socketChat={socketChat}
                                />
                            </>  
                        )
                        :
                        <></>
                    )
                :
                isError &&
                        <div>Ocurrio un error al cargar Los Mensajes anteriores</div>
            }
        </Layout>
    )
}

export default Chat;