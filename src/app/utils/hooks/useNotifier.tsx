import { useAppDispatch, useAppSelector } from './useRedux';
import { SnackbarKey, useSnackbar } from 'notistack';
import { Button, Slide } from '@mui/material';
import { removeSnackBar, selectSnackBarState } from '../../slice/SnackBarSlice';
import React, { useEffect } from 'react';

let displayed: SnackbarKey[] = [];

export function useNotifier(): void {
    const dispatch = useAppDispatch();
    const snackBarState = useAppSelector(selectSnackBarState);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        function storeDisplayed(id: SnackbarKey): void {
            displayed = [...displayed, id];
        }

        function removeDisplayed(id: SnackbarKey): void {
            displayed = [...displayed.filter(key => id !== key)];
        }

        snackBarState
            .filter(({ key }) => !displayed.includes(key))
            .forEach(({ key, message, options: { variant, action } }) => {
                const getAction = (id: SnackbarKey) => {
                    if (action) return action;
                    if (variant === 'error') {
                        return <Button onClick={ () => closeSnackbar(id) }>
                            Dismiss
                        </Button>
                    }

                    return null;
                }

                enqueueSnackbar(
                    message,
                    {
                        key,
                        variant: variant,
                        TransitionComponent: Slide,
                        action: getAction,
                        persist: variant === 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        onExited: (event, snackKey) => {
                            dispatch(removeSnackBar(snackKey));
                            removeDisplayed(snackKey);
                        }
                    });

                storeDisplayed(key);
            });
    }, [closeSnackbar, dispatch, enqueueSnackbar, snackBarState]);
}
