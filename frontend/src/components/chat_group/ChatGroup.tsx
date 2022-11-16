import { Accordion, ListGroup, Row, Col } from "react-bootstrap";
import FormChat from '../form/FormChat';
import Loading from '../loading/Loading';
import ProfileImg from "../../img/profile.png";
import { ChatGroupType } from '../../types/chat';
import { useGetListChatGroupQuery } from "../../features/chat/getListChatGroup";
import { Link } from "react-router-dom";

const ChatGroup = () => {

    const {
        data: groups,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListChatGroupQuery(null);

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Groups</Accordion.Header>
            <Accordion.Body>
                {
                    isLoading ? 
                        <Loading/> 
                    :
                    isSuccess ? 
                        groups.map((group:  ChatGroupType) => 
                            (
                            <Link to={`/app/chat_group/chat_group_${group['chat_group']['id']}`}
                                key={group['chat_group']['id']} className="text-decoration-none text-black">
                                <Row className="alert alert-success chats">
                                    <Col xs={2} className="cont__profile">
                                        <figure className="figure">
                                            <img src={ProfileImg} height="50"
                                            className="figure-img img-fluid rounded" alt="..."/>
                                        </figure>
                                    </Col>
                                    <Col className="text-start d-flex align-items-center">
                                        {group['chat_group']['chat_group_name']}
                                    </Col>
                                </Row>
                            </Link>
                            )
                        )
                    :
                    isError &&
                        <div>Ocurrio un error al cargar Los Mensajes</div>
                } 
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ChatGroup;