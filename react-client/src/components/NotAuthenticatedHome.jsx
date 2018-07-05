import React from 'react';
import axios from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Search from './Search.jsx';

class NotAuthenticatedHome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };
  }

  logout () {
    let that = this;
    event.preventDefault();
    axios.get('/logout')
      .then(function (response) {
        window.location.href = '/';
      })
      .catch(function (error) {
        throw error;
      });
  }

  searchJobCategory (category) {
    let that = this;
    axios.post('/jobCategory', {'category': category})
      .then(function (response) {
        const posts = response.data;
        that.setState({items: posts});
      })
      .catch(function (error) {
        throw error;
      });
  }

  searchJobTitle (query) {
    let that = this;
    axios.post('/someJobs', {query: query})
      .then(function (response) {
        const posts = response.data;
        that.setState({items: posts});
      })
      .catch(function (error) {
        throw error;
      });
  }

  // make new get requests for each filter
  componentDidMount () {
    axios.get('/jobs')
      .then(response => {
        const posts = response.data;
        this.setState({items: posts});
      })
      .catch(function (error) {
        console.log(error);
      });
    this.logout();
  }

  render () {
    let arr = [];
    this.state.items.forEach(function (item) {
      arr.push(<HomeDisplay item={item} />);
    });
    return (

      <div>
        <br />
        <div>
          <Search searchJobTitle={this.searchJobTitle.bind(this)} searchJobCategory={this.searchJobCategory.bind(this)} />
        </div>
        <div>
          {arr}
        </div>
      </div>

    );
  }
}
export default NotAuthenticatedHome;
