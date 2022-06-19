import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { MyLists } from './MyLists';
import { NewList } from './NewList';

export function ListRoute({ location: { pathname }, match: { path } }: RouteComponentProps): ReactElement {
    return (
        <Switch>
            <Route
                path={ `${ path }` }
                component={ MyLists }
            />
            <Route exact
                   path={ `${ path }/new` }
                   component={ NewList }
            />
        </Switch>
    );
}
