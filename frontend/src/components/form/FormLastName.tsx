import { ChangeEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormLastName = () => {
    const [formData, setFormData] = useState({
        last_name: ''
    });

    const { last_name } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );


    return(
        <Form className="row mt-5">
            <Col xs={1}></Col>
            <Col xs={10}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Cambiar Apellido</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Ingresa tu Apellido" 
                            name="last_name"
                            onChange={onChange}
                            value={last_name}
                            />
                            <Form.Text className="text-muted text-danger">
                                Ingresa un Apellido para cambiarlo.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={1}></Col>
                    <Col xs={12} md={5} className="d-flex align-items-center">
                        <Col xs={10} className="d-grid gap-2 mx-auto">
                            <Button variant="primary" type="submit" className="mb-2">
                                Cambiar Apellido
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Col>
            <Col xs={1}></Col>
        </Form>
    )
}

export default FormLastName;