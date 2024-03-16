import './bookcard.styles.scss'

const BookCard = ({book}) => {
  // set max
  const maxDescriptionLength = '150'
  // check if there is a description
  const truncatedDescription = book.volumeInfo.description &&
  // check if the description length is longer than maxDescriptionLength
  book.volumeInfo.description.length > maxDescriptionLength 
  // if yes,truncate it and add an ellipsis
  ?`${book.volumeInfo.description.substring(0, maxDescriptionLength )}...`
  // if not, show the description 
  : book.volumeInfo.description
  return (
    <div className="bookcard-container">
      <h3 className='book-title'>{book.volumeInfo.title}</h3>
      <img 
        alt={book.volumeInfo.title} 
        src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x180' }/>
      <h4 className='book-author'>{book.volumeInfo.authors || 'No author available'}</h4>
      <p>{truncatedDescription || 'No description available'}</p>
      <a 
        href={book.volumeInfo.infoLink} 
        target="_blank" 
        rel="noopener noreferrer">
        <span>Read More</span>
      </a>
    </div>
  )
}

export default BookCard