import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    reciver: this.props.item.user,
    message: ''
  }
  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }


	onChange(e) {
        var message = e.target.message;
        this.setState({
          message: message
        });
  	};


  	handleSubmit(event) {
  		var that=this;
  		event.preventDefault();
  		axios.post('/sendMessage', this.state)
    			.then(function (response) {
    				console.log('message sent');

    			})
    			.catch(function (error) {
      		console.log(error);
    			});


  		};

render() {
	let phonNum=0;
	if(this.props.item.userInfo.length>0){
		 phonNum=this.props.item.userInfo[0].phoneNumber;
	}

  return (
  	<div>
  	<div id ='postDiv' className="jobsDiv container"><br />
  		<Row id="row">
			<Col md={4}>
      <img src ="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profilePhoto"/>
			<span id="custom-span">   {this.props.item.user}</span>
			</Col>
      </Row><br />

			<Col md={6}>
			<span><b>I Am a  </b></span>
			<span>{this.props.item.jobTitle}</span>
			</Col>

      <Col md={6}>
      <span><b>Job Category : </b></span>
      <span>{this.props.item.category}</span>

      </Col><br />

        <Row><br />
            <Col md={6}>
            <span>      I Am avilable  <b> From : </b></span>
			         <span>{this.props.item.from}</span>
			</Col>
			<Col md={6}>
			<span><b>To : </b></span>
			<span>{this.props.item.to}</span>
			</Col>

      <Row>
      <Col md={12}><br />
			<span><b>You can contact with me on : </b></span>
			<span>{phonNum}</span>
			</Col>
      </Row>
		</Row><br />

		<Row>
		<Col md={1}>
		</Col>
			<Col id="description" md={10}>
			<span>{this.props.item.jobDescription}</span>
			</Col>
			<Col md={1}>
			</Col>
		</Row><br />

		 <Row>
		 <Col md={8}>
			</Col>
		 <Col id='postTime' md={4}>
			<span><b>Posted at : </b></span>
			<span>{this.props.item.created_at.slice(0, 10)}</span>
			</Col>
		 </Row>
     <Row id="row">
     <form onSubmit={this.handleSubmit}>
     <h4> send message to  <span id="custom-span">{this.props.item.user}</span> </h4>

     <input type="text" placeholder="message"/>
     <span> <button type="submit">send</button></span>
     </form>
     </Row>
    </div><br />

    </div>
    )
  }
}
export default HomeDisplay;
