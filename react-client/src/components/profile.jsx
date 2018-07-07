import React from 'react';
import axios from 'axios';
import JobsForUser from './jobsForUser.jsx';
import UserInfo from './UserInfo.jsx';
class Profile extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            jobs: [],
            user: [],
            update: false

        };
    }

    // make new get requests for each filter
    componentDidMount () { // this is the initial
        axios.get('/userJobs')
            .then(response => {
                const posts = response.data;
                this.setState({jobs: posts});
            }).catch(function (error) {
                throw error;
            });
        this.getUserInfo();
    }

    getUserInfo () {
        axios.get('/userInfo')
            .then(response => {
                const posts = response.data;
              
                this.setState({user: posts});
            })
            .catch(function (error) {
                throw error;
            });
    }

    render () {
        let arr = [];
        this.state.jobs.forEach(function (item) {
            arr.push(<JobsForUser item={item} />);
        });

        return (

            <div id='profile'>
                <br />
                <br />
                <div>
                    <UserInfo user={this.state.user} />
                </div>
                <div>
                    {arr}
                </div><br /><br />

            </div>

        );
    }
}
export default Profile;
