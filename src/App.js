import React, { useState } from 'react';
import Square from './components/Square';
import './App.css';

const App = () => {
  // Initialize the state with an array to represent the game board.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Define a state to keep track of the current player (X or O).
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (selectedIndex) => {
    // Check if the square is already filled or if the game is over.
    if (squares[selectedIndex] || calculateWinner(squares)) {
      return;
    }

    // Create a copy of the squares array to avoid mutating state directly.
    const newSquares = squares.slice();
    // Set the value of the clicked square based on the current player.
    newSquares[selectedIndex] = isXNext ? "❌" : "⭕️";

    // Update the state with the new squares array and toggle the player.
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };
  const resetGame = () => {
    // Reset the game board and current player when the "Reset Game" button is clicked.
    setSquares(Array(9).fill(null));
    setIsXNext(true)
  }
  // Function to determine the winner of the game.
  const calculateWinner = (squares) => {
    // Define winning combinations.
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // If there's no winner, check if all squares are filled (a draw).
    if (squares.every((square) => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  // Determine the status of the game.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? '❌' : '⭕️'}`;
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;