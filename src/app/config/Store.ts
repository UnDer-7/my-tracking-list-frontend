import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from '../slice/CurrentUserSlice';
import snackBarReducer from '../slice/SnackBarSlice';

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        snackBar: snackBarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
