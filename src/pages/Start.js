import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { tokenPlayer } from "../services/api";
import { userInfo } from "../actions";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      buttonDisbled: true,
      redirectScreenPlay: false,
    };
    this.onChangeEmailValue = this.onChangeEmailValue.bind(this);
    this.onChangeNameValue = this.onChangeNameValue.bind(this);
    this.onClickToPlay = this.onClickToPlay.bind(this);
  }

  onClickToPlay() {
    const { name, email } = this.state;
    const { userInfo } = this.props;
    userInfo(name, email);
    this.setState({ redirectScreenPlay: true });
    tokenPlayer().then((item) => localStorage.setItem("token", item));
  }

  onChangeEmailValue(event) {
    const { value } = event.target;
    const { name } = this.state;
    this.setState({ email: value });
    if (value !== "" && name !== "") {
      this.setState({ buttonDisbled: false });
    } else {
      this.setState({ buttonDisbled: true });
    }
  }

  onChangeNameValue(event) {
    const { value } = event.target;
    const { email } = this.state;
    this.setState({ name: value });
    if (value !== "" && email !== "") {
      this.setState({ buttonDisbled: false });
    } else {
      this.setState({ buttonDisbled: true });
    }
  }

  labelEmail() {
    return (
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          onChange={this.onChangeEmailValue}
        />
      </label>
    );
  }

  labelName() {
    return (
      <label htmlFor="name">
        Nome:
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          onChange={this.onChangeNameValue}
        />
      </label>
    );
  }

  buttonPlay(buttonDisbled) {
    return (
      <button
        data-testid="btn-play"
        disabled={buttonDisbled}
        onClick={this.onClickToPlay}
      >
        Jogar
      </button>
    );
  }

  render() {
    const { buttonDisbled, redirectScreenPlay } = this.state;

    if (redirectScreenPlay) {
      return <Redirect to="/play" />;
    }

    return (
      <div>
        {this.labelEmail()}
        {this.labelName()}
        {this.buttonPlay(buttonDisbled)}
        <div>
          <Link data-testid="btn-settings" to="/settings">
            Configurações
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userInfo: (name, email) => dispatch(userInfo(name, email)),
});

const mapStateToProps = (state) => ({
  name: state.userInfo.name,
})

Start.propTypes = {
  userInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
