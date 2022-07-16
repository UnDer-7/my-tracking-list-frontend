import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { MyLists } from './MyLists';
import { NewList } from './newlist/NewList';

export function ListRoute({ location: { pathname }, match: { path } }: RouteComponentProps): ReactElement {
    return (
        <Switch>
            <Route exact
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
