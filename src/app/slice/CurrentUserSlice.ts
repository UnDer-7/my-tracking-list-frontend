import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '../utils/types/HelperTyps';
import { RootState } from '../config/Store';
import { addSnackBarError } from './SnackBarSlice';
import { isServerErrorResponse } from '../utils/helpers/TypeGuards';
import { UserService } from '../service/UserService';

export type RequestStatus = 'idle' | 'loading' | 'failed' | 'successes';

export type CurrentUserState = {
    status: RequestStatus;
    id: Nullable<string>
    email: Nullable<string>;
    name: Nullable<string>;
    locale: Nullable<string>;
}

export const getUserThunk = createAsyncThunk(
    'current-user/getUser',
    async (_, { dispatch }) => {
        try {
            return await UserService.getUser();
        } catch (e) {
            if (isServerErrorResponse(e)) {
                console.warn('Server returned an error. ', e);
                dispatch(addSnackBarError({ message: e.userMsg }))
            } else {
                console.error('Error while getting user. ', e);
                dispatch(addSnackBarError({ message: 'Sorry, something went wrong' }))
            }
            return Promise.reject(e);
        }
    }
);

const initialState: CurrentUserState = {
    status: 'idle',
    id: null,
    email: null,
    name: null,
    locale: null,
};


export const currentUserSlice = createSlice({
    name: 'current-user',
    initialState,
    reducers: {
        setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload;
        }
    },
    extraReducers: (builder) => builder
        .addCase(getUserThunk.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getUserThunk.fulfilled, (state, { payload }) => {
            return {
                status: 'successes',
                id: payload.id,
                email: payload.email,
                name: payload.name,
                locale: payload.locale,
            }
        })
        .addCase(getUserThunk.rejected, (state) => {
            state.status = 'failed';
        })
})

export const { setStatus } = currentUserSlice.actions;
export default currentUserSlice.reducer
export const selectStatus = (state: RootState) => state.currentUser.status;
