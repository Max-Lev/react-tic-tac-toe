import React from 'react';


const Log = ({ turns }) => {
  // const logs = [...turns].map((turn, index) => {
  //   console.log(...turns)
  //   return `Turn ${index + 1}: Player ${turn.player} placed at Row: ${turn.row}, Column: ${turn.col}`;
  // });

  return <>
    <ol id="log">
      {
        turns.map((turn, index) => {
          return <li key={`${turn.row}-${turn.col}`} className="game-log-item">
            <span>Move {turns.length - index}: 
              Player {turn.player} placed at Row: {turn.row}, Column: {turn.col}</span>
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