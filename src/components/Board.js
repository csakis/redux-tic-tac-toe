import React, { Component } from "react";
import Tile from "./Tile";
import Status from "./Status";
import { Columns } from "react-bulma-components";

class Board extends Component {
  state = {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    count: 0,
    winner: 0
  };

  setTile = (i, j) => {
    if (
      this.state.count < 9 &&
      this.state.winner === 0 &&
      this.state.board[i][j] === 0
    ) {
      this.setState((state, props) => {
        const tempBoard = [...state.board];
        tempBoard[i][j] = state.count % 2 === 0 ? 1 : -1;
        const winner = this.scoreBoard(tempBoard);

        return { board: tempBoard, count: state.count + 1, winner: winner };
      });
    }
  };

  scoreBoard = b => {
    let winner = 0;
    [...Array(3).keys()].map(i => {
      let res1, res2, res3, res4;
      res1 = b[i][0] + b[i][1] + b[i][2];
      res2 = b[0][i] + b[1][i] + b[2][i];
      if (i === 0) {
        res3 = b[0][0] + b[1][1] + b[2][2];
        res4 = b[0][2] + b[1][1] + b[2][0];
      }
      if (res1 === 3 || res2 === 3 || res3 === 3 || res4 === 3) {
        winner = 1;
      }
      if (res1 === -3 || res2 === -3 || res3 === -3 || res4 === -3) {
        winner = -1;
      }
    });
    return winner;
  };

  resetGame = () => {
    this.setState((state, props) => {
      const tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      return { board: tempBoard, count: 0, winner: 0 };
    });
  };
  render() {
    let board = [...Array(3).keys()].map(i => {
      const row = [...Array(3).keys()].map(j => {
        return (
          <Columns.Column size="one-third" key={j}>
            <Tile
              position = {{i, j}}
            />
          </Columns.Column>
        );
      });
      return <Columns key={i}>{row}</Columns>;
    });
    return (
      <div>
        {board}
        <Columns>
          <Status
            count={this.state.count}
            winner={this.state.winner}
            resetGame={() => {
              this.resetGame();
            }}
          />
        </Columns>
      </div>
    );
  }
}

export default Board;
