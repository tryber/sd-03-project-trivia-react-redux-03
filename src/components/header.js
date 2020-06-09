import React from 'react';

const ls = localStorage.getItem('state');
const token = localStorage.getItem('token');

function Header() {
  return (
    <div className="header">
      <img
        alt="Imagem de avatar do jogador"
        data-testid="header-profile-picture"
        src={`https://www.gravatar.com/avatar/${token}`}
      />
      <h5 data-testid="header-player-name">Jogador: {ls.player.name}</h5>
      <h5 data-testid="header-score">Pontos: {ls.player.score}</h5>
    </div>
  );
}

export default Header;
