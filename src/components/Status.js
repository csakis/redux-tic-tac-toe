import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions/reset-game';
import { Notification, Button } from 'react-bulma-components';

const Status = (props) => {
	let message = <Notification>Hello</Notification>;

	const count = props.count;
	const winner = props.winner;
	if (winner === 1) {
		message = (
			<Notification color="danger">
				<i className="far fa-circle" /> won the game!!{' '}
				<div>
					<Button fullwidth color="warning" onClick={props.onResetGame}>
						Reset game!
					</Button>
				</div>
			</Notification>
		);
	} else if (winner === -1) {
		message = (
			<Notification color="success">
				<i className="far fa-times" /> won the game!!{' '}
				<div>
					<Button fullwidth color="warning" onClick={props.onResetGame}>
						Reset game!
					</Button>
				</div>
			</Notification>
		);
	} else if (count >= 9) {
		message = (
			<Notification color="info">
				It's a tie!{' '}
				<div>
					<Button fullwidth color="warning" onClick={props.onResetGame}>
						Reset game!
					</Button>
				</div>
			</Notification>
		);
	} else if (count % 2 === 0) {
		message = (
			<Notification color="danger">
				<i className="far fa-circle" />
				's turn.
			</Notification>
		);
	} else if (count % 2 === 1) {
		message = (
			<Notification color="success">
				<i className="far fa-times" />
				's turn.
			</Notification>
		);
	}
	return <div className="column">{message}</div>;
};
const mapStateToProps = (state) => {
	return {
		board: state.board.board,
		winner: state.board.winner,
		count: state.board.count
	};
};

const mapActionsToProps = (dispatch) => {
	return {
		onResetGame: () => {
			dispatch(resetGame());
		}
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Status);
