import PropTypes from 'prop-types';

const ShelfChanger = ({shelf, onShelfChange, book}) => {

    const handleChange = (event) => {
        onShelfChange(event.target.value, book);
    }
    return(
        <div className="book-shelf-changer">
            <select value={shelf} onChange={handleChange}>
                <option value="none" disabled>
                Move to...
                </option>
                <option value="currentlyReading">
                Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

ShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

export default ShelfChanger;