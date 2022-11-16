import {useDispatch, useSelector} from 'react-redux';
import {clearProfile} from '../../features/profile/profileSlice';
import { selectCurrentProfile } from '../../features/profile/profileSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBarLogged = () => {
    const profile = useSelector(selectCurrentProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logOut());
        clearProfile();
        navigate('/');  
    }
    console.log(profile);

    const redirect = () => navigate('/app/profile');


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/app/home" className="navbar-brand">Tinglet</Link>
                    <Nav className="me-auto"
                    style={{ maxHeight: '50px' }}>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={<i className="bi bi-sort-down nav-icon"></i>}
                                menuVariant="dark"
                                className="nav-dropdown"
                                >
                                <NavDropdown.Item>
                                    <Button variant="link" className="navbar-links
                                    text-decoration-none text-white" onClick={redirect}>
                                        <i className="bi bi-person"></i> Profile
                                    </Button>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="text-decoration-none text-white">
                                    <Button variant="link" onClick={logout} className="navbar-links 
                                    text-decoration-none text-white">
                                        <i className="bi bi-power"></i> Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <Nav className="navbar-center">
                        <Navbar.Text  className="profile">
                            Signed in as: {
                                profile.user != null ? 
                                    profile.user.last_name
                                    :
                                    <h2>iniciado</h2>
                                }
                        </Navbar.Text>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}

export default NavBarLogged;