import {Container, Nav, Navbar} from "react-bootstrap";
import {title} from './extras/title';
import { Link} from 'react-router-dom';
const NavBar = () => {

    
    return(
            <>
                <Navbar bg="dark" variant="dark" expand="md">
                    <Container>
                        <Link to="/" className="navbar-brand title__header fw-bolder fs-5">
                            {title.map((details, i) => (
                                <span className={details.className}
                                key={i}>
                                    {details.letter}
                                </span>
                            ))}
                        </Link>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto"
                            style={{ maxHeight: '50px' }}>
                            </Nav>
                            <Nav className="navbar-center">
                                <div className="navbar__cont">
                                    <Link className="navbar__login text-decoration-none fw-bolder fs-6" 
                                    to="/auth/login">
                                        Iniciar Sesion
                                    </Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
    )
}

export default NavBar;