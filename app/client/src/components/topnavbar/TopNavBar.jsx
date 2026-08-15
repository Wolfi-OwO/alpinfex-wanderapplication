import {
    Container,
    Nav,
    Navbar,
    Dropdown,
    Button,
    Row,
    Col,
    Offcanvas,
    NavDropdown,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import { useState } from 'react';
import './TopNavBar.css';

export default function TopNavBar({ admin }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, _] = useState({
        uniqueProfileId: '1',
    });

    function logout() {
        setIsLoggedIn(false);
    }

    function login() {
        setIsLoggedIn(true);
    }

    return (
        <Container fluid className="px-4">
            <Row className="justify-content-between" xs={2}>
                <Col className="flex-grow-1 px-0">
                    <Navbar expand="sm" variant="dark" sticky={'top'}>
                        <Container fluid className="px-0">
                            <Navbar.Brand>
                                <NavLink
                                    style={{ textDecoration: 'none' }}
                                    to={admin ? '/admin' : '/'}
                                >
                                    {admin ? 'Admin' : 'Alpinfex'}
                                </NavLink>
                            </Navbar.Brand>
                            <Navbar.Toggle
                                aria-controls={`offcanvasNavbar-expand-sm`}
                            />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-sm`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                                placement="end"
                                className={'me-auto justify-content-end'}
                            >
                                <Offcanvas.Header
                                    closeButton
                                    closeVariant={'white'}
                                    closeLabel={'Close'}
                                >
                                    <Offcanvas.Title
                                        id={`offcanvasNavbarLabel-expand-sm`}
                                    >
                                        Offcanvas
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-start flex-grow-1 pe-3">
                                        <NavLink
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                            to={'tours'}
                                        >
                                            <Button
                                                variant="outline-primary"
                                                className="ms-2"
                                                style={{ border: 'none' }}
                                            >
                                                Tours
                                            </Button>
                                        </NavLink>

                                        <NavLink
                                            style={{ textDecoration: 'none' }}
                                            to={'blogs'}
                                        >
                                            <Button
                                                variant="outline-primary"
                                                className="ms-2"
                                                style={{ border: 'none' }}
                                            >
                                                Blogs
                                            </Button>
                                        </NavLink>

                                        <NavLink
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                            to={'impressum'}
                                        >
                                            <Button
                                                variant="outline-primary"
                                                className="ms-2"
                                                style={{ border: 'none' }}
                                            >
                                                Impressum
                                            </Button>
                                        </NavLink>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </Col>
                <Col md={'auto'} xs={'auto'} xm={'auto'} className="py-1">
                    <Dropdown
                        className="ms-auto usericon--dropdown"
                        align={'end'}
                    >
                        <Dropdown.Toggle
                            id="dropdown-autoclose-outside"
                            className="invisible-dropdown-toggle"
                        >
                            <i
                                style={{ fontSize: 'x-large' }}
                                className="bi bi-person-fill header"
                            ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            style={{
                                position: 'absolute',
                                zIndex: 1000, // Damit das Menü über allem anderen liegt
                                border: '1px solid #ddd', // Rahmen des Dropdowns
                                borderRadius: '4px', // Abgerundete Ecken
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Schatten für den Overlay-Effekt
                            }}
                        >
                            <Dropdown.Item as={'div'} disabled={!isLoggedIn}>
                                <NavLink
                                    to={`profiles/${profile.uniqueProfileId}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                    }}
                                >
                                    View Profile
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#"
                                onClick={isLoggedIn ? logout : login}
                                style={{ color: 'black' }}
                            >
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    );
}

TopNavBar.propTypes = {
    admin: propTypes.bool.isRequired,
};
