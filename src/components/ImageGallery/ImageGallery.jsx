import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { FetchImages } from '../../services/API/FetchImages';
import { toast } from 'react-toastify';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({
  page,
  query,
  setImagesQuantity,
  handleStatus,
  handleModal,
}) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    handleStatus('pending');
    FetchImages(query, page)
      .then(images => {
        const sortedImages = images.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        }));
        if (sortedImages.length === 0) {
          toast.error(`There are no images with query ${query}`);
          setImages([]);
          setImagesQuantity(0);
          handleStatus('idle');
          return;
        }
        if (page === 1) {
          setImages(sortedImages);
          setImagesQuantity(images.totalHits);
          handleStatus('resolved');
          return;
        }
        setImages(prevImages => [...prevImages, ...sortedImages]);
        setImagesQuantity(images.totalHits);
        handleStatus('resolved');
      })
      .catch(error => setError(error));
  }, [handleStatus, page, query, setImagesQuantity]);

  return (
    <div>
      {images.length > 0 && (
        <ul className={css.imageGallery}>
          {error && error.message}
          {images.map(({ webformatURL, largeImageURL, tags, id }) => {
            return (
              <ImageGalleryItem
                smallFormat={webformatURL}
                largeFormat={largeImageURL}
                alt={tags}
                handleModal={handleModal}
                key={id}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  setImagesQuantity: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired,
};
