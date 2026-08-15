import PropTypes from 'prop-types';
import { Image, Carousel } from 'react-bootstrap';

function ImageCollection({ images }) {
    return (
        <Carousel style={{ height: '100%' }}>
            {images.map((id, index) => (
                <Carousel.Item key={index} style={{ height: '50vh' }}>
                    <Image
                        src={`data:image/jpeg;base64,${id.image}`}
                        style={{
                            height: '50vh',
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: '10% 25%'
                        }}
                    />
                    {id.description && <Carousel.Caption>
                        <span className='p-2 rounded'>{id.description}.</span>
                    </Carousel.Caption>}
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

ImageCollection.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

export default ImageCollection;
