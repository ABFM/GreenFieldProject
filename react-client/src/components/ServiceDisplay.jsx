import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
class ServiceDisplay extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    reciver: this.props.service.user,
    message: '',
    sent: '',
    image:"https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
  }


  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
   this.onChangeNumber = this.onChangeNumber.bind(this);
  this.onChangeText = this.onChangeText.bind(this);
  this.sendSms = this.sendSms.bind(this);
  }


sendSms(){      // this function takes the number and text input 
               // from the DOM and send it to the server
  var x = this
axios.post("/serveiceSms",{
  number:x.state.number,
  text:x.state.text
})
}

onChangeText(e){
let txt = e.target.value
this.setState({
  text:txt
})

}

onChangeNumber(e){
let number = e.target.value
this.setState({
  number:number
})
}

	onChange(e) {
        var message = e.target.value
        this.setState({
          message: e.target.value
        });
  	};


  	handleSubmit(event) {
  		var that=this;
  		event.preventDefault();
  		axios.post('/sendMessage', this.state)
    			.then(function (response) {
            axios.get('/me')
            .then((res) =>{
              if(res.data.length > 0){
                that.setState({sent:"message sent to " + that.state.reciver});
              }
              else {
                that.setState({sent:"why you didn't make an account?"});
              }
            })


    			})
    			.catch(function (error) {

      		console.log(error);
    			});


  		};

render() {
	let phonNum=0;
  let  image = '';
	if(this.props.service.userInfo.length>0){
		 phonNum=this.props.service.userInfo[0].phoneNumber;
     image=this.props.service.userInfo[0].image

	}

  return (
  	<div>
  	<div id ='postDiv' className="jobsDiv container"><br />
  		<Row id="row">
			<Col md={4}>
      <img src ={image || this.state.image} id="profilePhoto"/>
			<span id="custom-span">   {this.props.service.user}</span>
			</Col>
      </Row><br />

			<Col md={6}>
			<span><b>I Am a  </b></span>
			<span>{this.props.service.serviceTitle}</span>
			</Col>

      <Col md={6}>
      <span><b>Service Category : </b></span>
      <span>{this.props.service.category}</span>

      </Col><br />

        <Row><br />
            <Col md={6}>
            <span>      I Am avilable  <b> From : </b></span>
			         <span>{this.props.service.from}</span>
			</Col>
			<Col md={6}>
			<span><b>To : </b></span>
			<span>{this.props.service.to}</span>
			</Col>

      <Row>
      <Col md={12}><br />
			<span><b>You can contact with me on : </b></span>
			<span>{phonNum}</span>
			</Col>
      </Row>
		</Row><br />
      <Row>
      <Col md={12}><br />
      <span><b>you can send me a direct message: </b></span>
      <input type = 'text' placeholder= "send me a direct message" onChange={this.onChangeText}/>
       <input type = 'text' placeholder= "type my number" onChange={this.onChangeNumber}/>
       <input type = 'button' value= "Send Message" onClick={this.sendSms} />
      </Col>
      </Row>

		<Row>
		<Col md={1}>
		</Col>
			<Col id="description" md={10}>
			<span>{this.props.service.serviceDescription}</span>
			</Col>
			<Col md={1}>
			</Col>
		</Row><br />

		 <Row>
		 <Col md={8}>
			</Col>
		 <Col id='postTime' md={4}>
			<span><b>Posted at : </b></span>
			<span>{this.props.service.created_at.slice(0, 10)}</span>
			</Col>
		 </Row>
     <Row id="row">
     <form onSubmit={this.handleSubmit}>
     <h4> send message to  <span id="custom-span">{this.props.service.user}</span> </h4>

     <FormControl type = "text" name = "message" placeholder = "message" autoFocus required onChange={this.onChange} />
     <span> <button type="submit">send</button></span>
     </form>
     </Row>
     <h3 className="SuccessMessage">{this.state.sent}</h3>
    </div><br />

    </div>
    )
  }
}
export default ServiceDisplay;
