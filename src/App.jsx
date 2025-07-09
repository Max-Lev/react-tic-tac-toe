import Player from './components/Player/index.jsx';
import GameBoard from './components/GameBoard/index.jsx';
import Log from './components/Log/index.jsx';
import { useState } from 'react';
function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  
  const handleSelectSquare = (rowIndex, colIndex) => {
    console.log(`handleSelectSquare Row: ${rowIndex}, Column: ${colIndex}`);
    setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X'); 
    setGameTurns(turns => [{ player: activePlayer, row: rowIndex, col: colIndex },...turns]);
  }

  return <main>
    <div id="game-container">

      <ol id="players" className='highlight-player'>
        <Player initialName="Player1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player2" symbol="O" isActive={activePlayer==='O'} />
      </ol>

      <GameBoard onSelectSquare={handleSelectSquare} 
      turns={gameTurns}
      activePlayer={activePlayer}/>

    </div>

    <Log turns={gameTurns}/>

  </main>
}

export default App
