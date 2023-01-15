import { Component } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import css from '../SearchBar/SearchBar.module.css';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleFormSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      toast.warning('Enter search query');
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });
    e.target.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <FcSearch style={{ height: 24, width: 24 }} />
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
