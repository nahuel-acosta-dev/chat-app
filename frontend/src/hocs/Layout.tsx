import { FC, ReactNode, useState } from "react";
import { ToastContainer} from 'react-toastify';
import {Props} from '../types/generics';
import {useGetProfileMeQuery} from '../features/profile/getProfileMeSlice';
import {useDispatch, useSelector} from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import NavBar from "../components/navigation/NavBar";
import NavBarLogged from "../components/navigation/NavBarLogged";
import LoadingProfile from "../components/loading/LoadingProfile";

const Layout: FC<Props> = (props) => {
    const token = useSelector(selectCurrentToken);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    //si pongo el loading va a quedar siempre cargando ya que nunca entra NavBarLogged
    //En navbar logged no lo puedo poner ya que la barra de navegacion seria la unica en la que aparesca
    //el spiner
    //talvez podria crear un componente aparte que se llame loadingProfile y ahi cargue en caso de que haya token
    //si se obtiene el perfil dejamos que renderize, ya no seria necesario cargar nada en navBarLogged
    //ya que todo iria en loadingProfile y cada vez que recarguemos tomaria el loadingProfile
    return (
        token ?
        (
            loading ?
                <LoadingProfile setLoading={setLoading} setError={setError}/>
                :
                <>
                    <header>  
                        <NavBarLogged/>
                        <ToastContainer autoClose={4000} />
                    </header>
                    <main>
                        {props.children}
                    </main>
                </>
        )
        :
        <>
            <header>
                <NavBar/>
                <ToastContainer autoClose={4000} />
            </header>
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout;