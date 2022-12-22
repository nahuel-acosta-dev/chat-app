import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {useRegisterMutation} from '../../features/auth/registerApiSlice';
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Auth from "../../components/auth/Auth";
import Layout from "../../hocs/Layout";
import Loading from "../../components/loading/Loading";

const RegisterScreen = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPwd, setConfirmPwd] = useState<string>('');
    const [register, { isLoading }] = useRegisterMutation();
    const [errMsg, setErrMsg] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (userRef.current !== null)
            userRef.current.focus();
    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [email, password, firstName, lastName]);

    useEffect(() => {
        if(redirect){
            setTimeout(() => navigate('/auth/redirect/activation/email'), 3000)
        }
    }, [redirect])

    const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);

    const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleConfirmPwdInput = (e: ChangeEvent<HTMLInputElement>) => setConfirmPwd(e.target.value);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== confirmPwd){
            setErrMsg('Las contraseñas deben ser iguales')
            return false;
        }

        try{
            //llama a la api register
            const userData = await register({
                'first_name': firstName, 
                'last_name': lastName, 
                'email': email, 
                'password': password,
                're_password': confirmPwd
            }).unwrap();
            console.log(userData);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPwd('');
            setRedirect(true);
        }catch(err: any){
            if (err.status === 400){
                setErrMsg("El nombre de usuario ya existe");
            }
            else if (err.status === 401){
                setErrMsg("Unauthorized");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) errRef.current.focus();
        }
    }



    return (
        <Layout>
            {
                isLoading && errMsg === ''  ?
                    <Loading/>
                    :
                    (<Auth>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <Form noValidate onSubmit={e => handleSubmit(e)}>
                            <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername"
                            className="mt-1"
                            >
                                <Form.Label>Ingresa tu Nombre</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                        type="text"
                                        placeholder="Nombre"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={handleFirstNameInput}
                                        value={firstName}
                                        ref={userRef} 
                                        autoComplete="off"
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingresa tu nombre
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustomUsername" className="mt-1">
                                <Form.Label>Ingresa tu Apellido</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                    type="text"
                                    placeholder="Apellido"
                                    aria-describedby="inputGroupPrepend"
                                    onChange={handleLastNameInput}
                                    value={lastName}
                                    ref={userRef} 
                                    autoComplete="off"
                                    required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingresa tu Apellido
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustomEmail" className="mt-1">
                                <Form.Label>Ingresa tu Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                        type="email"
                                        placeholder="email"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={handleEmailInput}
                                        value={email}
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        Por favor ingresa tu email
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3 mt-1" controlId="formBasicPassword">
                                    <Form.Label>Ingresa tu Contraseña</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Contraseña"
                                    onChange={handlePwdInput}
                                    value={password}
                                    required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 mt-1" controlId="formBasicConfirm">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Confirmar Contraseña" 
                                    onChange={handleConfirmPwdInput}
                                    value={confirmPwd}
                                    required
                                    />
                                </Form.Group>
                            </Row>
                            <div className="d-grid gap-2">
                                <Button variant="info" type="submit" size="lg" className="rounded-1">Registrarse</Button>
                            </div>
                        </Form>
                    </Auth>)
            }
        </Layout>
    )
}

export default RegisterScreen;