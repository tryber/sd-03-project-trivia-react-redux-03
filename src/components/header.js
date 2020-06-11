import React from "react";
import { connect } from "react-redux";
import MD5 from "crypto-js/md5";

function cryptEmailMD5(data) {
  return MD5(data);
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, email } = this.props;
    const emailHash = cryptEmailMD5(email);
    return (
      <div className="header">
        <img
          alt="Imagem de avatar do jogador"
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${emailHash}`}
        />
        <p data-testid="header-player-name">{name}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userInfo.name,
  email: state.userInfo.email,
});

export default connect(mapStateToProps)(Header);
