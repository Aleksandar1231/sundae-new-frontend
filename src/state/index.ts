import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {load, save} from 'redux-localstorage-simple';
import transactions from './transactions/reducer';
import application from './application/reducer';
import {rootReducer} from './appReducer/reducers/rootReducer'


const PERSISTED_KEYS: string[] = ['transactions'];

const store = configureStore({
    reducer: {
        application,
        transactions,
        rootReducer,
    },

    middleware: [...getDefaultMiddleware({thunk: true}), save({states: PERSISTED_KEYS}),
    ],
    preloadedState: load({states: PERSISTED_KEYS}),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
