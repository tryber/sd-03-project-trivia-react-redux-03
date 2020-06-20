import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetUserLogin } from '../actions/actionsCreators';

const StartBtn = ({ logOut }) => (
  <Link
    data-testid="btn-go-home"
    to="/"
  >
    <button
      type="button"
      onClick={() => (logOut())}
    >
      Início
    </button>
  </Link>
);

StartBtn.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(resetUserLogin()),
});

export default connect(null, mapDispatchToProps)(StartBtn);
