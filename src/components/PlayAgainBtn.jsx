import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { resetUserLogin } from '../actions/actionsCreators';

const PlayAgainBtn = ({ logOut }) => (
  <Link to="/" data-testid="btn-play-again">
    <button
      type="button"
      onClick={() => (logOut())}
    >
      JOGAR NOVAMENTE
    </button>
  </Link>
);

PlayAgainBtn.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(resetUserLogin()),
});

export default connect(null, mapDispatchToProps)(PlayAgainBtn);
