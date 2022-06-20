import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./compnents/BookShelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const shelf = ["currentlyReading", "read", "wantToRead"];
  const shelfName = ["Currently Reading", "Read", "Want to Read"];

  useEffect(()=>{
    const getBooks = async()=>{
      const res = await BooksAPI.getAll();
      setBooks(res);
    }
    getBooks();
  },[])
  const changeShelf = async(newShelf, changedBook) => {
    const res = await BooksAPI.update(changedBook, newShelf);
    changedBook.shelf = newShelf;
    setBooks([...books.filter((book) => book.id !== changedBook.id), changedBook]);
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelf={shelf[0]} shelfName={shelfName[0]} books={books} onShelfChange={changeShelf} />
              <BookShelf shelf={shelf[1]} shelfName={shelfName[1]} books={books} onShelfChange={changeShelf} />
              <BookShelf shelf={shelf[2]} shelfName={shelfName[2]} books={books} onShelfChange={changeShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
