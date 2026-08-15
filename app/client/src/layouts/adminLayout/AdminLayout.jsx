import { useOutlet, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TopNavBar from '../../components/topnavbar/TopNavBar';
import Footer from '../footer/Footer';
import HomeHeader from '../../components/core/HomeHeader';

function AdminLayout() {
    const params = useParams();
    const outlet = useOutlet();

    return (
        <Container fluid className='vh-100 p-0 d-flex flex-column'>
            <header>
                <TopNavBar admin={true} />
            </header>
            <Container fluid className="home flex-grow-1 d-flex flex-column align-items-center justify-content-center p-0">
                {!params.id && <HomeHeader />}
                <Container fluid className='body flex-grow-1 p-0'>
                    {outlet}
                </Container>
            </Container>
            <Footer />
        </Container>
    );
}

export default AdminLayout;