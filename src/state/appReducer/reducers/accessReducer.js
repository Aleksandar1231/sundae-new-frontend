import {types} from '../types/types';

const initialState = {
    access: 0
};

export const accessReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ACCESS_DATA:
            return {
                ...state,
                access: action.payload,
            };
        default:
            return state;
    }
}
