import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/esm/Button';

export default function NavButton({ to, icon, text }) {
    return (
        <NavLink to={to}>
            <Button className="btn-light">
                {icon && <i className={icon}></i>}
                {text && <span className="ps-2">{text}</span>}
            </Button>
        </NavLink>
    )
}

NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string,
    icon: PropTypes.string
}
