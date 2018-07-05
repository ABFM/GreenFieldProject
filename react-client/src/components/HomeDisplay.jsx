import React from 'react'
import axios from 'axios'
import { FormControl, Row, Col } from 'react-bootstrap'
class HomeDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reciver: this.props.item.user,
      message: '',
      sent: '',
      image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
      number: '',
      text: '',
      rating: 0
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.onChangeNumber = this.onChangeNumber.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.sendSms = this.sendSms.bind(this)
    this.increse = this.increse.bind(this)
    this.decrese = this.decrese.bind(this)
  }

  increse () {
    let x = this
    axios.post('/increse', {jobId: x.props.item._id}).then(function (res) {
      let rate = res.data.rating
      x.setState({
        rating: rate
      })
    }).catch(function () {
      alert('please login')
    })
  }

  decrese () {
    let x = this

    axios.post('/decrese', {jobId: x.props.item._id}).then(function (res) {
      let rate = res.data.rating
      x.setState({
        rating: rate
      })
    }).catch(function () {
      alert('please login')
    })
  }

  sendSms () { // this function takes the number and text input
    // from the DOM and send it to the server
    let x = this
    axios.post('/sms', {
      number: x.state.number,
      text: x.state.text
    })
  }

  onChangeText (e) {
    let txt = e.target.value
    this.setState({
      text: txt
    })
  }

  onChangeNumber (e) {
    let number = e.target.value
    this.setState({
      number: number
    })
  }

  onChange (e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit (event) {
    let that = this
    event.preventDefault()
    axios.post('/sendMessage', this.state)
      .then(function () {
        axios.get('/me')
          .then((res) => {
            if (res.data.length > 0) {
              that.setState({sent: 'message sent to ' + that.state.reciver})
            } else {
              that.setState({sent: 'why you didn\'t make an account?'})
            }
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    let phonNum = 0
    let image = ''
    if (this.props.item.userInfo.length > 0) {
      phonNum = this.props.item.userInfo[0].phoneNumber
      image = this.props.item.userInfo[0].image
    }

    return (
      <div>
        <div id='postDiv' className='jobsDiv container'><br />
          <Row id='row'>
            <Col md={4}>
              <img src={image || this.state.image} id='profilePhoto' />
              <span id='custom-span'>   {this.props.item.user}</span>
            </Col>
          </Row><br />

          <Col md={6}>
            <span><b>I Am a  </b></span>
            <span>{this.props.item.jobTitle}</span>
          </Col>

          <Col md={6}>
            <span><b>Job Category : </b></span>
            <span>{this.props.item.category}</span>

          </Col><br />

          <Row><br />
            <Col md={6}>
              <span>      I Am avilable  <b> From : </b></span>
              <span>{this.props.item.from}</span>
            </Col>
            <Col md={6}>
              <span><b>To : </b></span>
              <span>{this.props.item.to}</span>
            </Col>

            <Row>
              <Col md={12}><br />
                <span><b>You can contact with me on : </b></span>
                <span>{phonNum}</span>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <input type='text' placeholder='send free sms' onChange={this.onChangeText} />
              </Col>
              <Col md={4}>
                <input type='text' placeholder='type my number' onChange={this.onChangeNumber} />
              </Col>
              <Col md={4}>
                <input type='button' value='Send' onClick={this.sendSms} />

              </Col>
            </Row>

          </Row><br />

          <Row>
            <Col md={1} />
            <Col id='description' md={10}>
              <span>{this.props.item.jobDescription}</span>
            </Col>
            <Col md={1} />
          </Row><br />
          <span> <p>Rating:</p> {this.state.rating}</span>
          <br />
          <span><button onClick={this.increse}>Up </button> <bh /> <button onClick={this.decrese}>Down </button> </span>
          <Row>
            <Col md={8} />
            <Col id='postTime' md={4}>
              <span><b>Posted at : </b></span>
              <span>{this.props.item.created_at.slice(0, 10)}</span>
            </Col>
          </Row>
          <Row id='row'>
            <form onSubmit={this.handleSubmit}>
              <h4> send message to  <span id='custom-span'>{this.props.item.user}</span> </h4>

              <FormControl type='text' name='message' placeholder='message' autoFocus required onChange={this.onChange} />
              <span> <button type='submit'>send</button></span>
            </form>
          </Row>
          <h3 className='SuccessMessage'>{this.state.sent}</h3>
        </div><br />

      </div>
    )
  }
}
export default HomeDisplay
