import PropTypes from "prop-types";
import React, { Component } from "react";
import * as API from "./BooksAPI";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    onChangeShelf: PropTypes.func,
  };

  componentDidMount() {
    const update = API.get(this.props.book.id);
    update.then((e) => {}).catch((err) => {});
  }

  render() {
    const { book, onChangeShelf } = this.props;
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(event) => onChangeShelf(book, event.target.value)}
                value={book.shelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title ? book.title : ""}</div>
          <div className="book-authors">{book.authors ? book.authors : []}</div>
        </div>
      </div>
    );
  }
}

export default Book;
