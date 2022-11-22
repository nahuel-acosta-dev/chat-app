import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import {useResetPasswordConfirmMutation} from '../../features/auth/resetPasswordConfirmApiSlice';
import Layout from "../../hocs/Layout";

const ResetPasswordConfirmScreen = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation();
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const {uid, token} = useParams();

    const { new_password, re_new_password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        { ...formData, [e.target.name]: e.target.value }
        );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
                const data = await resetPasswordConfirm({uid, token, new_password, re_new_password}).unwrap();
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
           (<Form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='New Password'
                            name='new_password'
                            value={new_password}
                            onChange={e => onChange(e)}
                            minLength={6}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm New Password'
                            name='re_new_password'
                            value={re_new_password}
                            onChange={e => onChange(e)}
                            minLength={6}
                            required
                        />
                    </div>
                    <button className='btn btn-primary' type='submit'>Reset Password</button>
            </Form>)}
        </Layout>
    )
}

export default ResetPasswordConfirmScreen;