import {types} from '../types/types';

const initialState = {
    modal: false,
    accountModal: false,
    withdrawModal: false,
    depositModal: false,

};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MODAL_DATA:
            return {
                ...state,
                modal: action.payload,
            };
        case types.SET_ACCOUNT_MODAL_DATA:
            return {
                ...state,
                accountModal: action.payload,
            };
        case types.SET_WITHDRAW_MODAL_DATA:
            return {
                ...state,
                withdrawModal: action.payload,
            };
        case types.SET_DEPOSIT_MODAL_DATA:
            return {
                ...state,
                depositModal: action.payload,
            };
        default:
            return state;
    }
}
