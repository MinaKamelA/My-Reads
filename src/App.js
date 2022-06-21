import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const shelf = ["currentlyReading", "read", "wantToRead"];
  const shelfName = ["Currently Reading", "Read", "Want to Read"];

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    }
    getBooks();
  }, [])

  const changeShelf = async (newShelf, changedBook) => {
    await BooksAPI.update(changedBook, newShelf);
    changedBook.shelf = newShelf;
    setBooks([...books.filter((book) => book.id !== changedBook.id), changedBook]);
  }

  const onSearch = async (query) => {
    const res = await BooksAPI.search(query);
    if (res) {
      const searchBooks = res.map((book) => {
        const bookOnShelf = books.find((shelfBook) =>
          shelfBook.id === book.id
        );
        return ((bookOnShelf) ? bookOnShelf : book);
      });
      setSearchBooks(searchBooks);
    }
  }

  const onSearchClick = () => {
    setSearchBooks([]);
  }
  return (
    <div className="app">
      <Routes>
        <Route path="/search" element={
          <SearchBooks books={searchBooks} searchSubmit={onSearch} onShelfChange={changeShelf} />
        } />
        <Route exact path="/" element={<div className="list-books">
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
            <Link to='/search' onClick={onSearchClick}>Add a book</Link>
          </div>
        </div>} />
      </Routes>
    </div>
  );
}

export default App;
