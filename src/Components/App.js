import React, {Component} from "react";
import "../Styles/App.css";
import Input from "./Input";
import MessageView from "./MessageView";
import {getAnswers} from "../API/qa";

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      data: [],
      height: null,
    };
  }

  componentDidMount() {
    this.setState({height: window.innerHeight});
    window.addEventListener("resize", () =>
      this.setState({height: window.innerHeight})
    );
  }

  render() {
    const {query, data, height} = this.state;
    return (
      <div>
        <div className="App" style={{height}}>
          <h1 className={"header"}>Q.A.L.D.</h1>
          <Input query={query} addQuery={this.addQuery}/>
          <MessageView data={data}/>
        </div>
    
        <div className="intro">
          <h1>Question Answering over Linked Data</h1>
          <p className={"subTitle"}> KMST PROJECT</p>
      
          <p className="members">
            Rishit Sinha (15NA30019) <span>|</span> Sayan Sinha (16CS10048){" "}
            <span>|</span> Himanshu Mundhra (16CS10057) <span>|</span> Swastika
            Dutta (16CS10060) <span>|</span> Sarthak Chakraborty (16CS30044)
          </p>
    
        </div>
      </div>
    );
  }

  addQuery = async query => {
    console.log(query);
    this.setState(
      {
        data: [
          ...this.state.data,
          {
            query
          }
        ]
      },
      async () => {
        const {data} = this.state;
        const index = this.state.data.length;
        const answer = await getAnswers(query);
        if (answer) {
          data.splice(index + 1, 0, {
            query,
            answer: {
              type: answer.type,
              data: {
                value: answer.value,
                link: answer.link
              }
            }
          });
          this.setState({data});
        } else {
          data.splice(index + 1, 0, {
            query,
            answer: {
              type: `value`,
              data: {
                value: `Sorry, can't find the answer to: "${query}"`
              }
            }
          });
          console.log({...data});
          this.setState({data}, () =>
            this.setState({height: window.innerHeight})
          );
        }
      }
    );
  };
}

export default App;
