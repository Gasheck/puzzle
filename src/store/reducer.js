import { shuffle } from 'lodash';
import {
  FIELD_WIDTH,
  GAPS_NUMBER,
  REFERENCE_SEQUENCE,
  PIECE_LABEL,
  GAP_LABEL,
  POSITION_CHANGE_ACTION,
} from '../constants';

const getCoords = index => ({
  row: Math.floor(index / FIELD_WIDTH),
  column: index % FIELD_WIDTH,
});

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
