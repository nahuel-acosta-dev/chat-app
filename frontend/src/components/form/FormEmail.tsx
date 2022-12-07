import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import {useSetEmailMutation} from '../../features/auth/setEmailApiSlice';
import { selectCurrentProfile } from "../../features/profile/profileSlice";
import Loading from "../loading/Loading";

const FormEmail = () => {
    const profile = useSelector(selectCurrentProfile);
    const errRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [requestSent, setRequestSent] = useState(false);
    const [setEmail, { isLoading, isError }] = useSetEmailMutation();
    const [formData, setFormData] = useState({
        new_email: '',
        re_new_email: '',
        current_password: ''
    });

    const { new_email, re_new_email, current_password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const data = await setEmail({current_password, new_email, re_new_email}).unwrap();  
            console.log(data);
            setRequestSent(true);          
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
                new_email: '',
                re_new_email: '',
                current_password: ''
            });
        }
    }


    return(
        isLoading ? 
            <Loading/>
            :
            <>
                <p className="fs-1 fw-bolder text-center text-vanilla">Cambiar Email</p>
                <Form className="row mt-5" onSubmit={onSubmit}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nuevo Email</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Ingresa tu nuevo email" 
                                    name="new_email"
                                    onChange={onChange}
                                    value={new_email}
                                    />
                                    <Form.Text className="text-muted text-danger">
                                        Ingresa tu nuevo email.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Reingresa tu nuevo email</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Reingresa tu nuevo email" 
                                    name="re_new_email"
                                    onChange={onChange}
                                    value={re_new_email}
                                    />
                                    <Form.Text className="text-muted text-danger">
                                        Reingresa tu nuevo email.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Ingresa tu contraseña</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    name="current_password"
                                    onChange={onChange}
                                    value={current_password}
                                    />
                                    <Form.Text className="text-muted text-danger">
                                        Ingresa tu contraseña.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={1}></Col>
                            <Col xs={12} md={5} className="d-flex align-items-center">
                                <Col xs={10} className="d-grid gap-2 mx-auto">
                                    <Button variant="primary" type="submit" className="mb-2" 
                                    disabled={requestSent ? true : false}>
                                        Cambiar Email
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

export default FormEmail;