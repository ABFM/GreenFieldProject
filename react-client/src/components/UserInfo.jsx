import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col } from 'react-bootstrap';
class UserInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {states: {
            name: '',
            email: '',
            gender: '',
            phoneNumber: '',
            address: '',
            age: '',
            nationality: ''},
        image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

        };
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
    }

    uploadPhoto (photo) { // post the photo and get the photo in the same time
        let x = this;

        let file = photo.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
            axios.post('/photo', {image: e.target.result})
                .then(() => {
                    console.log('rbkbkbkbkb');
                    x.componentDidMount();
                })
                .catch(function (error) {
                    throw error;
                });
        };
    }

    onClick () {
        this.setState({
            update: !this.state.update
        });
    }
    onChange (e) {
        let states = this.state.states;
        let name = e.target.name;
        let value = e.target.value;
        states[name] = value;
        this.setState({states});
    }
  componentDidMount () { // this is the initial
   	  axios.get('/userInfo')
            .then(response => {
                const posts = response.data;
                
                this.setState({states: posts});
                if (posts.image) {
                    this.setState({ // changing the state to the new image that i fetch it from database
                        image: posts.image
                    });
                }
            })
            .catch(function (error) {
                throw error;
            });
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.put('/updateUser', this.state.states)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                throw error;
            });
    }

  render () {
        return (
            <div>

                <div id='information'>

                    <h2> <span> <img id='profilePhoto' src={this.state.image} /></span>
                        <form >
                            <label class='btn btn-succes '>
                                <input type='file' name='myfile' id='photo' onChange={this.uploadPhoto} />.
             Change Photo

                            </label>
                        </form>
      Name : {this.state.states.name} </h2>
                    <h2>  Phone Number : {this.state.states.phoneNumber} </h2>
                    <h2> Email: {this.state.states.email} </h2>
                    <h2> Gender: {this.state.states.gender}</h2>
                    <h2> Nationality: {this.state.states.nationality}</h2>
                    <h2> Address: {this.state.states.address} </h2>
                    <h2> Age: {this.state.states.age} </h2>
                    {this.state.update &&
          <div id='profileUpdate' className='container wrapper well'><br />
              <form onSubmit={this.handleSubmit}>
                  <Row>
                      <Col md={4}>
                          <label id='signlable'>*Name
                              <FormControl type='text' name='name' placeholder='Name' autoFocus required
                                  onChange={this.onChange} value={this.state.states.name}
                              />
                          </label>
                      </Col>
                      <Col md={4}>

                          <label id='signlable'>*Phone Number
                              <FormControl type='number' name='phoneNumber' placeholder='Phone Number' required
                                  onChange={this.onChange} value={this.state.states.phoneNumber} />
                          </label><br />

                      </Col>
                      <Col md={4}>
                          <label id='signlable'>*Email:
                              <FormControl type='email' name='email' placeholder='Email' required
                                  onChange={this.onChange} value={this.state.states.email} />
                          </label><br />
                      </Col>
                  </Row><br />
                  <Row>
                      <Col md={4}>
                          <label id='signlable'>*Gender
                              <FormControl type='text' name='gender' placeholder='Gender' required
                                  onChange={this.onChange} value={this.state.states.gender} />
                          </label><br />
                      </Col>
                      <Col md={4}>

                          <label id='signlable'>Nationality
                              <FormControl type='text' name='nationality' placeholder='Nationality'

                                  onChange={this.onChange} value={this.state.states.nationality} />
                          </label><br />

                      </Col>

                      <Col md={4}>
                          <label id='signlable'>Address

                              <FormControl type='text' name='address' placeholder='Address'
                                  onChange={this.onChange} value={this.state.states.address} />
                          </label><br />
                      </Col>
                  </Row><br />
                  <Row>

                      <Col md={4}>
                          <label id='signlable'>*Age
                              <FormControl type='number' name='age' placeholder='Age' required
                                  onChange={this.onChange} value={this.state.states.age} />
                          </label><br />
                      </Col><br /><br /><br />
                      <Col md={4} />
                      <Col md={4}>
                          <Button type='submit' bsStyle='primary' bsSize='large'>Update</Button>
                      </Col>
                  </Row>
              </form>
          </div>}
                </div>
                <button onClick={this.onClick}>Update Your Information</button>

            </div>
        );
    }
}
export default UserInfo;
