import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Profiles() {
    const urlParams = useParams();
    const [profile, setProfile] = useState({
        vorname: 'Max',
        nachname: 'Mustermann',

        _: {
            creationDate: '12.04.1977',
            updateDate: '29.12.2024',
        },
    });

    return (
        <Container fluid>
            <Row>
                <Col>
                    <p>
                        <b>Vorname: </b>
                    </p>
                    <p>{profile.vorname}</p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
