import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, addPhoto, updatePhoto, deletePhoto } from '../store/slices/photoSlice';
import PhotoCard from '../components/PhotoCard';
import Modal from '../components/Modal';
import PhotoForm from '../components/PhotoForm';
import ConfirmationModal from '../components/ConfirmationModal';
import '../App.css';

const PhotosPage = () => {
  const dispatch = useDispatch();
  const { items: photos, status, error } = useSelector(state => state.photos);
  
  const [visibleCount, setVisibleCount] = useState(3);
  const [layout, setLayout] = useState('small');
  const [modalState, setModalState] = useState({ type: null, data: null });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhotos());
    }
  }, [dispatch, status]);

  const displayedPhotos = photos.slice(0, visibleCount);

  const handleView = (photo) => {
    setModalState({ type: 'view', data: photo });
  };

  const handleAdd = () => {
    setModalState({ type: 'add', data: null });
  };

  const handleEdit = (photo) => {
    setModalState({ type: 'edit', data: photo });
  };

  const handleDelete = (photo) => {
    setModalState({ type: 'delete', data: photo });
  };

  const handleFormSubmit = (formData) => {
    if (modalState.type === 'edit') {
      dispatch(updatePhoto({ ...formData, id: modalState.data.id }));
    } else {
      dispatch(addPhoto({ ...formData, id: Date.now() }));
    }
    setModalState({ type: null, data: null });
  };

  const handleConfirmDelete = () => {
    dispatch(deletePhoto(modalState.data.id));
    setModalState({ type: null, data: null });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, data: null });
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleToggleLayout = () => {
    setLayout(prev => prev === 'small' ? 'large' : 'small');
  };

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Photos</h1>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Photo
          </button>
          <button className="btn btn-secondary" onClick={handleToggleLayout}>
            Make {layout === 'small' ? 'big' : 'small'} cards
          </button>
          {visibleCount < photos.length && (
            <button className="btn btn-secondary" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </div>

      <div className={`cards-container cards-${layout}`}>
        {displayedPhotos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            layout={layout}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {modalState.type === 'view' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="Photo Info"
        >
          <div className="view-content">
            <h3>{modalState.data.title}</h3>
            <img src={modalState.data.url} alt={modalState.data.title} className="photo-image-modal" />
          </div>
        </Modal>
      )}

      {(modalState.type === 'add' || modalState.type === 'edit') && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={modalState.type === 'add' ? 'Add Photo' : 'Edit Photo'}
        >
          <PhotoForm
            initialData={modalState.data}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      {modalState.type === 'delete' && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title="Delete Photo"
        >
          <ConfirmationModal
            message="Do you really want to delete this card?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default PhotosPage;



