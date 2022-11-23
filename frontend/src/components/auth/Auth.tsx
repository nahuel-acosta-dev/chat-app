import { FC, ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { title } from '../../constants/title';

type Props = { children: ReactNode }

const Auth: FC<Props> = ({children}) => {


    return(
        <Container className="auth text-white">
            <Row>
                <Col xs={1} lg={4} sm={2}></Col>
                <Col className="text-center">
                    {title.map((details, i) => (
                        <span className={`${details.className} fs-1 fw-bolder`}
                        key={i}>
                            {details.letter}
                        </span>
                    ))}
                </Col>
                <Col xs={1} lg={4} sm={2}></Col>
            </Row>
            <Row className="height_maximum">
                <Col xs={1} lg={4} sm={2}></Col>
                <Col className="auth__form">
                    {children}
                </Col>
                <Col xs={1} lg={4} sm={2}></Col>
            </Row>
        </Container>
    )
}

export default Auth;