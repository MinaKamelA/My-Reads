import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { DragDropContext } from "react-beautiful-dnd";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import SearchBooks from "./components/SearchBooks";
import BookDetails from "./components/BookDetails";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const shelf = ["currentlyReading", "read", "wantToRead"];
  const shelfName = ["Currently Reading", "Read", "Want to Read"];
  const [searchError, setSearchError] = useState(false);

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
    if (query.length > 0) {
      const res = await BooksAPI.search(query);
      if (!res.error) {
        const searchBooks = res.map((book) => {
          const bookOnShelf = books.find((shelfBook) =>
            shelfBook.id === book.id
          );
          return ((bookOnShelf) ? bookOnShelf : book);
        });
        setSearchBooks(searchBooks);
        setSearchError(false);
      }
      else {
        setSearchBooks([]);
        setSearchError(true);
      }
    }
    else {
      setSearchBooks([]);
      setSearchError(false);
    }
  }

  const onSearchClick = () => {
    setSearchBooks([]);
    setSearchError(false);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const getBook = async () => {
      const res = await BooksAPI.get(result.draggableId);
      changeShelf(result.destination.droppableId, await res);
    }
    getBook();
  }
  return (
    <div className="app">
      <Routes>
        <Route path="/search" element={
          <SearchBooks books={searchBooks} searchSubmit={onSearch} onShelfChange={changeShelf} haveError={searchError} />
        } />
        <Route exact path="/" element={<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <BookShelf shelf={shelf[0]} shelfName={shelfName[0]} books={books} onShelfChange={changeShelf} />
                <BookShelf shelf={shelf[1]} shelfName={shelfName[1]} books={books} onShelfChange={changeShelf} />
                <BookShelf shelf={shelf[2]} shelfName={shelfName[2]} books={books} onShelfChange={changeShelf} />
              </DragDropContext>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' onClick={onSearchClick}>Add a book</Link>
          </div>
        </div>} />
        <Route path="/book/:id" element={<BookDetails onShelfChange={changeShelf} />} />
      </Routes>
    </div>
  );
}

export default App;
