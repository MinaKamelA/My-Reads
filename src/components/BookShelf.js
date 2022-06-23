import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Books from './Books'

const BookShelf = ({ shelf, shelfName, books, onShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <Droppable droppableId={shelf}>
          {(provided) => (
            <ol className="books-grid" {...provided.droppableProps} ref={provided.innerRef}>
              <Books books={books.filter((book) => book.shelf === shelf)} onShelfChange={onShelfChange} search={false} />
              {provided.placeholder}
            </ol>)}
        </Droppable>
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