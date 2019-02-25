// The units are pixels
export const PIECE_WIDTH = 80;
export const PIECE_HEIGHT = 80;

// The units are cells
export const FIELD_WIDTH = 4;
export const FIELD_HEIGHT = 4;

export const REFERENCE_SEQUENCE = [...Array(FIELD_WIDTH * FIELD_HEIGHT).keys()];

// Identifier of a label
export const PIECE_LABEL = 'piece';

// Identifier of a gap
export const GAP_LABEL = 'gap';

export const POSITION_CHANGE_ACTION = 'PIECE_POSITION_CHANGE';

// Only one gap is available for this game
export const GAPS_NUMBER = 1;
