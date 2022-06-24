import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShelfChanger from './ShelfChanger';
import * as BooksAPI from '../BooksAPI';

const BookDetails = ({ onShelfChange }) => {
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    const [book, setBook] = useState({
        title: "",
        authors: [],
        imageLinks: { thumbnail: "" },
        shelf: "",
        subtitle: "",
        description: "",
        averageRating: 0,
        ratingsCount: 0,
        publishedDate: "",
        publisher: "",
        categories: [],
        industryIdentifiers: [{ identifier: "" }],
        pageCount: 0,
    });

    const bookCover = book.imageLinks ? book.imageLinks.thumbnail : "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg";

    useEffect(() => {
        const getBook = async () => {
            const res = await BooksAPI.get(id);
            setBook(res);
        }
        getBook();
    }, [id])

    return (
        <div className="book-details">
            <div className="list-books-title">
                <h1>{book.title}</h1>
            </div>
            <div className="list-books-content">
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
                    <div className="book-title-details">{book.title}</div>
                    <div className="book-subtitle-details">{book.subtitle}</div>
                    <div className='book-rating-details'>Rating: {(book.averageRating) ? `${book.averageRating}   of 5 based on ${book.ratingsCount} reviews.` : 'No ratings yet'}</div>
                    <div className="book-authors-details">Author(s): {book.authors}</div>
                    <div className="book-description-details">{book.description}</div>
                    <div className="book-technical-details">
                        Technical details
                        <div>ISBN: {book.industryIdentifiers[0].identifier}</div>
                        <div>Published: {book.publishedDate}</div>
                        <div>Page count: {book.pageCount}</div>
                        <div>Categories: {book.categories}</div>
                    </div>
                </div>
            </div>
            <div className="back-home">
                <a href='#na' onClick={() => navigate(-1)}>go back</a>
            </div>
        </div>
    )
}

BookDetails.propTypes = {
    onShelfChange: PropTypes.func.isRequired
}

export default BookDetails