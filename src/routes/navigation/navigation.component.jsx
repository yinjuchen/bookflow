import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import './navigation.styles.scss'
import { Fragment, useState } from "react"
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom"
import { useUser} from "../../context/user.context"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {user, signOutUser} = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  // toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // check if user is in the profile page
  const onProfilePage = location.pathname === '/profile'

  const handleSignOut = () => {
    localStorage.removeItem('user')
    signOutUser(false)
    navigate('/')
  }

  return (
    <Fragment>
      <div className="topnav">
        <Link className="logo-container" to='/'>
          Home
        </Link>
        <div className={`myLinks ${isMenuOpen ? 'show': ''}`}>
          {
            user && user.userid ?
            (
              onProfilePage ?
              (
                <span className="nav-link" onClick={handleSignOut}>Sign Out</span>
              ): 
              (
                <Link className="nav-link" to='/profile'>Profile</Link>
              )
            ): 
            (
              <Fragment>
                <Link className="nav-link" to='/signin'>Login</Link>
                <Link className="nav-link" to='/register'>Register</Link>
              </Fragment>
            )
          }
        </div>
      <button className="icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="fa-bars"/>
      </button>
      </div>
    <Outlet/>
    </Fragment>
  )
}

export default Navigation
