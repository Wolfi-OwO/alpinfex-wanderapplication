import { Col, Container, Row } from 'react-bootstrap';
import Clock from '../clock/Clock.jsx';
import TypeEffect from '../type-effect/TypeEffect.jsx';

export default function HomeHeader() {
    return (
        <Container fluid className='header d-flex justify-content-center align-items-center'>
            <Container className='text'>
                <Row className='align-items-center justify-content-between' xs="auto">
                    <Col className="text-center ms-auto" style={{ width: 'fit-content' }}>
                        <h1>
                            <TypeEffect fullText={'Welcome back!'} typingSlowness={125} />
                        </h1>
                    </Col>
                    <Col className="ms-auto">
                        <Clock />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
