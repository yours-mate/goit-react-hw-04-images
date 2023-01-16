import { useState } from 'react';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imagesQuantity, setImagesQuantity] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [srcModal, setSrcModal] = useState('');
  const [altModal, setAltModal] = useState('');

  const onFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleModal = (source, alt) => {
    setSrcModal(source);
    setAltModal(alt);
    setShowModal(showModal => !showModal);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      {showModal && (
        <Modal handleModal={handleModal}>
          <img src={srcModal} alt={altModal} />
        </Modal>
      )}
      <SearchBar onSubmit={onFormSubmit} />
      <ImageGallery
        query={query}
        page={page}
        setImagesQuantity={setImagesQuantity}
        handleStatus={setStatus}
        handleModal={handleModal}
      />
      {status === 'pending' && <Loader />}
      {imagesQuantity > 12 && status === 'resolved' && (
        <Button onLoadMore={onLoadMore} />
      )}
      <ToastContainer />
    </div>
  );
}
