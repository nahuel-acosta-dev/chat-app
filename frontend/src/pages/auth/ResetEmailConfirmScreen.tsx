import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../../components/auth/Auth";
import {useResetEmailMutation} from '../../features/auth/resetEmailApiSlice';
import Layout from "../../hocs/Layout";

const ResetEmailConfirmScreen = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [resetPasswordConfirm, {isLoading}] = useResetEmailMutation();
    const [formData, setFormData] = useState({
        new_email: '',
    });
    const {uid, token} = useParams();

    const { new_email } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const data = await resetPasswordConfirm({uid, token, new_email}).unwrap();
            console.log(data);
            setRequestSent(true);
        }
        catch(e: any) {
            console.log(e)
        }
    };

    if (requestSent) {
        return <Navigate to='/' />
    }
    return(
        <Layout>
           {isLoading ?
           <>Enviando email de confirmacion...</> 
           :
           (
           <Auth>
            <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                            <Form.Control
                                className='form-control'
                                type='email'
                                placeholder='Ingresa tu nuevo email'
                                name='new_email'
                                value={new_email}
                                onChange={onChange}
                                minLength={6}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit' className="mt-2">
                            Cambiar Email
                        </Button>
                </Form>
            </Auth>
            )}
        </Layout>
    )
}

export default ResetEmailConfirmScreen;