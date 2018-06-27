import React, { Component } from 'react';

export default class AboutPage extends Component {
    render() {
        return (
            <main>
                <h1>Hello</h1>
                <div class="bigtext">
                    <p>
                        My name is Eliran Pe'er, I am a web developer. <br />
                        I made CronHQ for the community, out of my own pure need. <br />
                        I couldn't stand the fact that I had to raise an AWS machine in order to ensure 100% uptime to my crons, just to run something every one in a while.
                    </p>

                    <p>
                        Feel free to reach out to me if you have any questions, I'm available via email (<a href="mailto:eliran013@gmail.com">eliran013@gmail.com</a>), or via the website's chat box.
                    </p>

                    <p>
                        Also, this project is open source, so you can view the source code on GitHub by pressing the icon in the top navigation bar.
                    </p>
                </div>
            </main>
        );
    }
}