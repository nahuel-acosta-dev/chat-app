import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../features/profile/profileSlice";
import { ProfileUser } from "../../types/profile";
import FormChat from "../form/FormChat";

const NewChats = ({url, typeChat, socketChat, chatList}: any) => {
    const profile: ProfileUser = useSelector(selectCurrentProfile);
    const [newChats, setNewChats] = useState<Array<any>>([]);
    const [data, setData] = useState<any>(null);

    const addChat = (chat: any) => {
        setData(chat);
    }

    console.log(newChats);

    useEffect(() =>  {
        if(data !== null)
        setNewChats([...newChats, data]);
    }, [data])

    return(
        <>
            <div className="newchats">
                {
                typeChat === "chat" ?
                    (chatList.data.map((chat: any) => (
                        profile.id !== chat.receive.id ?
                        <div key={chat.id} className="messages d-flex align-items-center justify-content-end">
                            <span className="alert alert-success">{chat.message}</span>
                        </div>
                        :
                        <div key={chat.id} className="messages d-flex align-items-center justify-content-start">
                            <span className="alert alert-dark">{chat.message}</span>
                        </div>
                    )))
                :
                (chatList.map((chat: any) => (
                    profile.id !== chat.profile.id ?
                    <div key={chat.id} className="messages d-flex align-items-center justify-content-end">
                        <span className="alert alert-success">{chat.message}</span>
                    </div>
                    :
                    <div key={chat.id} className="messages d-flex align-items-center justify-content-start">
                        <span className="alert alert-dark">{chat.message}</span>
                    </div>
                )))}
                <div className="newchats__chat">
                    {
                    
                        newChats.map((chat: any, i) =>(
                            <div key={i}>
                                {chat.message}   
                                {chat.profile.id}                           
                            </div>
                        ))
                    }
                </div>
            </div>
            <FormChat 
                url={url} 
                typeChat={typeChat}
                socketChat={socketChat}
                addChat={addChat}
            />
        </>
    )
}

export default NewChats;