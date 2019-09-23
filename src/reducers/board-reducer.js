import { SET_TILE } from '../constants/constants';

const defaultState = {
	board: [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ],
	count: 0,
	winner: 0
};

export const boardReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_TILE:
            const { i, j } = payload;
            const tempBoard = [ ...state.board ];
            let tempCount = state.count
			if (state.count < 9 && state.winner === 0 && state.board[i][j] === 0) {
                tempBoard[i][j] = state.count % 2 === 0 ? 1 : -1;
                tempCount +=1;
				//   const winner = this.scoreBoard(tempBoard);
			}
			return {
				...state,
				board: tempBoard,
				count: tempCount
			};
		default:
			return state;
	}
};
