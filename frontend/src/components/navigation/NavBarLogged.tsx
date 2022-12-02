import {useDispatch, useSelector} from 'react-redux';
import {title} from '../../constants/title';
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
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/app/home" className="navbar-brand">
                        {title.map((details, i) => (
                            <span className={details.className}
                            key={i}>
                                {details.letter}
                            </span>
                        ))}
                    </Link>
                    <Nav className="navbar-center">
                        <div className="navbar-text profile">
                        <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={<>Signed in as: {profile.user.last_name}</>}
                                menuVariant="dark"
                                className="nav-dropdown"
                                >
                                <NavDropdown.Item eventKey="4.1">
                                    <Link className="btn btn-link navbar-links
                                    text-decoration-none text-white" to="/app/profile">
                                        <i className="bi bi-person"></i> Profile
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.2" className="nav-item dropdown text-decoration-none text-white">
                                    <Button variant="link" onClick={logout} className="navbar-links 
                                    text-decoration-none text-white">
                                        <i className="bi bi-power"></i> Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
    )

}

export default NavBarLogged;