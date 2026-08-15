import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './TourOverview.css';
import Map_Comp from '../../components/core/Map.jsx';
import ImageGallery from '../../components/image-gallery/ImageGallery.jsx';
import CircleRating from '../../components/circle-rating/CircleRating.jsx';
import { ArrowDown, ArrowDownUp, ArrowLeftRight, ArrowUp, Clock } from 'react-bootstrap-icons';

function TourOverview() {
    const { id } = useParams();
    const [tour, setTour] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/api/tours/${id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data['status-code'] === 404) {
                    setError(data);
                    return;
                }
                setTour(() => data);
            });
    }, [id]);

    if (!tour) return <Container><p>Loading ...</p></Container>;

    return (
        <Container fluid className="tour-overview h-100">
            {/* Header */}
            <Row className="bg-light border-bottom header-row">
                <Row className='align-items-center justify-content-between' xs="auto">
                    <Col className='p-0' style={{ width: 'fit-content' }}>
                        <Button variant="light" className='p-0 m-2' onClick={() => window.history.back()}>
                            <i className="fa fa-arrow-left"></i> Zurück
                        </Button>
                    </Col>
                    <Col className="text-center mx-auto">
                        <h1 className="mt-2">{tour.heading}</h1>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Col>
                    <Map_Comp gpx={tour.details.gpx_data} />
                </Col>
            </Row>

            {/* Main Content */}
            <Row className="tour-content">
                <Container fluid>
                    <Row className='justify-content-between mx-5'>
                        <Col md={'auto'}>
                            <Container fluid className='item center p-2 m-2'>
                                <Row >
                                    <Col md={'auto'}>
                                        <Stack >
                                            <span>Technik</span>
                                            <CircleRating rating={tour.technique} />
                                        </Stack>
                                    </Col>
                                    <Col md={'auto'}>
                                        <Stack>
                                            <span>Kondition</span>
                                            <CircleRating rating={tour.condition} />
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={'auto'}>
                            <Container fluid className='item center p-2 m-2'>
                                <Row>
                                    <Col>
                                        <ArrowLeftRight/>
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.routes[0].distance.total}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Clock/>
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.routes[0].distance.total}</span>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={'auto'}>
                            <Container fluid className='item center p-2 m-2'>
                                <Row >
                                    <Col md={'auto'}>
                                        <ArrowUp />
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.elevation.up}</span>
                                        &nbsp;&nbsp;<ArrowDown />&nbsp;
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.elevation.down}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={'auto'}>
                                        <ArrowDownUp />
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.elevation.min}</span>
                                        <span>&nbsp;&nbsp;-&nbsp;</span>
                                        <span className='fw-bold'>&nbsp;{tour.details.gpx_data.elevation.max}</span>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="mx-5">
                        <Col>
                            <Container fluid className="item p-2 m-2">
                                <span className="fw-bold">Beschreibung:</span>
                                <p className='mx-3'>{tour.details.description}</p>
                            </Container>
                        </Col>
                        <Col>
                            <Container fluid className="item p-2 m-2">
                                <span className="fw-bold">Ankunftsroute:</span>
                                <p className='mx-3'>{tour.details.arrivalRoute}</p>
                            </Container>
                        </Col>
                        <Col>
                            <Container fluid className="item p-2 m-2">
                                <span className="fw-bold">Ausrüstung:</span>
                                <p className='mx-3'>{tour.details.equipment}</p>
                            </Container>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mx-5">
                        <Col style={{ height: '50vh', width: 'fit-content' }}>
                            <ImageGallery images={tour.details.images.ids} />
                        </Col>
                    </Row>

                </Container>
            </Row>
        </Container>
    );
}

export default TourOverview;
