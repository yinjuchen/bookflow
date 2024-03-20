import { Fragment, useState } from "react"
import SearchBar from "../searchbar/searchbar.component"
import BookCard from "../bookcard/bookcard.component"
import './booklist.styles.scss'

const BookList = () => {
 const [searchField, setSearchField] = useState('')
 const [searchResults, setSearchResults] = useState([])

 // searchbar handler
 const searchBarHandler = (event) => {
  setSearchField(event.target.value)
 }

const handleSearchSubmit = async(event) => {
  event.preventDefault()
  const trimSearchField = searchField.trim()
  try {
      const response = await fetch('https://bookflow-api.onrender.com/search-books', {
        method: 'post',
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({searchQuery: trimSearchField})
     })
    if (response.ok) {
      const data = await response.json()
      setSearchResults(data.items || [])
    } else {
        setSearchResults([])
      } 
  } catch(error) {
    console.log(error)
  }
}
  return (
    <Fragment>
      <SearchBar 
        className='search-bar'
        placeholder='What would you like to read today'
        onChangeHandler={searchBarHandler}
        onSubmitHandler={handleSearchSubmit}
        value={searchField}
      />
      {searchResults.length > 0 && (
        <div className="booklist-container">
          {searchResults.map((book) => 
            <BookCard key={book.id} book={book}/>)
          }
        </div>
      )}
    </Fragment>
  )
}

export default BookList