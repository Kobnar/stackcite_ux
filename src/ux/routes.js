import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import * as home from './home'
import * as sources from './sources'
import * as people from './people'
import * as organizations from './organizations'
import * as login from './login'
import * as signup from './signup'
import * as account from './account'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={home.Home}/>

        <Route path="sources(/:id)" component={sources.Sources}/>
        <Route path="people(/:id)" component={people.People}/>
        <Route path="organizations(/:id)" component={organizations.Organizations}/>

        <Route path="login" component={login.Login}/>
        <Route path="signup" component={signup.Signup}/>

        <Route path="account" component={account.Account}/>
    </Route>
)