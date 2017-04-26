import { AsyncStorage } from 'react-native';
import {
    SETTING_CHANGED,
    PERCENT_CHANGED,
    AMOUNT_CHANGED,
    NO_OF_PEOPLE_CHANGED
} from './types';

export const amountChanged = (text) => {
    return {
        type: AMOUNT_CHANGED,
        payload: text + ""
    };
};

export const percentChanged = (key) => {
    return {
        type: PERCENT_CHANGED,
        payload: key + ""
    };
};

export const noOfPeopleChanged = (no) => {
    return {
        type: NO_OF_PEOPLE_CHANGED,
        payload: no + ""
    };
};

export const settingChanged = (settings) => {
    console.log(settings);

    return {
        type: SETTING_CHANGED,
        payload: settings
    };
};
