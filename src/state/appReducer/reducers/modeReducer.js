import {types} from '../types/types';

const initialState = {
    mode: localStorage.getItem('mode') || 'dark'
};

export const modeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MODE_DATA:
            return {
                ...state,
                mode: action.payload,
            };
        default:
            return state;
    }
}
