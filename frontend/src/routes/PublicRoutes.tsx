import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
//Solo usamos Navigate

type Props = {
    children: JSX.Element,
};

const PublicRoutes = ({children}: Props) =>{
    const token = useSelector(selectCurrentToken);
    return token ? <h2>Navigate to=/app/home"</h2> : children;
}

export default PublicRoutes;