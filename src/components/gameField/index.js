import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { find, isEqual } from 'lodash';
import Piece from '../piece';
import {
  PIECE_WIDTH,
  PIECE_HEIGHT,
  REFERENCE_SEQUENCE,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  GAP_LABEL,
  POSITION_CHANGE_ACTION,
} from '../../constants';

const GameField = ({ sequence, onPiecePositionChange, className }) => {
  const isGameOver = () => {
    return isEqual(sequence.map(item => item.id), REFERENCE_SEQUENCE);
  };

  const getSurroundings = (sequence, coords) => {
    const { row, column } = coords;

    return [
      find(sequence, { coords: { row, column: column + 1 } }),
      find(sequence, { coords: { row, column: column - 1 } }),
      find(sequence, { coords: { row: row + 1, column } }),
      find(sequence, { coords: { row: row - 1, column } }),
    ];
  };

  const handleClick = id => {
    const piece = find(sequence, { id });
    const gap = find(getSurroundings(sequence, piece.coords), { type: GAP_LABEL} );

    // If there is no gap around the cell which has been clicked, do nothing
    if (!gap) {
      return;
    }

    onPiecePositionChange(piece, gap);
  };

  return (
    <Fragment>
      <div className={className} >
        {sequence.map(
          cell =>
            cell.type !== GAP_LABEL && (
              <Piece
                {...cell}
                top={PIECE_HEIGHT * cell.coords.row}
                left={PIECE_WIDTH * cell.coords.column}
                width={PIECE_WIDTH}
                height={PIECE_HEIGHT}
                key={`cell-${cell.id}`}
                onClick={handleClick}
              />
            ),
        )}
      </div>
      {isGameOver() && (
        <div className="congratulations">{'Congratulations!'}</div>
      )}
    </Fragment>
  );
};

GameField.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onPiecePositionChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

GameField.defaultProps = {
  className: '',
};

const mapStateToProps = state => {
  return {
    sequence: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPiecePositionChange: (piece, gap) =>
      dispatch({ type: POSITION_CHANGE_ACTION, payload: { piece, gap } }),
  };
};

const styledGameField = styled(GameField)`
  position: relative;
  background: #333;
  width: ${FIELD_WIDTH * PIECE_WIDTH}px;
  height: ${FIELD_HEIGHT * PIECE_HEIGHT}px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledGameField);
