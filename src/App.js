import React, {Component} from 'react';
import './App.css';
import Input from "./Input";
import MessageView from "./MessageView";


class App extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            data: [
                {
                    query: 'Which is the fastest car in the world? ',
                },
                {
                    query: 'Which is the fastest car in the world? ',
                    answer: {
                        type: 'value',
                        data: {
                            value: 'Koenigsegg Agera RS',
                            link: 'http://example.org/',
                        }
                    }
                },
                {
                    query: 'How many seasons are there in Two and a Half Men?',
                },
                {
                    query: 'How many seasons are there in Two and a Half Men?',
                    answer: {
                        type: 'value',
                        data: {
                            value: 13,
                        }
                    }
                },
                {
                    query: 'Does the Earth go around the Sun?',
                },
                {
                    query: 'Does the Earth go around the Sun?',
                    answer: {
                        type: 'bool',
                        data: true,
                    }
                },
                {
                    query: 'Who won Olympic medals for India in 2016?',
                },
                {
                    query: 'Who won Olympic medals for India in 2016?',
                    answer: {
                        type: 'list',
                        data: [
                            {
                                value: 'P.V. Sindhu',
                                link: 'http://example.org/',
                            },
                            {
                                value: 'Sakshi Malik',
                                link: 'http://example.org/',
                            },
                        ],
                    }
                },
            ],
            height: null,
        }
    }

    componentDidMount() {
        this.setState({height: window.innerHeight});
        window.addEventListener("resize", () => this.setState({height: window.innerHeight}));
    }


    render() {
        const {query, data, height} = this.state;
        return (
            <div className="App" style={{height}}>
                <h1 className={'header'}>Q.A.L.D.</h1>
                <Input query={query} addQuery={this.addQuery}/>
                <MessageView data={data}/>
            </div>
        );
    }

    addQuery = query => {
        //API call;
        console.log(query);
        this.setState({
            data: [
                ...this.state.data,
                {
                    query,
                }
            ]
        })
    }
}

export default App;
