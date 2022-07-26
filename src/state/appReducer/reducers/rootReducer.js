import {combineReducers} from 'redux'

import {modeReducer} from "./modeReducer";
import {modalReducer} from "./modalReducer";
import {accessReducer} from "./accessReducer";

export const rootReducer = combineReducers({
    modeReducer,
    modalReducer,
    accessReducer,
});
