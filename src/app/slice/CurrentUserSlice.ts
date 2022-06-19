import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '../utils/types/HelperTyps';
import { AuthService } from '../service/AuthService';
import { RootState } from '../config/Store';
import { addSnackBarError } from './SnackBarSlice';
import { isServerErrorResponse } from '../utils/helpers/TypeGuards';

export type RequestStatus = 'idle' | 'loading' | 'failed' | 'successes';

export type CurrentUserState = Nullable<{
    status: RequestStatus;
    email: Nullable<string>;
    name: Nullable<string>;
    locale: Nullable<string>;
    token: {
        encodedToken: Nullable<string>;
        encodedRefreshToken: Nullable<string>;
        issuedAt: Nullable<string>;
        expirationTime: Nullable<string>;
    }
}>

const initialState: CurrentUserState = {
    status: 'idle',
    email: null,
    name: null,
    locale: null,
    token: {
        encodedToken: null,
        encodedRefreshToken: null,
        expirationTime: null,
        issuedAt: null,
    },
};

export const addNewUserThunk = createAsyncThunk(
    'current-user/addNewUser',
    async (authCode: string, { dispatch }) => {
        try {
            return await AuthService.registerUser(authCode);
        } catch (e) {
            if (isServerErrorResponse(e)) {
                console.warn('Server returned an error: ', e);
                dispatch(addSnackBarError({ message: e.userMsg }))
            } else {
                console.error('Error while registering user. ', e);
                dispatch(addSnackBarError({ message: 'Sorry, something went wrong' }))
            }
            return Promise.reject(e);
        }
    }
);

export const currentUserSlice = createSlice({
    name: 'current-user',
    initialState,
    reducers: {
        setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
            state.status = payload;
        }
    },
    extraReducers: (builder) => builder
        .addCase(addNewUserThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addNewUserThunk.fulfilled, (state, { payload }) => {
            return {
                status: 'successes',
                email: payload.email,
                name: payload.name,
                locale: payload.locale,
                token: {
                    encodedToken: payload.encodedToken,
                    encodedRefreshToken: payload.encodedRefreshToken,
                    issuedAt: new Date(payload.iat * 1000).toISOString(),
                    expirationTime: new Date(payload.exp * 1000).toISOString()
                }
            }
        })
        .addCase(addNewUserThunk.rejected, (state) => {
            state.status = 'failed';
        })
})

export const { setStatus } = currentUserSlice.actions;
export default currentUserSlice.reducer
export const selectStatus = (state: RootState) => state.currentUser.status;
