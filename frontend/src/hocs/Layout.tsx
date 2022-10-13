import { FC, ReactNode } from "react";
import { ToastContainer} from 'react-toastify';
import NavBar from "../components/navigation/NavBar";

type Props = { children: ReactNode }

const Layout: FC<Props> = (props) => {

    return (
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