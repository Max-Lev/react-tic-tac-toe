import Player from './components/Player/index.jsx';
import GameBoard from './components/GameBoard/index.jsx';
import Log from './components/Log/index.jsx';
import { useState } from 'react';
import GameOver from './components/GameOver/index.jsx';
import derivedWinner from './components/derivedWinner.uti.jsx';
import {derivedGame} from './components/deriveGameboard.util.jsx';

const PLAYERS_INITIAL = { X: 'Player1', O: 'Player2' };


function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(...PLAYERS_INITIAL);

  let gameBoard  = derivedGame.deriveGameboard(gameTurns, derivedGame.initialGameBoard);

  let winner = derivedWinner(gameBoard, playerNames);

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
    setGameTurns([]);
    setActivePlayer('X');
    setPlayerNames(prev => ({ ...prev, ...PLAYERS_INITIAL}));

    winner = null;
    gameBoard = derivedGame.initialGameBoard;
    
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
