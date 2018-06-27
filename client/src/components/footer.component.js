import React, { Component } from 'react';
import Ionicon from 'react-ionicons'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                Made with
                <Ionicon icon="md-heart" color="#9b4dca" /> By
                <a href="https://www.github.com/bluzi" rel="noopener noreferrer" target="_blank">@bluzi</a>
            </footer>
        );
    }
}