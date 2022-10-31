import { Form, Button, FormControl, FormGroup, FormLabel, FormText, Row, Col } from "react-bootstrap";

const FormChat = () => {

    return (
        <Row>
            <Col></Col>
                <Col>
                    <Form>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                            <FormLabel>Email address</FormLabel>
                            <FormControl type="email" placeholder="Enter email" />
                            <FormText className="text-muted">
                            We'll never share your email with anyone else.
                            </FormText>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            <Col></Col>
        </Row>
    )
}

export default FormChat;