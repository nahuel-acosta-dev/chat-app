import { Button, Col, Row } from "react-bootstrap";
import pixel from '../img/pixel.png';
import {title} from '../constants/title';
import Title from '../components/title/Title';
import Layout from "../hocs/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Home = () => {
    const token = useSelector(selectCurrentToken);

    return (
        <Layout>
            <Row className="text-center">
                <Col xs={12} md={8} className="pe-0">
                    <div>
                        <p className="text-vanilla fs-1 fw-bolder meet">Meet your</p>
                        <p className="text-primary fs-1 fw-bolder">
                            Dedicated <span className="text-green">top-tier</span>
                        </p>
                        <p className="text-orange fs-1 fw-bolder">Design squad</p>
                    </div>
                    <div>
                        <p className="text-white">Get instant access to senior designers, for branding, </p>
                        <p className="text-white">UI/UX, Webflow and more — without the commitment </p>
                        <p className="text-white">or cost of hiring in-house. 
                            <Title />
                        </p>
                    </div>
                    <div>
                        <p className="text-white">
                        <i className="me-2 bi bi-check-circle-fill text-primary"></i> Vetted, US-based designers
                        </p>
                        <p className="text-white">
                        <i className="me-2 bi bi-check-circle-fill text-green"></i> Flexible, month-to-month plans
                        </p>
                        <p className="text-white">
                        <i className="me-2 bi bi-check-circle-fill text-orange"></i> Get started in minutes
                        </p>
                    </div>
                    <div>
                        {
                        !token ?    
                        <Link className="mt-4 btn btn-primary btn-lg border border-1 rounded" 
                        to="/auth/register">
                            Registrate es gratis
                        </Link>
                        :  
                        <Link className="mt-4 btn btn-primary btn-lg border border-1 rounded" 
                        to="/app/home">
                            Empezar
                        </Link>  
                    }
                    </div>
                </Col>
                <Col xs={12} md={4} className="mt-5">
                    <img src={pixel} 
                    alt=""
                    height="250"
                    />
                </Col>
            </Row>
        </Layout>
    )
}

export default Home;