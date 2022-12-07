import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {usePatchUserMutation} from '../../features/user/patchUserApiSlice';
import { Button, Col, Form, Row } from "react-bootstrap";
import { selectCurrentProfile } from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";

const FormFirstName = () => {
    const profile = useSelector(selectCurrentProfile);
    const [changeName, { isLoading, isError}] = usePatchUserMutation();
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [formData, setFormData] = useState({
        first_name: ''
    });

    console.log(profile)

    const { first_name } = formData;

    console.log(first_name);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const data = await changeName({first_name, id: profile.user.id}).unwrap();
            console.log(data)
        }
        catch(err: any) {
            if (err.status === 400){
                setErrMsg("Fallo al hacer la solicitud");
            }
            else if (err.status === 401){
                setErrMsg("No tienes permisos para realizar esta accion");
            }
            else {
                setErrMsg("No server Response");
            }
        }

    }

    return(
        <Form className="row mt-5" onSubmit={onSubmit}>
            <Col xs={1}></Col>
            <Col xs={10}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Cambiar Nombre</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa tu Nombre" 
                            name="first_name"
                            onChange={onChange}
                            value={first_name}
                            />
                            <Form.Text className="text-muted text-danger">
                                Ingresa un Nombre para cambiarlo.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={1}></Col>
                    <Col xs={12} md={5} className="d-flex align-items-center">
                        <Col xs={10} className="d-grid gap-2 mx-auto">
                            <Button variant="primary" type="submit" className="mb-2">
                                Cambiar Nombre
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Col>
            <Col xs={1}></Col>
        </Form>
    )
}

export default FormFirstName;