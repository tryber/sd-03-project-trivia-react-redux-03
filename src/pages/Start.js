import React from 'react';
import { tokenPlayer } from '../services/api';
import { Link, Redirect } from 'react-router-dom';


class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonDisbled: true,
      redirectScreenPlay: false,
    };
    this.onChangeEmailValue = this.onChangeEmailValue.bind(this);
    this.onChangeNameValue = this.onChangeNameValue.bind(this);
    this.onClickToPlay = this.onClickToPlay.bind(this);
  }

  onClickToPlay() {
    this.setState({ redirectScreenPlay: true });
    tokenPlayer().then((item) => console.log(item));
  }

  onChangeEmailValue(event) {
    const { value } = event.target;
    const { name } = this.state;
    this.setState({ email: value });
    if (value !== '' && name !== '') {
      this.setState({ buttonDisbled: false });
    } else {
      this.setState({ buttonDisbled: true });
    }
  }

  onChangeNameValue(event) {
    const { value } = event.target;
    const { email } = this.state;
    this.setState({ name: value });
    if (value !== '' && email !== '') {
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
      return <Redirect to={`/play`} />;
    }

    return (
      <div>
        {this.labelEmail()}
        {this.labelName()}
        {this.buttonPlay(buttonDisbled)}
        <div>
          <Link data-testid="btn-settings" to="/settings">Configurações</Link>
        </div>
      </div>
    );
  }
}

export default Start;
