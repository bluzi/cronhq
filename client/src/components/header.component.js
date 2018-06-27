import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import Ionicon from 'react-ionicons'

export default class Header extends Component {
    render() {
        return (
            <header>
                <a href="/" class="logo">CronHQ.io</a>

                <div class="separator"></div>

                <nav>
                    <Link to="/">Home</Link>
                    <a href="https://www.jsonstore.io" class="underline" rel="noopener noreferrer" target="_blank">jsonstore.io</a>
                    <Link to="/terms">Terms of Use</Link>
                    <Link to="/about">About</Link>
                </nav>

                <Switch>
                    <Route path="/" exact component={() =>
                        <Link className="button" to="/stop-a-job">Stop a Job</Link>
                    } />
                    <Route component={() =>
                        <Link className="button" to="/">Start a Job</Link>
                    } />
                </Switch>


                <a href="https://github.com/bluzi/cronhq" rel="noopener noreferrer" target="_blank" class="github-link">
                    <Ionicon icon="logo-github" color="#666" fontSize="30px" />
                </a>
            </header>
        );
    }
}
