import { ListGroup } from "react-bootstrap";
import Loading from '../loading/Loading';
import { ChatGroupType } from '../../types/chat';
import { useGetListChatGroupQuery } from "../../features/chat/getListChatGroup";

const ChatGroup = () => {

    const {
        data: groups,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListChatGroupQuery(null);

    return(
        <ListGroup variant="flush">
            {
                isLoading ? 
                    <Loading/> 
                :
                isSuccess ? 
                    groups.map((group:  ChatGroupType) => 
                        (
                        <ListGroup.Item key={group['chat_group']['id']}>
                            {group['chat_group']['chat_group_name']}
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

export default ChatGroup;