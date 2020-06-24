import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Results = ({ score, assertions }) => (
  <div>
    <div>
      <h4>Questões Certas:</h4>
      <p data-testid="feedback-total-question">{assertions}</p>
    </div>
    <div>
      <h4>Total de Pontos:</h4>
      <p data-testid="feedback-total-score">{score}</p>
    </div>
  </div>
);

Results.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameInfo }) => ({
  score: gameInfo.score,
  assertions: gameInfo.assertions,
});

export default connect(mapStateToProps)(Results);
