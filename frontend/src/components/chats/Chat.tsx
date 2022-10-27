import { useEffect, useState } from "react";
import Loading from '../loading/Loading';
import { ListGroup } from "react-bootstrap";
import { ChatType } from "../../types/chat";
import { useGetListChatQuery } from "../../features/chat_group/getListChat";

const Chat = () => {
    const [arrChat, setArrChat] = useState<Array<any>>([]);
    const {
        data: chats,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListChatQuery(null);
    
    console.log(arrChat)

    const filterChats = () =>{
        const filter: Array<any> = [];

        for(let chat of chats) {
            if(chat in filter) continue;
            else {
                console.log(chat)
                filter.push(chat);
            }
        }
        return filter;
    }


    useEffect(() =>  {
        if(isSuccess) setArrChat(filterChats);

    }, [isLoading, isSuccess])

    return(
        <ListGroup variant="flush">
            {
                isLoading ? 
                    <Loading/> 
                :
                isSuccess ? 
                    arrChat.map((group:  ChatType) => 
                        (
                        <ListGroup.Item key={group['id']}>
                            {
                                group['chat_name']
                            }
                        </ListGroup.Item>
                        )
                    )
                :
                isError &&
                    <div>Ocurrio un error al cargar Los Mensajes</div>
            } 
        </ListGroup>
    )
}

export default Chat;