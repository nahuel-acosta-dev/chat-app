import { useEffect, useState } from "react";
import Loading from '../loading/Loading';
import { ListGroup } from "react-bootstrap";
import { ChatType } from "../../types/chat";
import { useGetListChatQuery } from "../../features/chat_group/getListChat";
import { Link } from "react-router-dom";

const Chat = () => {
    const {
        data: chats,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListChatQuery(null);
    

    return(
        <ListGroup variant="flush">
            {
                isLoading ? 
                    <Loading/> 
                :
                isSuccess ? 
                    chats.map((group:  ChatType) => 
                        (
                        <ListGroup.Item key={group['id']}>
                            <Link to={`/app/chat/${group['chat_name']}`}>
                                {
                                    group['chat_name']
                                }
                            </Link>
                        </ListGroup.Item>
                        )
                    )
                :
                isError &&
                    <div>
                        Ocurrio un error al cargar Los Mensajes
                    </div>
            } 
        </ListGroup>
    )
}

export default Chat;