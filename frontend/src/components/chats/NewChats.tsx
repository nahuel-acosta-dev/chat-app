import { useState, useEffect } from "react";
import FormChat from "../form/FormChat";

const NewChats = ({url, typeChat, socketChat}: any) => {
    const [newChats, setNewChats] = useState<Array<any>>([]);
    const [data, setData] = useState<any>(null);

    const addChat = (chat: any) => {
        console.log(chat)
        setData(chat);
    }

    console.log(newChats);

    useEffect(() =>  {
        if(data !== null)
        setNewChats([...newChats, data]);
    }, [data])

    return(<>

            {
            
                newChats.map((chat: any, i) =>(
                    <p key={i}>{chat.message}</p>
                ))
            }

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