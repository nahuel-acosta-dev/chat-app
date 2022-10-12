import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
//Solo usamos Navigate

type Props = {
    children: JSX.Element,
};

const PublicRoutes = ({children}: Props) =>{
    const token = useSelector(selectCurrentToken);

    return (token) ? <Navigate to="/app/home" /> : children;
}

export default PublicRoutes;