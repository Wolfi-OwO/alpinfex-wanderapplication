import { Card, Col, Container, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import {
    ArrowUp,
    ArrowDown,
    Clock,
    ArrowsVertical,
    ArrowLeftRight
} from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

export default function TourCard({ tour }) {
    const navigate = useNavigate()

    function handleNaviation(){
        navigate(`${tour['_id']}`);
    }

    return (
        <Card className="h-100 w-100" onClick={handleNaviation}>
            <Card.Img src={`data:image/jpeg;base64,${tour.details.images.thumbnail.image}`} style={{height: '150px', objectFit: 'cover'}}/>
            <Card.Header className="w-100">
                <div>
                    <span>{tour.heading}</span>
                </div>
            </Card.Header>
            <Card.Body className="h-100 w-100">
                <Container fluid>
                    <Row>
                        <Col>
                            <Container fluid>
                                <Row xs={'auto'} sm={'auto'} md={'auto'}>
                                    <Col style={{ textAlign: 'start' }}>
                                        <span>{tour.difficulty}</span>
                                    </Col>
                                    <Col style={{ textAlign: 'end' }}>
                                        <span>{tour.type}</span>
                                    </Col>
                                </Row>
                            </Container>
                            <Container fluid>
                                <Row xs={'auto'} sm={'auto'} md={'auto'}>
                                    <Col>
                                        <ArrowLeftRight size={14} /> {/* Bootstrap-Icon für die Distanz */}
                                        <span> {tour.details.gpx_data.routes[0].distance.total} Km</span>
                                    </Col>
                                    <Col className="ms-auto">
                                        <ArrowUp size={14} /> {/* Bootstrap-Icon für den Aufstieg */}
                                        <span> {tour.details.gpx_data.elevation.up} hm</span>
                                        <span> </span>
                                        <ArrowDown size={14} /> {/* Bootstrap-Icon für den Abstieg */}
                                        <span> {tour.details.gpx_data.elevation.down} hm</span>
                                    </Col>
                                </Row>
                                <Row xs={'auto'} sm={'auto'} md={'auto'}>
                                    <Col>
                                        <Clock size={14} /> {/* Bootstrap-Icon für die Dauer */}
                                        <span> {tour.details.gpx_data.routes[0].duration} h</span>
                                    </Col>
                                    <Col className="ms-auto">
                                        <ArrowsVertical size={14} /> {/* Bootstrap-Icon für die Höhenmeter */}
                                        <span> {tour.details.gpx_data.elevation.min}m</span>
                                        <span> - </span>
                                        <span>{tour.details.gpx_data.elevation.max}m</span>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>


    );
}

TourCard.propTypes = {
    tour: PropTypes.shape({
        _id: PropTypes.string,
        heading: PropTypes.string,
        type: PropTypes.string,
        difficulty: PropTypes.string,
        description: PropTypes.string,
        condition: PropTypes.number,
        technique: PropTypes.number,
        details: PropTypes.shape({
            images: PropTypes.shape({
                maxCount: PropTypes.number,
                name: PropTypes.string,
                ids: PropTypes.array,
                thumbnail: PropTypes.object
            }),
            gpx_data: PropTypes.shape({
                routes: PropTypes.array,
                elevation: PropTypes.shape({
                    min: PropTypes.number,
                    max: PropTypes.number,
                    up: PropTypes.number,
                    down: PropTypes.number,
                }),
            }),
        }),
    }),
};