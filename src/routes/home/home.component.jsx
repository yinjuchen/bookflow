import Header from "../../components/header/header.component"
import BookList from "../../components/booklist/booklist.component"
import './home.styles.scss'
import { Link } from "react-router-dom"
import { useUser } from "../../context/user.context"
import { Fragment } from "react"

const Home = () => {
  const {user} = useUser()
  return (
    <div className="home-container">
      <Header />
        <section className="share-book-text-container">
        {
          user && user.userid ? (
            // Message For Old User
            <p>Welcome back! Ready to discover more books or share a new recommendation?</p>
          ):
          (
          <Fragment>
          {/* Message For New User */}
          <p>Excited to recommend a book you've discovered?</p>
          <p>To start sharing your recommendations <Link to="/register">Create an account</Link> or <Link to="/signin">Signin</Link></p>
           <p className="ending-text">Once you're logged in, you'll have access to your profile, where you can submit your book recommendations and share your reading journey with others</p>
          </Fragment>
          )
        }
        </section>
      <div className='home-search-container'>
        <BookList/>
      </div>
    </div>
  )
}

export default Home 