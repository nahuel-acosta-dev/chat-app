import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../../hocs/Layout";
import {useResendEmailActivationMutation} from '../../features/auth/resendEmailActivationApiSlice';
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Auth from "../../components/auth/Auth";

const ResendActivationEmailScreen = () => {
    const [resendEmail, {isLoading}] = useResendEmailActivationMutation();
    const [email, setEmail] = useState<string>('');
    const errRef = useRef<HTMLInputElement>(null);
    const userRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('')
    const [resendEmailSuccess, setResendEmailSuccess] = useState<boolean>(false);

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            //llama a la api login
            const userData = await resendEmail({email}).unwrap();
            console.log(userData);
            //guardamos los datos en las credenciales
            setEmail('');
            setResendEmailSuccess(true);
        }catch(err: any){
            console.log(err);
            console.log('entro aca');
            if (err.status === 400){
                setErrMsg("Missing Email or Password");
            }
            else if (err.status === 401){
                setErrMsg("No se ha encontrado el usuario");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) { 
                errRef.current.focus();
            }
            
        }
    }

    return(
        <Layout>
            {
            isLoading ?
                <div className="text-white fs-1">Reenviando Mail...</div>
                :
                <Auth>
                    <div className='text-white'>
                        <Col>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                                {errMsg}
                            </p>
                            <p className="fs-1">Correo de Activacion:</p>
                            <p>
                                Se ha enviado un correo electrónico de activacion a su mail,
                                por favor revise su bandeja de entrada o en spam.
                            </p>
                            <p className="fs-3">Reenviar correo de activacion</p>
                            <Form onSubmit={e => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu Email"
                                    autoComplete="on" ref={userRef} value={email} onChange={handleEmailInput} 
                                    required/>
                                <Form.Text className="text-muted">
                                    Si existe una cuenta registrada con este correo se enviara un mail.
                                </Form.Text>
                                </Form.Group>
                                <Button
                                    type='submit'
                                    className='btn btn-primary rounded-1'
                                    disabled={resendEmailSuccess ? true : false}>
                                    Reenviar correo
                                </Button>
                            </Form>
                        </Col>
                    </div>
                </Auth>
            }
        </Layout>
    )
}

export default ResendActivationEmailScreen;