import React from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import './message-list.style.css'
class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      info :[],
      error:[],
      warning:[]
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

   getInfoMessage =()=>{
    const messages = this.state.messages
     return messages.filter(message=>(
      message.priority===3
      )
    )
}
getErrorMessage =()=>{
  const messages = this.state.messages
   return messages.filter(message=>(
    message.priority===1
    )
  )
}

getWarningMessage =()=>{
  const messages = this.state.messages
   return messages.filter(message=>(
    message.priority===2
    )
  )
}

clearMessage =()=>{
  this.setState({messages: []});
}

  render() {
    const isApiStarted = this.api.isStarted()
   // const messages = this.state.messages
   // const lastIndex = messages.length-1
    //const lastMessage = messages[lastIndex]
    const info = this.getInfoMessage()
    const error = this.getErrorMessage()
    const warning = this.getWarningMessage()
    //console.log(lastMessage)
    return (
      <div>
        <div>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >     
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>
       {/**  <p>{JSON.stringify(messages)}</p>*/}
         <button style={{textAlign:'center'}}   onClick={this.clearMessage}> Clear</button>
        
       </div>
        
        <div className='column left'>
          <div style={{textAlign:'center'}}>
            <p>Error type 1</p>
            <p>{error.length}</p>
          </div>
          
            {
              error.map(error=>(
                <div>
                  <div style={{backgroundColor:'#F56236', paddingTop:5}}>
                    {error.message}
                  </div>
                 <br></br>
                </div>
              ))
            }
        </div>
        <div className='column middle'>
        <div style={{textAlign:'center'}}>
          <p>Warning type 2</p>
          <p>{warning.length}</p>
          </div>
            {
              warning.map(warning=>(
                <div>
                  <div  style={{backgroundColor:'#FCE788', padding:5}}>
                  <p>{warning.message}</p>
                </div>
                <br></br>
                </div>
                
                
              ))
            }
        </div>
        <div className='column right'>
        <div style={{textAlign:'center'}}>
        <p>Info type 3</p>
        <p>{info.length}</p>
        </div>
            {
              info.map(info=>(
                <div>
                  <div  style={{backgroundColor:'#88FCA3', padding:5}}>
                  <p>{info.message}</p>
                </div>
                <br></br>
                </div>
                
                
              ))
            }
        </div>
      </div>
    )
  }
}

export default MessageList
