import { FC, ReactNode, useState } from "react";
import { ToastContainer} from 'react-toastify';
import {Props} from '../types/generics';
import {useGetProfileMeQuery} from '../features/profile/getProfileMeSlice';
import {useDispatch, useSelector} from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import NavBar from "../components/navigation/NavBar";
import NavBarLogged from "../components/navigation/NavBarLogged";
import Loading from "../components/loading/Loading";

const Layout: FC<Props> = (props) => {
    const token = useSelector(selectCurrentToken);
    const [loading, setLoading] = useState<Boolean>(token ? true : false);

    return (
        loading ? 
        (<Loading/>) 
        :
        (<>
            <header>{
                token ?
                <NavBarLogged setLoading={setLoading}/>
                :
                <NavBar/>
                }
                <ToastContainer autoClose={4000} />
            </header>
            <main>
                {props.children}
            </main>
        </>)
        )
}

export default Layout;