import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

const Books = ({ books, onShelfChange }) => {
    return (
        books.map((book) => {
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
                                        `url(${book.imageLinks.thumbnail})`,
                                }}
                            ></div>
                            <ShelfChanger onShelfChange={onShelfChange} book={book} />
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
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