import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Tabuleiro
  const [isXNext, setIsXNext] = useState(true); // Alternar entre X e O
  const [score, setScore] = useState({ X: 0, O: 0 }); // Placar
  const winner = calculateWinner(board); // Verificar se há um vencedor

  const handleClick = (index) => {
    if (board[index] || winner) return; // Não permitir jogadas em células preenchidas ou após vitória
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Verificar se há um vencedor após a jogada
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setScore((prevScore) => ({
        ...prevScore,
        [currentWinner]: prevScore[currentWinner] + 1,
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index] === 'X' ? 'neon-x' : 'neon-o'}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const status = winner
    ? `Vencedor: ${winner}`
    : board.every((square) => square) // Verifica se o tabuleiro está cheio
    ? 'Empate!'
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="container">
      <div className="game">
        <h1>Jogo da Velha</h1>
        <div className="status">{status}</div>
        <div className="board">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset" onClick={resetGame}>
          Reiniciar Jogo
        </button>
      </div>
      <div className="scoreboard">
        <h2>Placar</h2>
        <div className="score-item">
          <span className="neon-x">X</span>: {score.X}
        </div>
        <div className="score-item">
          <span className="neon-o">O</span>: {score.O}
        </div>
        <button className="reset-score" onClick={resetScore}>
          Resetar Placar
        </button>
      </div>
    </div>
  );
};

// Função para calcular o vencedor
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], // Linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonais
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Retorna 'X' ou 'O' como vencedor
    }
  }
  return null; // Nenhum vencedor
};

export default App;