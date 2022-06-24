import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import Books from './Books';

const SearchBooks = ({ books, searchSubmit, onShelfChange, haveError }) => {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
    searchSubmit(event.target.value);
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
            <DebounceInput
              placeholder="Search by title, author, or ISBN"
              name="query"
              value={query}
              debounceTimeout={300}
              onChange={handleChange} />
          </div>
        </div>
        {haveError && <div className="showing-search-error">Your search returned no results.</div>}
        {books.length !== 0 && (
          <div className="showing-search-results">
            showing {books.length} books
          </div>
        )}
        <div className="search-books-results">
          <ol className="books-grid">
            <Books books={books} onShelfChange={onShelfChange} search={true} />
          </ol>
        </div>
      </form>
    </div>
  )
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  haveError: PropTypes.bool.isRequired
}

export default SearchBooks