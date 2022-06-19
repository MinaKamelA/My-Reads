import PropTypes from 'prop-types';

const ShelfChanger = ({shelf}) => {
    return(
        <div className="book-shelf-changer">
            <select>
                <option value="none" disabled>
                Move to...
                </option>
                <option value="currentlyReading" selected={shelf==='currentlyReading'}>
                Currently Reading
                </option>
                <option value="wantToRead" selected={shelf==='wantToRead'}>Want to Read</option>
                <option value="read" selected={shelf==='read'}>Read</option>
                <option value="none" selected={shelf==='none'}>None</option>
            </select>
        </div>
    )
}

ShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired
}

export default ShelfChanger;