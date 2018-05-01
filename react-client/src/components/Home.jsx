import React from 'react';
import axios from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Search from './Search.jsx'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }



  searchJobCategory(category){
    var that = this;
   axios.post('/jobCategory', {"category": category})
        .then(function(response){
          const posts = response.data;
            that.setState({items: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
  }

  searchJobTitle(query) {
    var that = this;
     axios.post('/someJobs', {query:query})
          .then(function (response) {
            const posts = response.data;
            that.setState({items: posts});

        })
          .catch(function (error) {
            console.log(error);
        });

  }

//make new get requests for each filter
  componentDidMount() {
    console.log("hi");
    axios.get('/jobs')
    .then(response => {
    const posts = response.data;
    this.setState({items:posts});

  })
  .catch(function (error) {
    console.log(error);
  });
}

render() {
  var arr = [];
    this.state.items.forEach(function(item) {
      arr.push(<HomeDisplay item={item} />)
    })
  return (

    <div id='home'>
    <br />
    <div>
    <Search searchJobTitle={this.searchJobTitle.bind(this)} searchJobCategory={this.searchJobCategory.bind(this)} />
    </div>
    <div>
    {arr}
    </div>
    </div>

    )
}
}
export default Home;
