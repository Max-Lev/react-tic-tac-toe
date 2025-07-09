import Player from './components/Player/index.jsx';
import GameBoard from './components/GameBoard/index.jsx';
import Log from './components/Log/index.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinitations.jsx';
import GameOver from './components/GameOver/index.jsx';
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({ X: 'Player1', O: 'Player2' });


  let gameBoard = [...initialGameBoard.map(innerArr => [...innerArr])]; // Create a copy of the initial game board
  for (const turn of gameTurns) {
    const { row, col } = turn;
    gameBoard[row][col] = turn.player;
  }

  let winner = null;
  for (const combiniation of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combiniation[0].row][combiniation[0].column];
    const secondSquare = gameBoard[combiniation[1].row][combiniation[1].column];
    const thirdSquare = gameBoard[combiniation[2].row][combiniation[2].column];

    if (firstSquare && firstSquare === secondSquare && secondSquare === thirdSquare) {
      winner = firstSquare;
      console.log(playerNames[winner], 'is the winner');
      console.log('winner found', winner);
      console.log('winning combiniation', combiniation);
    }
  }



  const handleSelectSquare = (rowIndex, colIndex) => {
    console.log(`handleSelectSquare Row: ${rowIndex}, Column: ${colIndex}`);

    // const _isSelected = isSelected(rowIndex, colIndex);
    // if (_isSelected) {
    //   console.log('Square already occupied!');
    //   return;
    // }
    setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(turns => [
      {
        player: activePlayer,
        row: rowIndex,
        col: colIndex,
        players: { X: playerNames.X, O: playerNames.O }
      }, ...turns
    ]);
  };

  // Function to check if a cell is selected
  const isSelected = (rowIndex, colIndex) =>
    // Check if any turn in the gameTurns array has the same row and column index as the cell
    gameTurns.some(turn => turn.row === rowIndex && turn.col === colIndex);


  const handleNameChange = (symbol, name) => {
    console.log('handleNameChange', symbol, name);

    setPlayerNames(playerNames => ({ ...playerNames, [symbol]: name }));

    const step = gameTurns;

    setGameTurns((turns) => {
      return turns.map((turn) => {
        if (turn.player === symbol && step.length > turns.length) {
          return {
            ...turn,
            players: { ...turn.players, [symbol]: name }
          }
        }
        return turn;
      });
    });
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handelRestart = () => {
    setGameTurns(prev=>[]);
    setActivePlayer('X');
    setPlayerNames(prev => {
      return { ...prev, X: 'Player1', O: 'Player2' }
    });
    // setGameTurns((prev)=>{
    //   return prev.map(turn => {
    //     return {
    //       ...turn,
    //       players: { X: 'Player1', O: 'Player2' }
    //     }
    //   });
    // });
    winner = null;
    gameBoard = initialGameBoard;
    console.log('Game restarted');
  }

  return <main>
    <div id="game-container">

      <ol id="players" className='highlight-player'>
        <Player
          onNameChange={handleNameChange}
          initialName={playerNames.X} symbol="X" isActive={activePlayer === 'X'} />
        <Player onNameChange={handleNameChange}
          initialName={playerNames.O} symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      {
        (winner || hasDraw) && <GameOver onRestart={handelRestart} winner={winner} name={playerNames[winner]} />
      }
      <GameBoard
        gameBoard={gameBoard}
        onSelectSquare={handleSelectSquare}
        turns={gameTurns}
        activePlayer={activePlayer} />
    </div>

    <Log turns={gameTurns} />

  </main>
}

export default App
