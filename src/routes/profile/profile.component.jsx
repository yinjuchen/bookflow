import React, { Fragment } from 'react'
import { useUser } from '../../context/user.context'
import RecommendationForm from '../../components/recommendation-form/recommendation-form.component'
import { useState } from 'react'
import BookList from '../../components/booklist/booklist.component'
import './profile.styles.scss'

const Profile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false)

  const handleEditToggle = () => {
    setEditMode(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = async (event) => {
    const userid = user.userid
    const bio = user.bio
    event.preventDefault()
    try {
      const response = await fetch('https://bookflow-api.onrender.com/updateProfile', {
        method: 'put',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({userid, bio}),
    })
      if(response.ok) {
        const updateUser = await response.json()
        setUser(updateUser)
        localStorage.setItem('user', JSON.stringify(updateUser))
        setEditMode(false)
      } else {
        throw new Error("Failed to update profile")
      }
    } catch(error) {
      console.error(error)
    }
  }
  return (
    <div className='profile-container'>
       <div className='profile-search-container'>
        <BookList/>
       </div>
      <h1 className='welcome-message'>Welcome, {user?.name || 'User'}</h1>
      <div className='profile-detail-container'>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="bio">Bio:</label>
          <input
            id="bio"
            name="bio"
            type="text"
            className='bio'
            value={user?.bio || ''}
            onChange={handleChange}
            placeholder="Enter your Bio"
            required
          />
          <button type="submit">Save</button>
        </form>
        
      ) : (
        <Fragment>
          <p>{user?.bio}</p>
          <button onClick={handleEditToggle} className='edit-bio'>Edit Bio</button>
        </Fragment>
      )}
      </div>
      <div className='profile-recommendation'>
       <RecommendationForm />
      </div>
    </div>
  )
}

export default Profile
