import { useState } from "react";
import {useActivateMutation} from '../../features/auth/activateApiSlice';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Layout from "../../hocs/Layout";

const ActivateScreen = () => {
    const [verified, setVerified] = useState(false);
    const [activate, { isLoading }] = useActivateMutation();
    const {uid, token} = useParams();
    const navigate = useNavigate();

    const verify_account = () => {
        activate({uid, token});
        setVerified(true);
    };

    if (verified) {
        return <Navigate to="/auth/login"/>;
    }

    return (
        <Layout>
            {
            isLoading ?
                <>Verificando cuenta...</>
                :
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
            }
        </Layout>
    );
}

export default ActivateScreen;