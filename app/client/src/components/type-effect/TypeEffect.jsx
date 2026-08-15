import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './TypeEffect.css';

function TypeEffect({ fullText, typingSlowness }) {
    const [text, setText] = useState('');
    const currentIndexRef = useRef(0); 
    const isTypingRef = useRef(true); 

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isTypingRef.current) {
                if (currentIndexRef.current < fullText.length) {
                    if (fullText[currentIndexRef.current] == ' ') {
                        currentIndexRef.current += 1;
                        return;
                    }
                    setText(fullText.slice(0, currentIndexRef.current + 1));
                    currentIndexRef.current += 1;
                } else {
                    isTypingRef.current = false;
                }
            } else {
                if (currentIndexRef.current > 0) {
                    setText(fullText.slice(0, currentIndexRef.current - 1));
                    currentIndexRef.current -= 1;
                } else {
                    isTypingRef.current = true;
                }
            }
        }, typingSlowness);

        return () => clearInterval(typingInterval);
    }, [fullText, typingSlowness]);

    return (text);
}

TypeEffect.propTypes = {
    fullText: PropTypes.string.isRequired,
    typingSlowness: PropTypes.number.isRequired,
};

export default TypeEffect;