import { useEffect, useState } from "react";
import Loading from '../loading/Loading';
import { ListGroup, Accordion, Row, Col } from "react-bootstrap";
import ProfileImg from "../../img/profile.png";
import { ChatType } from "../../types/chat";
import { useGetListChatQuery } from "../../features/chat_group/getListChat";
import { Link } from "react-router-dom";
import {ProfileUser} from '../../types/profile';
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../features/profile/profileSlice";

const Chat = () => {
    const profile: ProfileUser = useSelector(selectCurrentProfile);

    const {
        data: chats,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetListChatQuery(null);
    console.log(profile)

    console.log(chats)
    

    return(
        <Accordion.Item eventKey="0" className="bg-transparent">
            <Accordion.Header className="bg-transparent">Chats</Accordion.Header>
            <Accordion.Body className="bg-transparent">
            {
                isLoading ? 
                    <Loading/> 
                :
                isSuccess ? 
                    chats.map((group:  ChatType) => 
                        (
                        <Link to={`/app/chat/${group['chat_name']}`} 
                        className="text-decoration-none text-black" key={group['id']}>
                            <Row className="alert alert-primary chats">
                                <Col xs={2} className="cont__profile">
                                    <figure className="figure">
                                        <img src={ProfileImg} height="50"
                                        className="figure-img img-fluid rounded" alt="..."/>
                                    </figure>
                                </Col>
                                <Col className="text-start d-flex align-items-center">
                                    {
                                    group.receive.id !== profile.id ?
                                    `${group.receive.user.first_name} ${group.receive.user.last_name}`
                                    :
                                    `${group.send.user.first_name} ${group.send.user.last_name}`
                                    }
                                </Col>
                            </Row>
                        </Link>
                        )
                    )
                :
                isError &&
                    <div className="text-white fs-1">
                        Ocurrio un error al cargar Los Mensajes
                    </div>
            } 
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Chat;