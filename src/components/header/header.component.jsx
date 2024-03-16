import './header.styles.scss'

const Header = () => {
  const title = 'Welcome to BookFlow'
  return (
    <div>
      <h1 className="home-title">{title}</h1>
    </div>
  )
}

export default Header