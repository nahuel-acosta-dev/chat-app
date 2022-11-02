import { useEffect, useState } from "react";
import FormChat from '../components/form/FormChat';
import Loading from '../components/loading/Loading';
import {useGetListMessageInChatGroupQuery} from '../features/chat_group/getListMessageInChatGroup';
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const ChatGroupPage = () => {
    const {number} = useParams();
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListMessageInChatGroupQuery(number);

    console.log(messages);

    return(
        <>
            <ListGroup variant="flush">
                {
                    isLoading ? 
                        <Loading/> 
                    :
                    isSuccess ? 
                        messages.map((message:  any) => 
                            (
                                <ListGroup.Item key={message['id']}>
                                        {message['chat_group']}
                                </ListGroup.Item>
                            )
                        )
                    :
                    isError &&
                        <div>Ocurrio un error al cargar Los Mensajes</div>
                } 
            </ListGroup>
            <FormChat/>
        </>
    )
}

export default ChatGroupPage;