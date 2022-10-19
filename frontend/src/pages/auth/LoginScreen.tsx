import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {useDispatch} from "react-redux";
import { setCredentials } from '../../features/auth/authSlice';
import {useLoginMutation} from '../../features/auth/authApiSlice';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import Auth from "../../components/auth/Auth";
import Layout from "../../hocs/Layout";


const LoginScreen = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }

    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            //llama a la api lofin
            const userData = await login({email, password}).unwrap();
            console.log(userData);
            //guardamos los datos en las credebciales
            dispatch(setCredentials({ ...userData, email }));
            setEmail('');
            setPassword('');
            navigate('/app/home')
        }catch(err: any){
            console.log(err)
            if (err.status === 400){
                setErrMsg("Missing Email or Password");
            }
            else if (err.status === 401){
                setErrMsg("Unauthorized");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) {
                errRef.current.focus();
            }
            
        }
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


    return (
        <>
        {
            isLoading ? 
            (<Loading/>)
            :
            (<Layout>
                <Auth>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu Email"
                            autoComplete="off" ref={userRef} value={email} onChange={handleEmailInput} 
                            required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingresa tu contraseña" 
                            onChange={handlePwdInput} value={password} required/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="info" type="submit" size="sm">
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                    <Row>
                        <Col sm={1}></Col>
                        <Col>
                        <hr />
                            <Link to="/auth/register" className="text-decoration-none">Regístrese para crear una cuenta</Link>
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    </Auth> 
                </Layout>
        )
    }
    </>
    )
}

export default LoginScreen;