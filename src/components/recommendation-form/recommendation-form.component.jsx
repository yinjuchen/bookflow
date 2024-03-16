import { useState } from 'react'
import './recommendation-form.styles.scss'
import { useUser } from '../../context/user.context'

const defaultFormData = {
  bookTitle: '', 
  authorName: '', 
  genre: '', 
  recommendationText: '', 
  recipientEmail:'',
}

const RecommendationForm = () => {
  const [formData, setFormData] = useState(defaultFormData)
  const { bookTitle, authorName, genre, recommendationText, recipientEmail} = formData 
  const [successMessage, setSuccessMessage] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {user} = useUser()
  
  const handleChange = (event) => {
    const {name, value}= event.target
    setFormData({...formData, [name]:value})
    setSuccessMessage('')
  }

  const handleSubmit = async(event) => {
    event.preventDefault()

    const submissionData = {
      ...formData,
      userid: user.userid // Include userId from the user context
    }

    try {
      const response = await fetch('http://localhost:3000/recommendation', {
        method: 'post',
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify(submissionData)
      })  
      if(response.ok) {
        setSubmittedEmail(recipientEmail)
        const result = await response.json()
        setFormData(defaultFormData)
        setSuccessMessage(result.message)
      }   
    } 
    catch(error) {
      console.log(error)
    } 
  }

  return (
    <div className='recommendation-form-container'>
      <h2>My Recommendation Book!</h2>
      {successMessage && <div className='success-message'>{successMessage} to {submittedEmail} </div>}
      <form onSubmit={handleSubmit}>
          <label htmlFor="bookTitle">Book Title</label>
          <input 
            type="text" 
            id="bookTitle" 
            name="bookTitle"
            placeholder="Enter Book Title"
            value={bookTitle}
            aria-label="Book Title"
            onChange={handleChange}
            required
            />
          <label htmlFor="authorName">Author</label>
          <input 
            type="text" 
            id="authorName" 
            name="authorName"
            placeholder="Enter Author Name"
            value={authorName}
            aria-label="Author Name"
            onChange={handleChange}
            required
            />
          <label htmlFor="genre">Genre</label>
          <input 
            type="text" 
            id="genre" 
            name="genre"
            placeholder="Enter Genre"
            value={genre}
            aria-label="Genre"
            onChange={handleChange}
            required
          />
          <label htmlFor="recommendationText" className='message'>Why would I recommend?</label>
          <textarea
            id="recommendationText"
            name="recommendationText"
            placeholder="I love this book because..."
            value={recommendationText}
            aria-label="Enter your recommendation here"
            onChange={handleChange}
            required
          />
          <label htmlFor="recipientEmail">Email</label>
          <input 
            type="email" 
            id="recipientEmail"
            placeholder="Enter Email" 
            name="recipientEmail" 
            value={recipientEmail}
            onChange={handleChange}
            required/>
          <div className='button-container'>
            <button type="submit" aria-label="Submit recommendation">Submit</button>
          </div>
      </form>
    </div>
  )
}

export default RecommendationForm

