import React from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      // Included to support initial direction. Please remove upon completion    
    })
  }

 
  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const messages = this.state.messages
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >     
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>

        <div>
        <p>{JSON.stringify(messages)}</p>
        {
            messages.map(message=>{
              return <div>
                { 
                message.priority===1?
                <div style={{textAlign: 'left'}}>
                    <p>{message.message}</p>
                   <p>{message.priority}</p>
                </div> 
                 :
                 message.priority===2?
                 <div style={{textAlign: 'center'}}>
                      <p>{message.message}</p>
                    <p>{message.priority}</p>
                  </div> :
                   <div style={{textAlign: 'right'}}>
                      <p>{message.message}</p>
                      <p>{message.priority}</p>
                   </div>
              }
                </div>
             
             
            }
              
            )
        }
           
        </div>
      </div>
    )
  }
}

export default MessageList
