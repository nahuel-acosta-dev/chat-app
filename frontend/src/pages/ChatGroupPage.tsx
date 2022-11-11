import { useEffect, useState } from "react";
import FormChat from '../components/form/FormChat';
import Loading from '../components/loading/Loading';
import NewChats from '../components/chats/NewChats';
import {useGetListMessageInChatGroupQuery} from '../features/chat_group/getListMessageInChatGroup';
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import Layout from "../hocs/Layout";

const ChatGroupPage = () => {
    const {number} = useParams();
    const socketChat = new WebSocket(`ws://${process.env.REACT_APP_API_LOCAL_URL}/ws/chat/chat_group_${number}/`);
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListMessageInChatGroupQuery(number);
    console.log(number)

    console.log(messages);

    return(
        <Layout>
            <ListGroup variant="flush">
                {
                    isLoading ? 
                        <Loading/> 
                    :
                    isSuccess ? (
                        <>
                            {messages.map((message:  any) => 
                                (
                                    <ListGroup.Item key={message['id']}>
                                            {message['message']}
                                    </ListGroup.Item>
                                )
                            )}
                            
                        </>
                    )
                    :
                    isError &&
                        <div>Ocurrio un error al cargar Los Mensajes anteriores</div>
                } 
            </ListGroup>
            <NewChats
             url={`chat/${number}`} 
             typeChat={'chat_group'}
             socketChat={socketChat}
             />
        </Layout>
    )
}

export default ChatGroupPage;