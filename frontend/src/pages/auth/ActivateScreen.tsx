import { useRef, useState } from "react";
import {useActivateMutation} from '../../features/auth/activateApiSlice';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { Button } from "react-bootstrap";
import Auth from "../../components/auth/Auth";

const ActivateScreen = () => {
    const errRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [verified, setVerified] = useState(false);
    const [activate, { isLoading }] = useActivateMutation();
    const {uid, token} = useParams();
    const navigate = useNavigate();

    const verify_account = async () => {
        try{
        const result = await activate({uid, token});
        console.log(result)
        setVerified(true);
        }catch(err: any){
            if (err.status === 400){
                setErrMsg("datos inexistentes");
            }
            else if (err.status === 401){
                setErrMsg("No se ha encontrado el usuario");
            }
            else {
                setErrMsg("No server Response");
            }
        }
    };

    if (verified) {
        return <Navigate to="/auth/login"/>;
    }

    return (
        <Layout>
            {
            isLoading ?
                <div className="fs-1 fw-bold text-white  mt-2">Verificando cuenta...</div>
                :
                <Auth>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div 
                        className='d-flex flex-column justify-content-center 
                        align-items-center text-whwite mt-1'>
                        <p className="fs-1 fw-bold">Verificar cuenta</p>
                        <Button
                            onClick={verify_account}
                            type='button'
                            variant="info"
                            className='btn rounded-1'
                            size="lg"
                            >
                            Verificar
                        </Button>
                    </div>
                </Auth>
            }
        </Layout>
    );
}

export default ActivateScreen;