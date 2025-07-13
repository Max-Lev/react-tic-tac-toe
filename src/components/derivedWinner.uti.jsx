import {WINNING_COMBINATIONS} from '../winning-combinitations.jsx';

export default function derivedWinner(gameBoard, playerNames) {
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
      return winner
}