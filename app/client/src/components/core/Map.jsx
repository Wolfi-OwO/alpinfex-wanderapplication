import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

function Map_Comp({ gpx }) {
    return (
        <Container className='leaflet-map m-0 p-0' fluid>
            <MapContainer
                key={'leaflet_tourmap'}
                center={[(gpx.routes[0].points[0].lat + gpx.routes[0].points[Math.floor(gpx.routes[0].points.length / 2)].lat) / 2, (gpx.routes[0].points[0].lon + gpx.routes[0].points[Math.floor(gpx.routes[0].points.length / 2)].lon) / 2]}
                zoom={13}
                scrollWheelZoom={true}
                className='w-100'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {gpx.routes[0].points.length > 0 && <Polyline color="red" positions={gpx.routes[0].points.map(point => [point.lat, point.lon])} />}
            </MapContainer>
        </Container >
    );
}

Map_Comp.propTypes = {
    gpx: PropTypes.shape({
        elevation: PropTypes.object.isRequired,
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                distance: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                }).isRequired,
                points: PropTypes.array.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default Map_Comp;