import React, { Component } from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Footer from './footer.component';

export default class StartJobPage extends Component {
    state = {
        focusedElement: undefined,
    }

    setFocusedElement(element) {
        this.setState({ focusedElement: element });
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
                <div class="controllers">
                    <div class="text">Send a POST request to</div>
                    
                    <Tooltip title={urlTooltipText} animation="perspective" position="bottom" open={this.state.focusedElement === 'url'}>
                        <input 
                            type="text" 
                            placeholder="https://www.example.com" 
                            spellcheck="false"
                            onFocus={() => this.setFocusedElement('url')} 
                            onBlur={() => this.setFocusedElement()}
                            ref={(element) => { this.autoFocusElement = element; }} />
                    </Tooltip>
                    
                    <div class="text">Every</div>

                    <Tooltip title={intervalTooltipText} animation="perspective" position="bottom" open={this.state.focusedElement === 'interval'}>
                        <input 
                            class="small" 
                            type="text" 
                            placeholder="5 hours" 
                            spellcheck="false"
                            onFocus={() => this.setFocusedElement('interval')} 
                            onBlur={() => this.setFocusedElement()} />
                    </Tooltip>
                    <button>Start</button>
                </div>

                <Footer />
            </main>
        );
    }
}