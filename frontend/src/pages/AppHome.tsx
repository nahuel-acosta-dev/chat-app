import Layout from "../hocs/Layout";
import {useSelector} from 'react-redux';
import { selectCurrentProfile } from '../features/profile/profileSlice';
import {Profile, ProfileUser} from '../types/profile';


const AppHome = () => {
    const profile: ProfileUser = useSelector(selectCurrentProfile);
    return(
        <Layout>
            {
            
            profile.user && 
                profile.user.email
            
            }
        </Layout>
    )

}

export default AppHome;