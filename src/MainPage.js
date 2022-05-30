import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as API from "./BooksAPI";

class MainPage extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookOnShelf: [],
  };

  componentDidMount() {
    this.getData();
  }

  bookOnShelf(shelf) {
    const books = this.state.bookOnShelf.filter((b) => b.shelf === shelf);
    return books.map((e) => {
      return (
        <li>
          <Book
            book={e}
            onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}
          />
        </li>
      );
    });
  }

  getData() {
    API.getAll().then((e) => {
      this.setState({
        bookOnShelf: e,
      });
    });
  }

  onChangeShelf = (book, shelf) => {
    const update = API.update(book, shelf);
    update.then((e) => {
      this.getData();
    });
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.bookOnShelf("currentlyReading")}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.bookOnShelf("wantToRead")}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">{this.bookOnShelf("read")}</ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
