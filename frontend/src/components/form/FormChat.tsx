import { ChangeEvent, useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import { Button, FormControl, FormGroup, FormLabel, FormText, Row, Col } from "react-bootstrap";
import { selectCurrentProfile } from '../../features/profile/profileSlice';
const FormChat = ({url, typeChat, socketChat, addChat}: any) => {
    const profile = useSelector(selectCurrentProfile);
    const [connection, setConnection] = useState(false);

    console.log(profile);
    
    const [msg, setMsg] = useState<string>('');
 
    socketChat.onopen = (e: any) => {
        console.log("[open] Connection established")
        console.log('conectado al socket del modal')
        setConnection(true);
    }

    socketChat.onmessage = function(e: any) {
        console.log(e);
        const data = JSON.parse(e.data);
        console.log(data);
        return addChat(data);
    }

    
    socketChat.onclose = function (evt: any) {
        console.log('WebSocket desconectado');
      };

    socketChat.onerror = function(error: any) {
        console.log(`[error] ${error.message}`);
      }


      const closeAll = () => {
        console.log(socketChat.readyState);
        socketChat.close(1000, 'socket close en return');
        console.log('socket cerrado');
    }

    const submitMessage = () =>{
        socketChat.send(JSON.stringify({
            'send_type':  typeChat,
            'message': msg,
            'send_user': profile.id
        }));
        setMsg('');
    }

    useEffect(() =>  {
        return closeAll()
    }, [url])



    const handleMsgInput = (e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value);

    return (
        <Row>
            <Col></Col>
                <Col>
                    <div>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                            <FormControl type="text" placeholder="Enter message" value={msg} 
                            onChange={handleMsgInput} 
                            required/>
                        </FormGroup>
                        <Button variant="primary" type="submit" onClick={submitMessage}>
                            Submit
                        </Button>
                    </div>
                </Col>
            <Col></Col>
        </Row>
    )
}

export default FormChat;