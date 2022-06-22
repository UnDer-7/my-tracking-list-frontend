import React, { ReactElement, useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Header } from '../../utils/components/Header';
import { Box } from '@mui/material';
import { AccountDetail } from './account/AccountDetail';
import { ListRoute } from './list/ListRoute';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { getUserThunk, selectStatus } from '../../slice/CurrentUserSlice';
import { BlockUI } from '../../utils/components/BlockUI';

export const DASHBOARD_PREFIX_PATH = '/dashboard';
export const DASHBOARD_LISTS_PATH = `${ DASHBOARD_PREFIX_PATH }/lists`;
export const DASHBOARD_ACCOUNT_DETAIL_PATH = `${ DASHBOARD_PREFIX_PATH }/account-detail`;

export function DashboardRoutes({ location: { pathname }, match: { path } }: RouteComponentProps): ReactElement {
    const dispatch = useAppDispatch();
    const requestStatus = useAppSelector(selectStatus);
    const canBlockUI = requestStatus === 'loading';

    const canRedirectToListRoutes =
        pathname === path ||
        pathname === `${ path }/`;

    useEffect(() => {
        dispatch(getUserThunk())
    }, [dispatch]);

    return (
        <BlockUI active={ canBlockUI }>
            <Box sx={ { display: 'flex' } }>
                <Header/>
                <Box component="main" sx={ { flexGrow: 1, p: 3 } }>
                    {/*<DrawerHeader />*/ }
                    <Switch>
                        {
                            canRedirectToListRoutes && (<Redirect to={ DASHBOARD_LISTS_PATH } from={ path }/>)
                        }
                        <Route path={ DASHBOARD_LISTS_PATH }
                               component={ ListRoute }
                        />
                        <Route path={ DASHBOARD_ACCOUNT_DETAIL_PATH }
                               component={ AccountDetail }
                        />
                    </Switch>
                </Box>
            </Box>
        </BlockUI>
    );
}
