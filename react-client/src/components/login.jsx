import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {states:{
			userName: '',
			password: ''
			},
      message:''
    }
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    }

    onChange(e) {
	  var states = this.state.states;
      var name = e.target.name;
      var value = e.target.value;
      states[name] = value;
      this.setState({states:states});
	};

	handleSubmit(event) {
		var that=this
		event.preventDefault();
		axios.post('/login', this.state.states)
  			.then(function (response) {

          if(response.data==="wrong password"){
           that.setState({message:"wrong password"});
          }else if(response.data==="Invalid User Name"){
            that.setState({message:"Invalid User Name"});
          }else{
            that.setState({message:""});
            window.location.href = "/";
          }

  			})
  			.catch(function (error) {
    		console.log(error);
  			});

		};

		render() {
    return (
       <div id='loginpage' className="container">
         <div className="wrapper">
           <form className="form-signin" onSubmit={this.handleSubmit}>
            <h3 className="form-signin-heading">
                <img id="loginimg" src="https://slack-imgs.com/?c=1&url=http%3A%2F%2Fntsescholars.com%2Fimages%2Floginpannel.png"  alt="User" />
                <br />
                <b id='b'>Login</b>
            </h3>

            <FormControl id='loguser' type="text" className="form-control" name="userName" onChange={this.onChange} placeholder="Username" required autoFocus /><br />
            <FormControl id='logpass' type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Password" required /><br />
            <h3 className="Message">{this.state.message}</h3>
            <button id="logb" className="btn btn-lg btn-primary" type="Submit">Login</button>
        </form>
    </div>
</div>
    );
  }
}


export default Login;
