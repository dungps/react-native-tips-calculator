import {
    PERCENT_CHANGED,
    AMOUNT_CHANGED,
    NO_OF_PEOPLE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    percent: 0,
    NoOfPeople: 1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AMOUNT_CHANGED:
            return { ...state, amount: action.payload };
        case PERCENT_CHANGED:
            return { ...state, percent: action.payload };
        case NO_OF_PEOPLE_CHANGED:
            return { ...state, NoOfPeople: action.payload };
        default:
            return state;
    }
};
