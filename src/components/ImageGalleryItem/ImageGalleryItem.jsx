import { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static defaultProps = {
    id: '',
    tags: '',
    smallFormat: '',
    largeFormat: '',
  };
  render() {
    const { smallFormat, largeFormat, alt, handleModal } = this.props;
    return (
      <li
        className={css.imageGalleryItem}
        onClick={() => {
          handleModal(largeFormat, alt);
        }}
      >
        <img
          className={css.imageGalleryItem_image}
          src={smallFormat}
          alt={alt}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallFormat: PropTypes.string.isRequired,
  largeFormat: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
