import React, {ReactElement} from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {MyLists} from "./MyLists";
import {NewList} from "./NewList";

export function ListRoute({ location: { pathname }, match: { path }}: RouteComponentProps): ReactElement {
    const canRedirectToMyList =
        pathname === path ||
        pathname === `${path}/`;

    return (
        <Switch>
            {
                canRedirectToMyList && (<Redirect to={`${path}/my`} from={path} />)
            }
            <Route
                   path={`${path}/my`}
                   component={MyLists}
            />
            <Route exact
                   path={`${path}/new`}
                   component={NewList}
           />
        </Switch>
    );
}