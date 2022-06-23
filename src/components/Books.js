import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShelfChanger from './ShelfChanger';

const Books = ({ books, onShelfChange }) => {
    return (
        books.map((book) => {
            const bookCover = book.imageLinks ? book.imageLinks.thumbnail : "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg";
            return (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                        `url(${bookCover})`,
                                    backgroundSize: "contain",
                                }}
                            ></div>
                            <ShelfChanger onShelfChange={onShelfChange} book={book} />
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                        <Link to="/book" state={{ id: book.id }}>Show more</Link>
                    </div>
                </li>
            )
        })
    )
}

Books.prototype = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Books;