import { useState } from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';

const SearchBooks = ({ books, searchSubmit, onShelfChange, currentBooks }) => {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  const submitQuery = (event) => {
    event.preventDefault();
    searchSubmit(query);
  }
  return (
    <div className="search-books">
      <form onSubmit={submitQuery}>
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              name="query"
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Books books={books} onShelfChange={onShelfChange} />
          </ol>
        </div>
      </form>
    </div>
  )
}

SearchBooks.propTypes = {}

export default SearchBooks