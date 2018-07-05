import React from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
class JobsForUser extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div className='jobsDiv'><br />
                    <Link to={`/UserJobs/${this.props.item.jobTitle}/${this.props.item.user}`} activeClassName='is-active' >
                        <Row id='userjob'>
                            <Col md={4}>
                                <span><b>Name : </b></span>
                                <span>{this.props.item.user}</span>
                            </Col>
                            <Col md={4}>
                                <span><b>Job Title : </b></span>
                                <span>{this.props.item.jobTitle}</span>
                            </Col>
                            <Col md={4}>
                                <span><b>Job Category : </b></span>
                                <span>{this.props.item.category}</span>
                            </Col>
                        </Row><br />

                        <Row id='userjob'>
                            <Col md={4}>
                                <span><b>From : </b></span>
                                <span>{this.props.item.from}</span>
                            </Col>
                            <Col md={4}>
                                <span><b>To : </b></span>
                                <span>{this.props.item.to}</span>
                            </Col>
                        </Row><br />

                        <Row id='userjob'>
                            <Col md={1} />
                            <Col id='description' md={10}>
                                <span><b>Description : </b></span>
                                <span>{this.props.item.jobDescription}</span>
                            </Col>
                            <Col md={1} />
                        </Row><br />

                        <Row>
                            <Col md={8} />
                            <Col id='postTime' md={4}>
                                <span><b>Posted at : </b></span>
                                <span>{this.props.item.created_at.slice(0, 10)}</span>
                            </Col>
                        </Row>

                    </Link>
                </div>
            </div>

        );
    }
}
export default JobsForUser;
