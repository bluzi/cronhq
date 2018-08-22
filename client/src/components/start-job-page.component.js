import React, { Component } from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Footer from './footer.component';
import config from './../config';

export default class StartJobPage extends Component {
    state = {
        focusedElement: undefined,
        interval: '',
        url: '',
        result: undefined
    }

    setFocusedElement(element) {
        this.setState({ focusedElement: element });
    }

    handleUrlChange(event) {
        this.setState({ url: event.target.value });
    }

    handleIntervalChange(event) {
        if (/^\d*$/.test(event.target.value)) {
            this.setState({ interval: event.target.value });
        }
    }

    handleStartClick() {
        this.setState({ result: undefined }, async () => {
            if (!this.state.url || !this.state.interval || isNaN(parseInt(this.state.interval, 10))) {
                console.log(this.state.url, this.state.interval)
                return;
            }

            const job = {
                interval: this.state.interval,
                url: this.state.url,
            };

            try {
                const response = await fetch(config.api, {
                    method: 'post',
                    body: JSON.stringify(job),
                    headers: {
                        'content-type': 'application/json'
                      },
                });

                if (response.ok) {
                    this.setState({
                        url: '',
                        interval: '',
                        result: 'success'
                    });
                } else {
                    this.setState({
                        result: 'fail'
                    });
                }
            } catch (error) {
                this.setState({
                    result: 'fail'
                });
            }
        });
    }

    componentDidMount() {
        if (this.autoFocusElement) {
            this.autoFocusElement.focus();
        }
    }

    render() {
        const urlTooltipText = `
        We'll send a POST request to this interval everytime the interval passes.
        <br />
        Note that a URL can only have one job associated, so starting a new job for a URL will override its previous job.
        `;

        const intervalTooltipText = `
        Specify time in netural language (50 seconds, 10 minutes, 1 hour, 5 days, etc)
        <br />
        You can't sepcify time in miliseconds.
        `;

        return (
            <main>
                <h2>Start a Job</h2>
                <div className="controllers">
                    <div className="text">Send a POST request to</div>

                    <Tooltip title={urlTooltipText} animation="perspective" position="bottom" open={this.state.focusedElement === 'url'}>
                        <input
                            type="text"
                            value={this.state.url}
                            onChange={e => this.setState({ url: e.target.value })}
                            placeholder="https://www.example.com"
                            spellCheck="false"
                            onFocus={this.handleUrlChange.bind(this)}
                            onBlur={() => this.setFocusedElement()}
                            ref={(element) => { this.autoFocusElement = element; }} />
                    </Tooltip>

                    <div className="text">Every</div>

                    <Tooltip title={intervalTooltipText} animation="perspective" position="bottom" open={this.state.focusedElement === 'interval'}>
                        <input
                            type="number"
                            value={this.state.interval}
                            onChange={this.handleIntervalChange.bind(this)}
                            placeholder="5 hours"
                            className="small"
                            spellCheck="false"
                            onFocus={() => this.setFocusedElement('interval')}
                            onBlur={() => this.setFocusedElement()} />
                    </Tooltip>

                    <button onClick={this.handleStartClick.bind(this)}>Start</button>
                </div>

                {this.state.result === 'success' && <div className="result-bar success">
                    Job created successfully
                </div>}

                {this.state.result === 'fail' && <div className="result-bar error">
                    Service is unavailable
                </div>}

                <Footer />
            </main>
        );
    }
}