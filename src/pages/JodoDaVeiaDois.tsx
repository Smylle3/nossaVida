import { useState } from 'react';
import './style.css';

const JogoDaVelha = () => {
	const [squares, setSquares] = useState<string[] | number[] | null[]>(
		Array(9).fill(null),
	);
	const [xIsNext, setXIsNext] = useState<boolean>(true);

	const handleClick = (index: number) => {
		if (calculateWinner(squares) || squares[index]) {
			return;
		}

		const newSquares = squares.slice();
		newSquares[index] = xIsNext ? 'X' : 'O';
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};

	const restartGame = () => {
		setSquares(Array(9).fill(null));
		setXIsNext(true);
	};

	const renderSquare = (index: number) => {
		return (
			<button className="square" onClick={() => handleClick(index)}>
				{squares[index]}
			</button>
		);
	};

	const winner = calculateWinner(squares);

	const status = winner
		? `Vencedor: ${winner}`
		: `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

	return (
		<div className="game">
			<div className="status">{status}</div>
			<button className="restart-button" onClick={restartGame}>
				Reiniciar Jogo
			</button>
			<div className="game-board">
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
		</div>
	);
};

const calculateWinner = (squares: string[] | number[] | null[]) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			console.log(squares[a]);
			return squares[a];
		}
	}
	return null;
};

export default JogoDaVelha;
