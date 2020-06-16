import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FeedBackMsg = ({ assertions }) => (assertions >= 3 ? (
  <h3 data-testid="feedback-text">Mandou bem!</h3>
) : (
  <h3 data-testid="feedback-text">Podia ser melhor...</h3>
));

FeedBackMsg.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameInfo }) => ({
  assertions: gameInfo.assertions,
});

export default connect(mapStateToProps)(FeedBackMsg);
