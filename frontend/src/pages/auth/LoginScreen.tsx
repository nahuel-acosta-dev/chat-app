import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from '../../features/auth/authSlice';
import {useLoginMutation} from '../../features/auth/authApiSlice';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GoogleButtonLogin from '../../components/auth/GoogleButtonLogin'
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
    const [login, { isLoading, isError }] = useLoginMutation();
    const dispatch = useDispatch();

    console.log(isLoading);
    useEffect(() => {
        if (userRef.current !== null) {userRef.current.focus();}
    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('estoy aquired')
        try{
            //llama a la api login
            console.log(email);
            console.log(password);
            const userData = await login({email, password}).unwrap();
            console.log(userData);
            console.log('estamos aca');
            //guardamos los datos en las credenciales
            dispatch(setCredentials({ ...userData, email }));
            setEmail('');
            setPassword('');
            navigate('/app/home');
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

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


    return (
        <Layout>
        {
            isLoading ? 
            (<Loading/>)
            :
            (<>
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
                                <Button variant="info" type="submit" size="lg" className="mt-2 rounded-1">
                                    Iniciar sesión
                                </Button>
                            </div>
                        </Form>
                        <Row>
                            <Col sm={1}></Col>
                            <Col>
                            <GoogleButtonLogin />
                            <hr />
                                <Link to="/auth/register" className="text-decoration-none text-white">
                                    Regístrese para crear una cuenta
                                </Link>
                            <hr />
                                <Link to="/auth/reset-password" className="text-decoration-none text-white">
                                    Olvidaste tu contraseña?
                                </Link>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    </Auth> 
                </>
        )
    }
    </Layout>
    )
}

export default LoginScreen;