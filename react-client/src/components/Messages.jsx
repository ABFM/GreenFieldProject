import React from 'react';
import axios from 'axios';
import JobsForUser from './jobsForUser.jsx';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      items: [],
      messages: [],
      message: '',
      sent: '',
      me: '',
      visible: true
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }


  componentDidMount() {
    let that = this
    axios.get('/getMessages')
    .then(response => {
    const posts = response.data;
    console.log('my name is jackel', posts);
    that.setState({items:posts});

  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/me')
  .then(response => {
    const me = response.data
    that.setState({me: me})
  })
  .catch((error) =>{
    console.log(error);
  })

};

  onClick(e) {
    let that = this;
    this.setState({visible: !this.state.visible})
    axios.post('/getMessages', {
      client: e.target.innerText
    })
    .then(response => {
      that.setState({
        messages: response.data
      })
      console.log(this.state.messages);
    })
    .catch(function (error) {
      console.log(error);
 });


  }
  onChange(e) {
        var message = e.target.value
        console.log(message);
        this.setState({
          message: e.target.value
        });
        console.log(this.state);
  	};


  	handleSubmit(event) {
  		var that=this;
  		event.preventDefault();
  		axios.post('/sendMessage', this.state)
    			.then(function (response) {
    				that.setState({sent:"message sent"});

    			})
    			.catch(function (error) {

      		console.log(error);
    			});
  		};





render() {
  let arr = this.state.items
  let un = [];

  var uniqueArray = function(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });
};

for (var i = 0; i < arr.length; i++) {
  if (arr[i].sender !== this.state.me)
  un.push(arr[i].sender)
}
for (var i = 0; i < arr.length; i++) {
  if (arr[i].reciver !== this.state.me){
    un.push(arr[i].reciver)
  }
}

var newArr = uniqueArray(un)

var temp = []
var messages = this.state.messages;
for (var i = 0; i < messages.length; i++) {
  if (temp.indexOf(messages[i].message) === -1){
    temp.push(messages[i].message)
  }
}

var unMessages = uniqueArray(temp)

  return(
    <div>
      <Row>
<Col md={3}>
      <h3 className="SuccessMessage">{this.state.sent}</h3>
      <div>{newArr.map((item)=> (
        <div id="chatters">
          <div onClick={this.onClick}>{item}</div>

        </div>

    )

  )}
</div>
</Col>
<Col md={8}>
<div >
    {unMessages.map((message) =>(
      <h2 class="messages">{message}</h2>
    ))}
</div>
</Col>
</Row>

    </div>
  )


}
}
export default Messages;
