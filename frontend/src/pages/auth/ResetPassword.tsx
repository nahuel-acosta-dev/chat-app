import { ChangeEvent, FormEvent, useState } from "react";
import { useResetPasswordMutation } from '../../features/auth/resetPasswordApiSlice';
import { Navigate } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

const ResetPassword = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [formData, setFormData] = useState({email: ''});

    const { email } = formData;
    console.log(email)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e:FormEvent<HTMLFormElement>)  => {
        e.preventDefault();
        try{
            const data = await resetPassword({email}).unwrap();
            console.log(data);
            setRequestSent(true);
        }catch(e: any){
            console.log('error')
        }
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <Layout>
            {
            isLoading ? 
                <div>
                    espere un momento...
                </div>
                :
            (<Row>
            <Col xs={2}></Col>
                <Col>
                <h1>Request Password Reset:</h1>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group className='form-group'>
                            <input
                                className='form-control'
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <Button className='btn btn-primary' type='submit'>
                            Reset Password
                        </Button>
                    </Form>
                </Col>
                <Col xs={2}></Col>
            </Row>)}
        </Layout>
    );
};

export default ResetPassword;