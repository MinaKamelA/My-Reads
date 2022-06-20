import PropTypes from 'prop-types';
import Books from './Books'

const BookShelf = ({shelf, shelfName, books, onShelfChange}) => {
    return(
        <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <Books books={books.filter((book)=> book.shelf === shelf)} onShelfChange={onShelfChange} shelf={shelf} />
                  </ol>
                </div>
              </div>
    )
}

BookShelf.prototype = {
  shelf: PropTypes.string.isRequired,
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelf;