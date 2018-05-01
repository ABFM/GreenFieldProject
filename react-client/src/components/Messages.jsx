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
    let msgs = []
    that.setState({visible: !that.state.visible})

    for (var i = 0; i < that.state.items.length; i++) {
      if (this.state.items[i].sender === e.target.innerText || this.state.items[i].reciver === e.target.innerText) {
        msgs.push(this.state.items[i])
      }
    }
    that.setState({
      messages: msgs
    })

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
    {this.state.visible && this.state.messages.map((message) =>(
      <div>
      <h1 class="messages"><span><img id="profilePhoto" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" /></span>{message.message}</h1>
      </div>
    ))}
</div>
</Col>
</Row>

    </div>
  )


}
}
export default Messages;
