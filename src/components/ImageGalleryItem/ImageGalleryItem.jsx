import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({
  handleModal,
  alt,
  smallFormat,
  largeFormat,
}) {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => {
        handleModal(largeFormat, alt);
      }}
    >
      <img className={css.imageGalleryItem_image} src={smallFormat} alt={alt} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallFormat: PropTypes.string.isRequired,
  largeFormat: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
