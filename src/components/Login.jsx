import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getTriviaToken } from '../services/endpoints_API';
import { setUserInfo, resetGame, resetTimer } from '../actions/actionsCreators';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userName: '',
      token: '',
    };
  }

  componentDidMount() {
    const { resetGameState, resetGameTimer } = this.props;
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    resetGameState();
    resetGameTimer();
  }

  handleStateChange(field, value) {
    this.setState((state) => ({
      ...state,
      [field]: value,
    }));
  }

  validateEmail() {
    const { userEmail } = this.state;
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(userEmail);
  }

  async handleGame() {
    const { setUserInfoStore } = this.props;
    const userToken = await getTriviaToken();
    this.setState((state) => ({
      ...state,
      token: userToken.token,
    }));
    localStorage.setItem('token', JSON.stringify(userToken.token));
    return setUserInfoStore(this.state);
  }

  renderEmail() {
    const { userEmail } = this.state;

    return (
      <label className="label" htmlFor="input-gravatar-email">
        Email:&nbsp;
        <input
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          onChange={(e) => this.handleStateChange('userEmail', e.target.value)}
          type="email"
          value={userEmail}
        />
      </label>
    );
  }

  renderName() {
    const { userName } = this.state;

    return (
      <label className="label" htmlFor="input-player-name">
        Nome:&nbsp;
        <input
          data-testid="input-player-name"
          id="input-player-name"
          onChange={(e) => this.handleStateChange('userName', e.target.value)}
          type="text"
          value={userName}
        />
      </label>
    );
  }

  renderButton() {
    const { userName } = this.state;
    const validEmail = this.validateEmail();
    return (
      <button
        data-testid="btn-play"
        disabled={!(validEmail && userName)}
        onClick={() => this.handleGame()}
        type="button"
      >
        Jogar
      </button>
    );
  }

  render() {
    const { userLogged } = this.props;
    const renderComponent = !userLogged
      ? (
        <div className="login-page">
          <div className="form">
            <Link
              className="label"
              data-testid="btn-settings"
              to="/settings"
            >
              Configurações
            </Link>
            <br />
            <br />
            {this.renderEmail()}
            <br />
            {this.renderName()}
            <br />
            {this.renderButton()}
          </div>
        </div>
      )
      : (
        <Redirect to="/game" />
      );

    return (renderComponent);
  }
}

Login.propTypes = {
  resetGameState: PropTypes.func.isRequired,
  resetGameTimer: PropTypes.func.isRequired,
  setUserInfoStore: PropTypes.func.isRequired,
  userLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userLogged: state.userInfo.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  resetGameState: () => dispatch(resetGame()),
  resetGameTimer: () => dispatch(resetTimer()),
  setUserInfoStore: (userData) => dispatch(setUserInfo(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
