import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import SignUpForm from '../components/SignUp.jsx';
import JobsForm from '../components/JobsForm.jsx';
import NavBar from '../components/Header.jsx';
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import Profile from '../components/profile.jsx';
import Messages from '../components/messages.jsx';
import Services from '../components/services.jsx';
import NotAuthenticatedHome from '../components/NotAuthenticatedHome.jsx';
import UserJobs from '../components/UserJobs.jsx';
import axios from 'axios';
class AppRouter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            session: false
        };
    }

    componentDidMount () {
        axios.get('/logged')
            .then(response => {
                const posts = response.data;
  
                this.setState({session: posts});

            })
            .catch(function (error) {
                throw error;
            });
    }

    render () {
        return (
            <BrowserRouter>
                <div>
                    <NavBar session={this.state.session} /><br /><br />
                    <Switch>
                        <Route exact path ='/' component ={Home} />
                        <Route path= '/signup' component= {SignUpForm} />
                        <Route path ='/UserJobs/:jobTitle/:userName' component= {UserJobs} />
                        <Route path ='/jobsForm' component= {JobsForm} />
                        <Route path= '/profile' component ={Profile} />
                        <Route path= '/login'	component ={Login} />
                        <Route path= '/messages' component= {Messages} />
                        <Route path= '/services' component= {Services} />
                        <Route path ='/logout'	component= {NotAuthenticatedHome} />

                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}
export default AppRouter;
