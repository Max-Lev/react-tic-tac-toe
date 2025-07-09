import Player from './components/Player/index.jsx';
import GameBoard from './components/GameBoard/index.jsx';
import Log from './components/Log/index.jsx';
import { useState } from 'react';
function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({X: 'Player1',O: 'Player2'});


  const handleSelectSquare = (rowIndex, colIndex) => {
    console.log(`handleSelectSquare Row: ${rowIndex}, Column: ${colIndex}`);
    setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(turns => [
      {
        player: activePlayer,
        row: rowIndex,
        col: colIndex,
        players: {
          X: playerNames.X,
          O: playerNames.O
        }
      }, ...turns
    ]);
  };

  const handleNameChange = (symbol, name) => {    
    console.log('handleNameChange', symbol, name);
    
    setPlayerNames(playerNames => ({...playerNames,[symbol]: name}));
    
    const step = gameTurns;
    
    setGameTurns((turns,index)=>{
      return turns.map((turn,index) => {
        if(turn.player === symbol && step.length > turns.length) {
          return {
            ...turn,
            players: {...turn.players,[symbol]: name}
          }
        }
        return turn;
      });
    });
    
  }

  return <main>
    <div id="game-container">
  
      <ol id="players" className='highlight-player'>
        <Player 
        onNameChange = {handleNameChange}
        initialName={playerNames.X} symbol="X" isActive={activePlayer === 'X'} />
        <Player onNameChange = {handleNameChange} 
        initialName={playerNames.O} symbol="O" isActive={activePlayer === 'O'} />
      </ol>

      <GameBoard onSelectSquare={handleSelectSquare}
        turns={gameTurns}
        activePlayer={activePlayer} />
    </div>

    <Log turns={gameTurns} />

  </main>
}

export default App
