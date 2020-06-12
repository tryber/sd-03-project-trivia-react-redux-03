import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';

function cryptEmailMD5(data) {
  return MD5(data);
}

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const emailHash = cryptEmailMD5(email);
    return (
      <div className="header">
        <img
          alt="Imagem de avatar do jogador"
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${emailHash}`}
          width="50px"
        />
        <p data-testid="header-player-name">Jogador: {name}</p>
        <p data-testid="header-score">Pontos: {score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userInfo.name,
  email: state.userInfo.email,
  score: state.scoreReducer.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
