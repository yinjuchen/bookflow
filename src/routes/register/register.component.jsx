import { useState } from 'react'
import './register.styles.scss'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/user.context'

const defaultFormFields = {
  userName: '',
  email: '',
  password: '',  
}

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {userName, email, password} = formFields
  const {setUser} = useUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

const handleChange = (event) => {
  const {name, value} = event.target
    setFormFields({...formFields, [name]:value})
    setErrorMessage('')
}

const reSetFormFields = () => {
  setFormFields(defaultFormFields)
}

const handleSubmit = async(event) => {
  event.preventDefault()
  try {
      const response = await fetch('https://bookflow-api.onrender.com/register', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
        email: email, 
        password:password, 
        name: userName, 
      }),
    })
      if(response.ok) {
        const newUser = await response.json()
        localStorage.setItem('user', JSON.stringify(newUser))
        setUser({
           userid: newUser.userid,
          ...newUser})
        navigate('/profile')
        reSetFormFields()
      } else {
        const error = await response.json()
        setErrorMessage(error.error)
      } 
    } 
  catch(error) {
      console.log(error)
  }
}

  return (
    <form className="register-container" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label htmlFor="userName">Username</label>
      <input 
        type="text" 
        placeholder="Enter letters,numbers and underscores only" 
        id="userName"
        name="userName"
        autoComplete="userName"
        pattern="[a-zA-Z0-9_]{3,}"
        value={userName}
        aria-label="Username"
        onChange={handleChange}
        required/>
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        placeholder="Enter Email" 
        id="email"
        name="email"
        value={email}
        aria-label="Email"
        onChange={handleChange}
        required/>
      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        placeholder="Enter Password" 
        id="password"
        name="password" 
        autoComplete="current-password"
        value={password}
        aria-label="Password"
        onChange={handleChange}
        minLength="4"
        required/>
      <button type="submit" aria-label="Register">Register</button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  )
}

export default Register