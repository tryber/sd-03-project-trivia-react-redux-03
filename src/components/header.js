import React from 'react';

const ls = localStorage.getItem('state');

function Header() {
  return (
    <div className="header">
      <img
        data-testid="header-profile-picture"
        src=""
      />
      <h5 data-testid="header-player-name">Jogador: {ls.player.name}</h5>
      <h5 data-testid="header-score">Pontos: {ls.player.score}</h5>
    </div>
  );
}

export default Header;
