import { debounce } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";
import * as API from "./BooksAPI";

class Search extends Component {
  state = {
    books: [],
    bookOnShelf: [],
  };

  componentDidMount() {
    API.getAll().then((e) => {
      this.setState({
        bookOnShelf: e,
      });
    });
  }

  onSearch = debounce((e) => {
    this.search(e);
  }, 500);

  search(e) {
    API.search(e.trim())
      .then((e) => {
        e = e.map((el) => {
          const onShelf = this.state.bookOnShelf.find((s) => el.id === s.id);
          if (onShelf) {
            el.shelf = onShelf.shelf;
          }
          return el;
        });
        this.setState({ books: e });
      })
      .catch((err) => {
        this.setState({ books: [] });
      });
  }

  onChangeShelf = (book, shelf) => {
    const update = API.update(book, shelf);
    update.then((e) => {}).catch((err) => {});
  };

  renderContent = () => {
    if (this.state.books && this.state.books.length) {
      return (
        <ol className="books-grid">
          {this.state.books.map((book, i) => {
            return (
              <li>
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={(book, shelf) =>
                    this.onChangeShelf(book, shelf)
                  }
                />
              </li>
            );
          })}
        </ol>
      );
    }
  };
  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>

            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.onSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
        <div className="list-books">
          <div className="list-books-content" />
          <div className="bookshelf">
            <div className="bookshelf-books">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
