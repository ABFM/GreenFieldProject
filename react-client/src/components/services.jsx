import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import MapContainer from './map.jsx';

class Services extends React.Component {
    constructor (props) {
        super(props);
        this.state = {states: {
            user: '',
            serviceTitle: '',
            serviceDescription: '',
            category: '',
            from: '',
            to: '',
            location: {latitude: 0, longitude: 0 }
        },
        message: ''

        };
        this.baseState = this.state;
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _onClick (obj) { // console.log(obj,obj.x, obj.y, obj.lat, obj.lng, obj.event);
        let location = {latitude: obj.latLng.lat(), longitude: obj.latLng.lng()};

        let states = this.state.states;
        states.location = location;
        this.setState({states: states });
        console.log(this.state.states.location);
    }

    onChange (e) {
	  let states = this.state.states;
        let name = e.target.name;
        let value = e.target.value;
        states[name] = value;
        this.setState({states: states});
    }

  handleSubmit (event) {
        let that = this;
        event.preventDefault();
        axios.post('/service', this.state.states)
  			.then(function (response) {
  			
  				that.setState({message: 'service Added'});
  			})
  			.catch(function (error) {
    	    throw error;
  			});
    }

  render () {
        return (
            <center>  <div style={{height: '40%', width: '100%'}}>
                <MapContainer click={this._onClick.bind(this)} />
            </div>
            <div id='jobform' className='container wrapper well'><br />
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={1} />
                        <Col md={2}>
                            <span>Service Title</span>
                        </Col>
                        <Col md={3}>
                            <label >
                                <FormControl maxLength={20} type='text' name='serviceTitle' placeholder='Service Title' autoFocus required onChange={this.onChange} />
                            </label></Col>
                        <Col md={2}>
                            <span>Category</span>
                        </Col>
                        <Col md={3}>
                            <label >
                                <div className='form-group'>
                                    <select name='category' className='form-control selectpicker btn btn-default' id='catJ' onChange={this.onChange}>
                                        <option value='Select'>Select Category</option>
                                        <option value='Driver'>Driver</option>
                                        <option value='Home Maintenance'>Home Maintenance</option>
                                        <option value='Computer Maintenance'>Computer Maintenance</option>
                                        <option value='Babysitting'>Babysitting</option>
                                        <option value='Tutoring'>Tutoring</option>
                                    </select>
                                </div>
                            </label>
                        </Col>
                        <Col md={1} />
                    </Row> <br />

                    <Row>
                        <Col md={1} />
                        <Col md={2}>
                            <span>Service Description</span>
                        </Col>
                        <Col md={8}>
                            <label >
                                <FormControl id='txt`Area' componentClass='textarea' maxLength={150} name='serviceDescription' placeholder='Service Description' autoFocus required onChange={this.onChange} />
                            </label></Col>

                        <Col md={1} />
                    </Row><br />

                    <Row>
                        <Col md={1} />
                        <Col md={2}>
                            <span>From</span>
                        </Col>
                        <Col md={3}>
                            <label >
                                <FormControl type='time' name='from' placeholder='From' autoFocus required onChange={this.onChange} />
                            </label> </Col>
                        <Col md={2}>
                            <span>To</span>
                        </Col>
                        <Col md={3}>
                            <label >
                                <FormControl type='time' name='to' placeholder='To' autoFocus required onChange={this.onChange} />
                            </label></Col>
                        <Col md={1} />
                    </Row><br /><br />

                    <Button id='jobb' className='btn btn-primary' type='submit' bsSize='large' >
				     Add
                    </Button>

                    <h3 className='SuccessMessage'>{this.state.message}</h3>

                </form>
            </div>
            </center>
        );
    }
}

export default Services;
