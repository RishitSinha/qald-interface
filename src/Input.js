import React, {Component} from 'react';
import icons from './icons';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            recognition: null,
            query: '',
            listening: false,
        }
    }

    componentDidMount() {
        this.setupVoiceInput();
    }


    render() {
        const {query, listening} = this.state;
        return (
            <div className={'inputWrapper'}>
                <button onClick={() => this.startVoiceInput()} className={listening ? 'listening' : ''}>
                    <img src={icons.mic} alt="Mic Icon"/>
                </button>
                <form onSubmit={e => {
                    e.preventDefault();
                    this.addQuery(query)
                }}>
                    <input
                        type="text"
                        ref={'inputBox'}
                        value={query}
                        placeholder={listening ? 'Listening...' : 'Your query?'}
                        onChange={e => this.setState({query: e.target.value})}/>
                </form>
                <button onClick={() => this.addQuery(query)}>
                    <img src={icons.send} alt="Send Message"/>
                </button>
            </div>
        )
    }

    addQuery = query => {
        this.setState({query: ''});
        this.props.addQuery(query);
    };

    startVoiceInput = () => {
        const {recognition, listening} = this.state;
        if (!recognition || listening)
            return;
        this.setState({listening: true, query: ''});
        recognition.start();
    };

    setupVoiceInput = () => {
        const sr = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (sr) {
            const recognition = new sr();
            this.setState({recognition}, () => {
                recognition.onresult = event => {
                    const speechToText = event.results[0][0].transcript;
                    this.setState({query: speechToText});
                    this.refs.inputBox.focus();
                };
                recognition.onspeechend = event => this.setState({listening: false});
                recognition.onerror = event => this.setState({listening: false});
                this.startVoiceInput();
            });
        }
        else {
            this.setState({
                error: `Speech Recognition is not available.`
            })
        }
    }
}
