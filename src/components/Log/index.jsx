import React, { useEffect } from 'react';


const Log = ({ turns }) => {
  // const logs = [...turns].map((turn, index) => {
  //   console.log(...turns)
  //   return `Turn ${index + 1}: Player ${turn.player} placed at Row: ${turn.row}, Column: ${turn.col}`;
  // });
  // useEffect(() => {
  //   console.log('Log component updated', turns);
  //   console.log('Log component updated', turns[0] && turns[0].players);
  // }, [turns]);

  return <>
    <ol id="log">
      {
        turns.map((turn, index) => {
          return <li key={`${turn.row}-${turn.col}`} className="game-log-item">
            <p>
              <span>Name: {turn && turn.players[turn.player]} </span>
            </p>
            <p>
              <span>Move {turns.length - index}:
                Player {turn.player} placed at Row: {turn.row}, Column: {turn.col}
              </span>
            </p>
            <hr />
          </li>
        })
      }
    </ol>
    {/* <ol id="log">
      {logs.length === 0 ? (
        <li className="game-log-item">No moves made yet.</li>
      ) : (
        logs.map((log, index) => (
          <li key={index} className="game-log-item">{log}</li>
        ))
      )}
    </ol> */}
  </>;
}

export default Log;