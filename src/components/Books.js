import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import ShelfChanger from './ShelfChanger';

const Books = ({ books, onShelfChange, search }) => {
    return (
        books.map((book, index) => {
            const bookCover = book.imageLinks ? book.imageLinks.thumbnail : "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg";
            if (search) {
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
                            <Link to={`/book/${book.id}`} state={{ id: book.id }}><button>Show more</button></Link>
                        </div>
                    </li>
                )
            }
            return (
                <Draggable key={book.id} draggableId={book.id} index={index}>
                    {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                                <Link to={`/book/${book.id}`} state={{ id: book.id }}><button>Show more</button></Link>
                            </div>
                        </li>
                    )}
                </Draggable>
            )
        })
    )
}

Books.prototype = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    search: PropTypes.bool.isRequired
}

export default Books;