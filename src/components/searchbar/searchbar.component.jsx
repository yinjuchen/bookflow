import './searchbar.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder, value, onChangeHandler, onSubmitHandler }) => {
  return (
    <form onSubmit={onSubmitHandler} className={`search-bar-container search-bar`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        className='search-bar-input'
        aria-label="search for books"
        />
        <button className="search-button" type="submit" aria-label="Submit search">
          <FontAwesomeIcon icon={faSearch} className='fa-icon' aria-hidden="true"/>
        </button>      
    </form>
  )
}

export default SearchBar

