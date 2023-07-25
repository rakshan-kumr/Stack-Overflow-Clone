import React, { useState } from 'react'
import { updateProfile } from '../../actions/users'
import { useDispatch } from 'react-redux'

const EditProfileForm = ({ currentUser, setformVisible }) => {
  const [name, setName] = useState(currentUser?.name)
  const [about, setAbout] = useState(currentUser?.about)
  const [tags, setTags] = useState(currentUser?.tags || [])

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (!tags.length) {
    //   dispatch(updateProfile(currentUser._id, { name, about }))
    // } else {
    //   dispatch(updateProfile(currentUser?._id, { name, about, tags }))
    // }
    dispatch(
      updateProfile(currentUser?._id, {
        name,
        about,
        ...(tags?.length && { tags }),
      })
    )
    setformVisible(false)
  }

  return (
    <div>
      <h1 className='edit-profile-title'>Edit Your Profile</h1>
      <h2 className='edit-profile-title-2'>Public information</h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <h3>Display Name</h3>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor='about'>
          <h3>About Me</h3>
          <textarea
            id='about'
            cols='30'
            rows='10'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor='tags'>
          <h3>Watched Tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type='text'
            id='tags'
            onChange={(e) => setTags(e.target.value.split(' '))}
          />
        </label>
        <br />
        <input type='submit' value='Save profile' className='user-submit-btn' />

        <button
          type='button'
          className='user-cancel-btn'
          onClick={() => setformVisible(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditProfileForm
