import { Component } from 'react';
import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    const { onLoadMore } = this.props;
    return (
      <button className={css.button} type="button" onClick={onLoadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
