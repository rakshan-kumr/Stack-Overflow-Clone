import React, { useState } from 'react'
import moment from 'moment'
import './UserProfile.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import LoginHistory from './LoginHistory'

const UserProfile = () => {
  const [formVisible, setformVisible] = useState(false)
  const users = useSelector((state) => state.usersReducer)
  const { id } = useParams()

  const currentProfile = users.find((user) => user._id === id)
  const currentUser = useSelector((state) => state.currentUserReducer)

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <section>
          <div className='user-details-container'>
            <div className='user-details'>
              <Avatar
                backgroundColor='purple'
                color='white'
                fontSize='50px'
                px='40px'
                py='30px'
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className='user-name'>
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    style={{ margin: '2px' }}
                  />
                  Joined {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                className='edit-profile-btn'
                onClick={() => setformVisible(true)}
              >
                <FontAwesomeIcon icon={faPen} />
                Edit Profile
              </button>
            )}
          </div>
          <>
            {formVisible ? (
              <EditProfileForm
                currentUser={currentProfile}
                setformVisible={setformVisible}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
          <>
            {currentUser?.result._id === id && !formVisible && (
              <LoginHistory user={currentUser} />
            )}
          </>
        </section>
      </div>
    </div>
  )
}

export default UserProfile
