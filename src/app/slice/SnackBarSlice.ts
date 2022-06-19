import { SnackbarKey, VariantType } from 'notistack';
import { BiConsumer, IFunction } from '../utils/types/HelperTyps';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config/Store';

export type SnackBarPayloadAction = PayloadAction<Pick<SnackBarState[0], 'message' | 'key'> & Pick<SnackBarState[0]['options'], 'action'>>

export type SnackBarState = Array<{
    key: string
    message: string;
    options: {
        variant: VariantType,
        action?: IFunction<SnackbarKey, Element>
    }
}>;

function setState(variant: VariantType): BiConsumer<SnackBarState, SnackBarPayloadAction> {
    return (state, { payload }) => {
        state.push({
            key: payload.key,
            message: payload.message,
            options: {
                variant,
                action: payload.action,
            }
        })
    }
}

function prepareToSetKey(options: Pick<SnackBarPayloadAction['payload'], 'message' | 'action'>): Pick<SnackBarPayloadAction, 'payload'> {
    return {
        payload: {
            key: nanoid(),
            message: options.message,
            action: options.action,
        }
    }
}

const initialState: SnackBarState = [];

export const snackBarSlice = createSlice({
    name: 'snack-bar',
    initialState,
    reducers: {
        addSnackBarSuccess: {
            reducer: setState('success'),
            prepare: prepareToSetKey,
        },
        addSnackBarInfo: {
            reducer: setState('info'),
            prepare: prepareToSetKey,
        },
        addSnackBarWarning: {
            reducer: setState('warning'),
            prepare: prepareToSetKey,
        },
        addSnackBarError: {
            reducer: setState('error'),
            prepare: prepareToSetKey,
        },
        addSnackBarDefault: {
            reducer: setState('default'),
            prepare: prepareToSetKey,
        },
        removeSnackBar: (state, { payload }: PayloadAction<SnackbarKey>) => {
            return state.filter(snackBar => snackBar.key !== payload);
        }
    },
});

export const {
    addSnackBarSuccess,
    addSnackBarInfo,
    addSnackBarWarning,
    addSnackBarError,
    addSnackBarDefault,
    removeSnackBar
} = snackBarSlice.actions;
export default snackBarSlice.reducer;
export const selectSnackBarState = (state: RootState) => state.snackBar;
