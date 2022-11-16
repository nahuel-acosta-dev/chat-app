import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActivateScreen = ({ verify, match }: any) => {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    const verify_account = () => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return navigate('/');
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
}

export default ActivateScreen;