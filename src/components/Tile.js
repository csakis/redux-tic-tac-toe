import React from 'react';
import { connect } from 'react-redux';
import { setTile } from '../actions/set-tile';
import { scoreBoard } from '../actions/score-board';
import { Card } from 'react-bulma-components';
import './Tile.css';
import '../../node_modules/@fortawesome/fontawesome-pro/css/all.css';

const Tile = (props) => {
	let icon = 'far fa-4x ';
	const value = props.board[props.i][props.j];
	switch (value) {
		case -1:
			icon += 'fa-times has-text-success';
			break;
		case 0:
			icon += 'fa-blank fa-stop';
			break;
		case 1:
			icon += 'fa-circle has-text-danger';
			break;
		default:
			icon += 'fa-blank fa-stop';
			break;
	}

	return (
		<Card onClick={() => props.onSetTile(props.i, props.j)}>
			<Card.Content className="has-text-centered">
				<span className={icon} />
			</Card.Content>
		</Card>
	);
};
const mapStateToProps = (state, ownProps) => {
	return {
		board: state.board.board,
		i: ownProps.position.i,
		j: ownProps.position.j
	};
};

const mapActionsToProps = (dispatch) => {
	return {
		onSetTile: (i, j) => {
			dispatch(setTile(i, j));
			dispatch(scoreBoard())
		}
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Tile);
