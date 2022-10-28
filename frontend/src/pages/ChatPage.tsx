import { useParams } from "react-router-dom";

const Chat = () => {
    const {number} = useParams();
    console.log(number);

    return(
        <div className="">
            entraste
        </div>
    )
}

export default Chat;