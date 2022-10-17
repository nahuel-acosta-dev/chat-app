import { Dispatch, FC, ReactNode, useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import {setProfile, clearProfile} from '../../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import {useGetProfileMeQuery} from '../../features/profile/getProfileMeSlice';
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

type Props = {
    setLoading: Dispatch<Boolean>;
};

const NavBarLogged: FC<Props> = ({setLoading}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logOut());
        clearProfile();
        navigate('/');  
    }

    const redirect = () => navigate('/app/profile');

    const {
        data: profile,
        isLoading,
        isSuccess,
        isError
    } = useGetProfileMeQuery(null);

    if(profile){
        console.log('el siguiente')
        console.log(profile);
        setProfile({...profile});
    }


    useEffect(() =>  {
        if (!isLoading){
            console.log(isSuccess)
            console.log(isError);
            try{
                if(isSuccess && profile.id !== null) {
                    console.log('entro')
                    setLoading(false);
                    dispatch(setProfile({...profile}));
                }
                else{
                    console.log(isError);
                    setLoading(false);
                    logout();
                    console.log('fallo en el else')
                }
            }
            catch(err){
                setLoading(false);
                console.log(err)
                console.log('fallo')
            }
        }
    }, [isLoading]);


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className="me-auto"
                    style={{ maxHeight: '50px' }}>
                        <>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={<i className="bi bi-sort-down nav-icon"></i>}
                                menuVariant="dark"
                                className="nav-dropdown"
                                >
                                <NavDropdown.Item>
                                    <Button variant="link" className="navbar-links" onClick={redirect}>
                                        <i className="bi bi-person"></i> Profile
                                    </Button>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button variant="link" onClick={logout} className="navbar-links">
                                        <i className="bi bi-power"></i> Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    </Nav>
                    <Nav className="navbar-center">
                        <Navbar.Text  className="profile">
                            Signed in as: <h2>iniciado</h2>
                        </Navbar.Text>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}

export default NavBarLogged;