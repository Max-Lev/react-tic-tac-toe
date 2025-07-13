export const  initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
export  function deriveGameboard(gameTurns, initialGameBoard) {
    let gameBoard = [...initialGameBoard.map(innerArr => [...innerArr])]; // Create a copy of the initial game board
    for (const turn of gameTurns) {
      const { row, col } = turn;
      gameBoard[row][col] = turn.player;
    }
    return gameBoard;
}

 export const derivedGame = {
  deriveGameboard,
  initialGameBoard
};