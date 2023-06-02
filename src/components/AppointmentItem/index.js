// Write your code here
import {format} from 'date-fns'
import './index.css'

const star =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const unStarred =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItems = props => {
  const {appointmentDetails, toggleStarButton} = props
  const {title, date, id, isStarred} = appointmentDetails
  const newDate = new Date(date)
  const formatDate = format(newDate, 'dd MMMM yyyy, EEEE')
  const starImage = isStarred ? unStarred : star
  const onClickStarBtn = () => {
    toggleStarButton(id)
  }
  return (
    <li className="list-item">
      <div className="appointment-container">
        <div className="name-container">
          <p className="name">{title}</p>
          <button
            type="button"
            data-testid="star"
            className="start-btn"
            onClick={onClickStarBtn}
          >
            <img src={starImage} alt="star" className="star-img" />
          </button>
        </div>
        <p className="date">Date: {formatDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItems
