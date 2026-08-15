import RBToast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

export default function Toast({ data, onClose }) {
  const { heading1, heading2, body } = data;

  return (
    <RBToast onClose={() => onClose(data.id)}>
      <RBToast.Header>
        <i className="bi bi-bell me-2"></i>
        <strong className="me-auto">{heading1}</strong>
        <small className="text-muted">{heading2}</small>
      </RBToast.Header>
      <RBToast.Body>{body}.</RBToast.Body>
    </RBToast>
  )
}

Toast.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
  heading1: PropTypes.string,
  heading2: PropTypes.string,
  body: PropTypes.string
}
