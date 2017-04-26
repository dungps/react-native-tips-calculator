import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import SettingReducer from './SettingReducer';

export default combineReducers({
    data: DataReducer,
    settings: SettingReducer
});
