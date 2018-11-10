import React, {Component} from "react";

export default class MessageView extends Component {
  componentDidMount() {
    const MessageView = document.querySelector(".messageView");
    MessageView.scrollTop = MessageView.scrollHeight;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      setTimeout(() => {
        MessageView.scrollTop = MessageView.scrollHeight;
      });
    }
    return true;
  }

  render() {
    const {data} = this.props;
    return (
      <div className={"messageView"}>
        {data.map((message, index) => (
          <Message key={"Message" + index} message={message}/>
        ))}
      </div>
    );
  }
}

class Message extends Component {
  render() {
    return (
      <div
        className={
          !this.props.message.answer
            ? "messageElement"
            : "messageElement response"
        }
      >
        {this.parseAnswer(this.props.message)}
      </div>
    );
  }
  
  parseAnswer = message => {
    if (!message.answer) {
      return <p>{message.query}</p>;
    } else {
      switch (message.answer.type) {
        case "value": {
          return (
            <p onClick={() => window.open(message.answer.data.link)}>
              {typeof message.answer.data.value === "string"
                ? message.answer.data.value
                  .split("^^&lt;")[0]
                  .split(/\r\n|\r|\n/g)
                  .map(str => <p>{str}</p>)
                : message.answer.data.value}
            </p>
          );
        }
        case "bool": {
          return <p>{message.answer.data ? "Yes" : "No"}</p>;
        }
        case "list": {
          return message.answer.data.map((answer, index) => (
            <p
              onClick={() => window.open(answer.link)}
              key={"answer" + Math.random() + index}
            >
              {index + 1}. {answer.value}
            </p>
          ));
        }
        default: {
          return message.answer.data;
        }
      }
    }
  };
}
