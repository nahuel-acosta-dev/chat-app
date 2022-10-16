import {useDispatch, useSelector} from 'react-redux';

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {selectCurrentToken} from '../../features/auth/authSlice';
import Loading from '../../components/loading/Loading';
import { logOut } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
const NavBar = () => {

    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
            dispatch(logOut());
            navigate('/');  
    }

    const redirect = () => navigate('/app/profile');
    
    return(
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
                            {token && 
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
                                    <NavDropdown.Item>{
                                    token && (
                                    <>
                                        
                                        <Button variant="link" onClick={logout} className="navbar-links">
                                            <i className="bi bi-power"></i> Logout
                                        </Button>
                                    </>
                                    )
                                    
                                }</NavDropdown.Item>
                                </NavDropdown>
                            </>}
                            
                        </Nav>
                        <Nav className="navbar-center">
                        {
                                !token ?
                                (<div className="navbar-login">
                                    <Link className="navbar-login btn btn-outline-info" to="/auth/login">
                                        Iniciar Sesion
                                    </Link>
                                </div>)
                                :
                                (
                                    <Navbar.Text  className="profile">
                                        Signed in as: {token && <h2>iniciado</h2>}
                                    </Navbar.Text>
                                    //en vez de poner solo el nombre podria ponerse la foto del perfil    
                                )
                                
                            }
                        </Nav>
                    </Container>
                </Navbar>
            </>
    )
}

export default NavBar;