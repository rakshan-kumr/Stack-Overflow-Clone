import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'
import UsersList from './UsersList'

const Users = () => {
  const location = useLocation()

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2' style={{ margin: '30px' }}>
        <h1 style={{ fontWeight: '400' }}>Users</h1>
        {location.pathname === '/Users' ? <UsersList /> : null}
      </div>
    </div>
  )
}

export default Users
