import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import * as home from './home'
import * as auth from './auth'
import * as account from './account'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={home.Home}/>

        <Route path="/login" component={auth.Login}/>
        <Route path="/signup" component={auth.Signup}/>

        <Route path="/account" component={account.Account}/>
    </Route>
);