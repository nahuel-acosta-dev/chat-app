import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {useSetPasswordMutation} from "../../features/auth/setPasswordApiSlice"
import Loading from "../loading/Loading";

const FormPassword = () => {
    const errRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [setPassword, { isLoading, isError }] = useSetPasswordMutation();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
        current_password: ''
    });

    const { 
        new_password,
        re_new_password,
        current_password 
    } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const data = await setPassword({
                current_password, 
                new_password, 
                re_new_password}).unwrap();  
            console.log(data);
            console.log(data.err)
            setRequestSent(true);  
            setErrMsg("Tu contraseña fue modificada con exito");        
        }
        catch(err: any){
            if (err.status === 400){
                setErrMsg("Error en datos ingresados");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) {
                errRef.current.focus();
            }
            setFormData({
                new_password: '',
                re_new_password: '',
                current_password: ''
            });
            
        }
    }


    return(
        isLoading ?
        <Loading />
        :
        <>
            <p className="fs-1 fw-bolder text-center text-vanilla">Cambiar Contraseña</p>
            <Form className="row mt-5" onSubmit={onSubmit}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Ingresa tu nueva contraseña" 
                                name="new_password"
                                onChange={onChange}
                                value={new_password}
                                minLength={8}
                                />
                                <Form.Text className="text-muted text-danger">
                                    Ingresa tu nueva contraseña, 8 caracteres minimo.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Reingresa tu nueva contraseña</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Reingresa tu nueva contraseña" 
                                minLength={8}
                                name="re_new_password"
                                onChange={onChange}
                                value={re_new_password}
                                />
                                <Form.Text className="text-muted text-danger">
                                    Reingresa tu nueva contraseña
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Ingresa tu contraseña actual."  
                                name="current_password"
                                onChange={onChange}
                                value={current_password}
                                />
                                <Form.Text className="text-muted text-danger">
                                    Ingresa tu contraseña actual.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={1}></Col>
                        <Col xs={12} md={5} className="d-flex align-items-center">
                            <Col xs={10} className="d-grid gap-2 mx-auto">
                                <Button variant="primary" type="submit" className="mb-2"
                                disabled={
                                    new_password.length < 8 || 
                                    re_new_password.length < 8 || 
                                    new_password !== re_new_password ? 
                                    true : false
                                }
                                >
                                    Cambiar Contraseña
                                </Button>
                            </Col>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1}></Col>
            </Form>
        </>
    )
}

export default FormPassword;