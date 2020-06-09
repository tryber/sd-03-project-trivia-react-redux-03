import React from 'react';

const { name, score } = JSON.parse(localStorage.getItem('state')).player;
const token = localStorage.getItem('token');

function Header() {
  return (
    <div className="header">
      <img
        alt="Imagem de avatar do jogador"
        data-testid="header-profile-picture"
        src={`https://www.gravatar.com/avatar/${token}`}
      />
      <h5 data-testid="header-player-name">Jogador: {name}</h5>
      <h5 data-testid="header-score">Pontos: {score}</h5>
    </div>
  );
}

export default Header;
