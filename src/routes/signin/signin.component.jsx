import { useState } from 'react'
import './signin.styles.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/user.context'
 
const defaultFormFields = {
  email: '',
  password: '',  
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields
  const {user, setUser} = useUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
  const {name, value} = event.target
  setFormFields({...formFields, [name]:value})
  // Reset Error Message
  setErrorMessage('')
 }

  const reSetFormFields = () => {
  setFormFields(defaultFormFields)
 }

 const handleSubmit = async(event) => {
  event.preventDefault()
  
   try {
      const response = await fetch('https://bookflow-api.onrender.com/signin', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
        email: email, 
        password:password
      })
    })
      if(response.ok) {
        const data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))
        setUser({ 
          userid: data.userid,
          ...data
        })
        navigate('/profile')
        reSetFormFields()
      } else {
        setErrorMessage('Email or password is invalid')
      } 
    } 
  catch(error) {
    console.log(error)
  }
}
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label htmlFor="email">Email</label>
      <input 
        type="text" 
        placeholder="Enter Email" 
        id="email"
        name="email" 
        autoComplete="username"
        onChange={handleChange}
        value={email}
        aria-label="Email"
        required/>
       <label htmlFor="password">Password</label>
       <input 
         type="password" 
         placeholder="Enter Password" 
         id="password"
         name="password" 
         autoComplete="current-password"
         onChange={handleChange}
         value={password}
         aria-label="Password"
         minLength="4"
         required/>
      <div className="signin-body-container">
       <span className="register">Do not have an account ?
       <Link to="/register"> Register</Link></span>
      </div>
       {errorMessage && <p className='error-message'>{errorMessage}</p>}
       <button type="submit" aria-label="Sign In">Log In</button>
    </form>
  )
}

export default SignIn