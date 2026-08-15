/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Proptypes from 'prop-types';
import './CircleRating.css';

function CircleRating({ rating }) {
    const [circles, setCircles] = useState(Array.from({ length: 5 }));

    return (
        <div className="CircleRating" style={{ display: 'flex', gap: '8px' }}>
            {circles.map((element, index) => (
                <div
                    key={index <= rating ? `Filledout_${index}` : `Empty_${index}`}
                    style={{
                        width: '13.5px',
                        height: '13.5px',
                        borderRadius: '50%',
                        backgroundColor: index <= rating ? 'blue' : 'lightgray',
                    }}
                />
            ))}
        </div>
    );
}

CircleRating.propTypes = {
    rating: Proptypes.number,
};

export default CircleRating;
