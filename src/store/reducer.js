import { shuffle } from 'lodash';
import {
  FIELD_WIDTH,
  GAPS_NUMBER,
  REFERENCE_SEQUENCE,
  PIECE_LABEL,
  GAP_LABEL,
  POSITION_CHANGE_ACTION,
} from '../constants';

/**
 * Each element has coordinates within the matrix
 * @param {number} index
 * @returns {object}
 */
const getCoords = index => ({
  row: Math.floor(index / FIELD_WIDTH),
  column: index % FIELD_WIDTH,
});

/**
 * Getting a state used at the initial stage
 * @returns {array}
 */
const getInitialSequence = () =>
  shuffle(REFERENCE_SEQUENCE).map((item, index) => {
    const commonData = {
      type: PIECE_LABEL,
      id: item,
      sourceCoords: { ...getCoords(item) },
      coords: { ...getCoords(index) },
    };

    if (item + 1 > REFERENCE_SEQUENCE.length - GAPS_NUMBER) {
      commonData.type = GAP_LABEL;
    }

    return commonData;
});

/**
 * The main reducer
 * @param {array} state
 * @param {object} action
 * @returns {object}
 */
const reducer = (state = getInitialSequence(), action) => {
  const newState = [...state];

  if (action.type === POSITION_CHANGE_ACTION) {
    const { piece, gap } = action.payload;
    const pieceIndex = newState.indexOf(piece);
    const gapIndex = newState.indexOf(gap);

    newState[gapIndex] = {
      ...gap,
      coords: { ...piece.coords },
    };

    newState[pieceIndex] = {
      ...piece,
      coords: { ...gap.coords },
    };
  }

  return newState;
};

export default reducer;
