import { Component, OnInit } from '@angular/core';
import { SquareComponent } from '../../Components/square/square.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent, NgClass],
  templateUrl: './board.module.html',
  styleUrl: './board.module.scss',
})
export class BoardComponent implements OnInit {
  squares: any[] | undefined;
  xIsNext: boolean | undefined;
  winner: string | undefined;
  player1Count: number = 0;
  player2Count: number = 0;
  isDraw: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.isDraw = false;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.winner && !this.isDraw) {
      if (this.squares && !this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }

      this.winner = this.calculateWinner();
      if (this.winner == 'O') {
        this.player2Count++;
      } else if (this.winner == 'X') {
        this.player1Count++;
      } else if (this.squares && !this.squares.includes(null)) {
        this.isDraw = true;
      }
    }
  }

  calculateWinner() {
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

      if (
        this.squares &&
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }

    return '';
  }
}
