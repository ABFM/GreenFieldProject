import React from 'react';
import axios from 'axios';
import HomeDisplay from './HomeDisplay.jsx';
import Search from './Search.jsx'
import MapContainer from './map.jsx'
import geolib from 'geolib'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      lat:0,
      lng:0
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
searchLocation(myPostionLat, myPostionLng,items){
    console.log("this function",myPostionLat)
    var jobsLoc = [];console.log("items0000",items[0].location);
    for (var i = 0; i < items.length; i++) { 
     var a= geolib.getDistance(
    {latitude: myPostionLat, longitude: myPostionLng},items[i].location
);  items[i].distance = a;
     console.log(a)
    }
    items.sort(function (a, b) {
  return a.distance - b.distance})
    console.log(items);
    this.setState({items: items});
   // console.log(jobsLoc)
    // var a =  geolib.orderByDistance({latitude: myPostionLat, longitude: myPostionLng}, [jobsLoc]);
    // console.log("herehere",a)
  }
//make new get requests for each filter
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("here",position.coords.latitude)
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
      },
      error => console.log(error)
    );
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
    <select onChange={this.searchLocation.bind(this,this.state.lat, this.state.lng,this.state.items)} >
      <option >
        Sort by:
      </option>
      <option >
        location
      </option>
    </select>
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
