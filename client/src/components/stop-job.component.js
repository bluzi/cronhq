import React, { Component } from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Footer from './footer.component';

export default class StopJobPage extends Component {
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
        Enter a URL to stop its cron job. After you press stop we will no longer send any requests until you'll recreate the job.
        `;

        return (
            <main>
                <h2>Stop a Job</h2>
                <div class="controllers">
                    <div class="text">Enter URL to stop job for</div>
                    
                    <Tooltip title={urlTooltipText} animation="perspective" position="bottom" open={this.state.focusedElement === 'url'}>
                        <input 
                            type="text" 
                            spellcheck="false"
                            placeholder="https://www.example.com"
                            onFocus={() => this.setFocusedElement('url')} 
                            onBlur={() => this.setFocusedElement()} 
                            ref={(element) => { this.autoFocusElement = element; }} />
                    </Tooltip>

                    <button>Stop</button>
                </div>

                <Footer />
            </main>
        );
    }
}