import React from 'react';
import axios from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Search from './Search.jsx';
import geolib from 'geolib';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';

import ServiceDisplay from './ServiceDisplay.jsx';
class Home extends React.Component {
  constructor (props) {
    super(props);
        this.state = {
      items: [],
      services: [],
      lat: 0,
      lng: 0,
      check: false
    };
    }

  toggle () {
    var check = this.state.check;
        this.setState({
      check: !check
    });
    }
  getServices () {
    var x = this;
        axios.get('/getServices').then(function (res) {
      var fetching = res.data;
            x.setState({
        services: fetching
      });
        }).catch(function (err) {
      throw err;
        });
    }

  searchJobCategory (category) {
    var that = this;
        axios.post('/jobCategory', {'category': category})
      .then(function (response) {
        const posts = response.data;
                that.setState({items: posts});
                that.searchLocation(that.state.lat, that.state.lng, that.state.items);
            })
      .catch(function (error) {
        throw error;
            });
    }

  searchJobTitle (query) {
    var that = this;
        axios.post('/someJobs', {query: query})
      .then(function (response) {
        const posts = response.data;
                that.setState({items: posts});
                that.searchLocation.bind(that, that.state.lat, that.state.lng, that.state.items);
            })
      .catch(function (error) {
        throw error;
            });
    }
  searchLocation (myPostionLat, myPostionLng) {
    let items;
        if (this.state.check) { items = this.state.services; } else { items = this.state.items; }
    for (let i = 0; i < items.length; i++) {
      let a = geolib.getDistance(
        {latitude: myPostionLat, longitude: myPostionLng}, items[i].location
      ); items[i].distance = a;
        }
    items.sort(function (a, b) {
      return a.distance - b.distance;
        });

        this.setState({items: items});
    }
  // make new get requests for each filter
  componentDidMount () {
    this.getServices();
        navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
            },
      error => console.log(error)
    );
        axios.get('/jobs')
      .then(response => {
        const posts = response.data;
                this.setState({items: posts});
            })

      .catch(function (err) {
        throw err;
            });
    }

  render () {
    var arr = [];
        if (this.state.check) {
      this.state.services.forEach(function (service) {
        arr.push(<ServiceDisplay service={service} />);
            });
        } else {
      this.state.items.forEach(function (item) {
        arr.push(<HomeDisplay item={item} />);
            });
        }

    return (

      <div id='home'>
        <br />
              <div>
                  <Row>
            <Col md={1}>
              <select onChange={this.searchLocation.bind(this, this.state.lat, this.state.lng)} >
                <option >
            Sort by:
                </option>
                              <option >
            location
                </option>
              </select>
            </Col>
            <Col md={1}>
              <button onClick={this.toggle.bind(this)}>Jobs</button>
            </Col>
            <Col md={1}>
                          <button onClick={this.toggle.bind(this)}>Services</button>
            </Col>

            <Col md={4}>
              <Search searchJobTitle={this.searchJobTitle.bind(this)} searchJobCategory={this.searchJobCategory.bind(this)} />
            </Col>
          </Row>
        </div>
        <div>
          {arr}
        </div>
      </div>

    );
    }
}
export default Home;
