import React from 'react'
import './LoginHistory.css'
import moment from 'moment'

const LoginHistory = ({ user }) => {
  const loginHistory = user.result.loginHistory

  return (
    <div>
      <div>
        <h4>Login History</h4>
        {loginHistory
          ?.sort((a, b) => new Date(b.time) - new Date(a.time))
          .map((history) => {
            return (
              <div className='login-history-element'>
                <div>OS: {history.systemInfo?.os}</div>
                <div>Browser: {history.systemInfo?.browserDetails}</div>
                <div>Device: {history.systemInfo?.deviceType}</div>
                <div>IP Address: {history.ipAddress}</div>
                <div>Logged in: {moment(history.time).fromNow()}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default LoginHistory
