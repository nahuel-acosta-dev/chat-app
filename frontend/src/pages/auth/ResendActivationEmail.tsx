import { Form } from "react-bootstrap";
import Layout from "../../hocs/Layout";
import {useResendEmailActivationMutation} from '../../features/auth/resendEmailActivationApiSlice';
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const ResendActivationEmail = () => {
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
                <div>Reenviando Mail...</div>
                :
                <div 
                    className='d-flex flex-column justify-content-center align-items-center'
                    style={{ marginTop: '200px' }}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Correo de Activacion:</h1>
                    <p>
                        Se ha enviado un correo electrónico de activacion a su mail,
                        por favor revise su bandeja de entrada o en spam.
                    </p>
                    <h3>Reenviar correo de activacion</h3>
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
                        <button
                            style={{ marginTop: '50px' }}
                            type='submit'
                            className='btn btn-primary'
                            disabled={resendEmailSuccess ? true : false}
                        >
                            Reenviar correo
                        </button>
                    </Form>
                </div>
            }
        </Layout>
    )
}

export default ResendActivationEmail;