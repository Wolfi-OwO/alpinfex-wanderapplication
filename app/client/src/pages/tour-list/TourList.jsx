import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ToastContainer, { showToast } from '../../components/toasts/ToastContainer.jsx';
import TourCard from '../../components/core/TourCard.jsx';
import './TourList.css';

export default function TourList() {
    const [tours, setTours] = useState([]);

    async function fetchTours() {
        try {
            const response = await fetch('http://localhost:8080/api/tours');
            if (response.status !== 200) throw new Error(response.statusText);
            const tours = await response.json();
            setTours(tours);
        } catch (err) {
            showToast('Failed fetching tours', 'Just now', err.message);
        }
    }

    useEffect(() => {
        fetchTours();

        return () => {
            setTours([]);
        };
    }, []);

    return (
        <Fragment>
            <ToastContainer />
            <Container fluid className="toursContainer pb-2 mb-2">
                <Row className="easy flex-nowrap vw-100 overflow-y-auto">
                    {tours
                        .filter((tour) => tour.difficulty === 'Leicht')
                        .map((tour) => (
                            <Col md="auto" className="tourCard" key={tour._id}>
                                <TourCard tour={tour} />
                            </Col>
                        ))}
                </Row>
                <Row className="medium flex-nowrap vw-100 overflow-y-auto">
                    {tours
                        .filter((tour) => tour.difficulty === 'Mittel')
                        .map((tour) => (
                            <Col md="auto" className="tourCard" key={tour._id}>
                                <TourCard tour={tour} />
                            </Col>
                        ))}
                </Row>
                <Row className="hard flex-nowrap vw-100 overflow-y-auto">
                    {tours
                        .filter((tour) => tour.difficulty === 'Schwer')
                        .map((tour) => (
                            <Col md="auto" className="tourCard" key={tour._id}>
                                <TourCard tour={tour} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </Fragment>

    );
}