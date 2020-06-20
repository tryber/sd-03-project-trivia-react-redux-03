import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StartBtn from '../components/StartBtn';
import Rank from '../components/Rank';

const Ranking = ({ isLogged }) => {
  if (isLogged) {
    return (
      <div>
        <h1>Ranking</h1>
        <Rank />
        <StartBtn />
      </div>
    );
  }
  return (
    <h1>
      <Link to="/">
        Oops! Please, log to play!
      </Link>
    </h1>
  );
};

Ranking.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLogged: state.userInfo.isLogged });

export default connect(mapStateToProps)(Ranking);
