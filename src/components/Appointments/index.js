// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItems from '../AppointmentItem'

import './index.css'

const initialAppointmentsList = []
class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    starStatus: false,
  }

  addAppointment = event => {
    const {title, date} = this.state
    event.preventDefault()
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(previousState => ({
      appointmentsList: [...previousState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getStarredAppointments = () => {
    this.setState(previousState => ({starStatus: !previousState.starStatus}))
  }

  toggleStarButton = id => {
    this.setState(previousState => ({
      appointmentsList: previousState.appointmentsList.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isStarred: !eachOne.isStarred}
        }
        return eachOne
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, title, date, starStatus} = this.state
    let starredAppointments = appointmentsList
    const addStarClassName = starStatus ? 'starred' : null
    // console.log(addStarClassName)
    if (starStatus === true) {
      starredAppointments = appointmentsList.filter(
        eachItem => eachItem.isStarred === true,
      )
    }

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                value={title}
                type="text"
                id="title"
                className="input-field"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                value={date}
                type="date"
                id="date"
                className="input-field"
                onChange={this.onChangeDate}
              />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>

          <hr />
          <div className="sub-heading-starred-container">
            <h2 className="sub-heading">Appointments</h2>
            <button
              type="button"
              className={`starred-btn ${addStarClassName}`}
              onClick={this.getStarredAppointments}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-container">
            {starredAppointments.map(eachReview => (
              <AppointmentItems
                key={eachReview.id}
                appointmentDetails={eachReview}
                toggleStarButton={this.toggleStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
