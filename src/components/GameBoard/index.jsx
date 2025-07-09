import React, { useState } from 'react';
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const GameBoard = ({ onSelectSquare, activePlayer, turns }) => {

  // OPTION 1
  // const gameBoard = initialGameBoard.map((row, rowIndex) => {
  //   return row.map((cell, colIndex) => {
  //     const turn = turns.find(turn => turn.row === rowIndex && turn.col === colIndex);
  //     console.log('turn', turn);
  //     return turn ? turn.player : null;
  //   });
  // });

  // OPTION 2
  let gameBoard = initialGameBoard;
  for (const turn of turns) {
    const { row, col } = turn;
    gameBoard[row][col] = turn.player;
  }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // const handleSelectSquare = (rowIndex, colIndex) => {

  //   setGameBoard((prevBoard) => {
  //     const updatedBoard = [...prevBoard.map(innerArr => [...innerArr])]; // Create a copy of the board
  //     if (updatedBoard[rowIndex][colIndex] === null) {
  //       updatedBoard[rowIndex][colIndex] = activePlayer;
  //     }
  //     return updatedBoard;
  //   });

  //   if (gameBoard[rowIndex][colIndex] !== null) {
  //     console.log('Square already occupied!');
  //     return; 
  //   }

  //   onSelectSquare(rowIndex, colIndex);

  // }

  return <>
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex} className="game-row" style={{ border: '1px solid white' }}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex} className="game-cell" style={{ border: '1px solid red' }}
                data-row={rowIndex} data-cell={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} className="game-cell-button">
                  {playerSymbol || ''}
                </button>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)} className="game-cell-button">
                  {playerSymbol || ''}
                </button> */}
              </li>
            ))}
          </ol>
        </li>
      ))}

    </ol>
  </>;
}

export default GameBoard;