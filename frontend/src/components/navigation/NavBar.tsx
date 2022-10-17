import {Container, Nav, Navbar} from "react-bootstrap";
import { Link} from 'react-router-dom';
const NavBar = () => {

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
                        </Nav>
                        <Nav className="navbar-center">
                            <div className="navbar-login">
                                <Link className="navbar-login btn btn-outline-info" to="/auth/login">
                                    Iniciar Sesion
                                </Link>
                            </div>
                        </Nav>
                    </Container>
                </Navbar>
            </>
    )
}

export default NavBar;