import { AsyncStorage } from 'react-native';

import {
    SETTING_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    transition: 'PushFromRight',
    position: 'before',
    currency: 'USD',
    percentage: ['12', '15', '50']
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETTING_CHANGED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
