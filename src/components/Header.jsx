import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import hashedMail from '../services/encrypt_mail';
import '../styles/Header.css';

function Header({ userName, score, userEmail }) {
  const hash = hashedMail(userEmail);
  return (
    <header className="header-feedback-and-game">
      <div>
        <img
          className="img-from-gravatar"
          src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
          alt={`${userName} avatar`}
          data-testid="header-profile-picture"
        />
        <span className="player-name" data-testid="header-player-name">
          Jogador:
          <p data-testid="header-player-name">{userName}</p>
        </span>
      </div>
      <Link to="/">
        <button data-testid="btn-play-again">Início</button>
      </Link>
      <div>
        <h3 className="player-score" data-testid="header-score">
          {score}
        </h3>
      </div>
    </header>
  );
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.gameInfo.score,
  userName: state.userInfo.userName,
  userEmail: state.userInfo.userEmail,
});

export default connect(mapStateToProps)(Header);
