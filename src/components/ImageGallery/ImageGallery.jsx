import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { FetchImages } from './FetchImages';
import { toast } from 'react-toastify';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static defaultProps = {
    page: 1,
    query: '',
  };

  state = {
    images: [],
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page, onFetchImages, handleStatus } = this.props;
    const prevQuery = prevProps.query;
    const prevPage = prevProps.page;
    if (prevQuery !== query) {
      this.setState({ images: [] });
    }
    if (prevQuery !== query || prevPage !== page) {
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
            this.setState({ images: [] });
            onFetchImages(0);
            handleStatus('idle');
            return;
          }
          if (prevQuery !== query) {
            this.setState({ images: sortedImages });
            onFetchImages(images.totalHits);
            handleStatus('resolved');
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...sortedImages],
          }));
          onFetchImages(images.totalHits);
          handleStatus('resolved');
        })
        .catch(error => this.setState({ error }));
    }
  }
  render() {
    const { images, error } = this.state;
    const { handleModal } = this.props;
    return (
      <div>
        {images.length > 0 && (
          <ul className={css.imageGallery}>
            {this.state.error && error.message}
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
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onFetchImages: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired,
};
