import React from 'react';

const GameOver = ({ winner, name,onRestart }) => {
  return <>
    <div id="game-over">
      <h1>Game Over</h1>
      {winner && (<p>{name.toUpperCase()} - {winner} won!</p>)}
      {!winner && (<p>It's a draw!</p>)}
      <button onClick={onRestart}>Rematch!</button>
    </div>
  </>;
}

export default GameOver;