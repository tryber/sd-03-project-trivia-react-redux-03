import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NextButton = ({ onClick, condition }) => (condition ? (
  <Link to="/feedback">
    <button type="button" data-testid="btn-next">
      Próxima
    </button>
  </Link>
) : (
  <div>
    <button type="button" data-testid="btn-next" onClick={onClick}>
      Próxima
    </button>
  </div>
));

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  condition: PropTypes.bool.isRequired,
};

export default NextButton;
