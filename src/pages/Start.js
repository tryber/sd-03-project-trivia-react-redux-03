import React from 'react';
import { Link } from 'react-router-dom';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonDisbled: true,
      redirectScreenPlay: false,
    }
    this.onChangeEmailValue = this.onChangeEmailValue.bind(this);
    this.onChangeNameValue = this.onChangeNameValue.bind(this);
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
      this.setState({ buttonDisbled: true});
    }
  }

  render() {
    const { buttonDisbled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={this.onChangeEmailValue}
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={this.onChangeNameValue}
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={buttonDisbled}
            onClick={this.onClickPlay}
          >
            Jogar
        </button>
        </form>
        <div>
          <Link data-testid="btn-settings" to="/settings">Configurações</Link>
        </div>
      </div>
    );
  }
}

export default Start;
