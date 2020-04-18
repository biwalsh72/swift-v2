import React from 'react'
import styles from './Message.module.css'

const Timestamp = ({ isSecret, decrypted, timestamp, seen, sentByUser }) => {
  const getTimestamp = () => {
    if (isSecret) if (!decrypted) return 'Decrypt'

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const dateTimestamp = new Date(timestamp)

    const month = dateTimestamp.getMonth()
    const day = dateTimestamp.getDay()
    const date = dateTimestamp.getDate()
    const hours = dateTimestamp.getHours()
    const hoursPadded = hours < 10 ? `0${hours}` : hours
    const minutes = dateTimestamp.getMinutes()
    const minutesPadded = minutes < 10 ? `0${minutes}` : minutes

    const monthStr = monthNames[month].slice(0, 3)
    const dayStr = dayNames[day].slice(0, 3)

    return `${monthStr} ${date}, ${dayStr} - ${hoursPadded}:${minutesPadded}`
  }

  function displaySeenStatus () {
      return seen ? <p>👁‍🗨</p> : <p>✓</p>;
  }

  return (
      <div className={styles['timestamp']}>
          {sentByUser || displaySeenStatus()} {" "}
          {getTimestamp()} {" "}
          {sentByUser && displaySeenStatus()}
      </div>
  )
}

export default Timestamp
