import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, addArticle, updateArticle, deleteArticle } from '../store/slices/articleSlice';
import ArticleCard from '../components/ArticleCard';
import Modal from '../components/Modal';
import ArticleForm from '../components/ArticleForm';
import ConfirmationModal from '../components/ConfirmationModal';
import '../App.css';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector(state => state.articles);
  
  const [visibleCount, setVisibleCount] = useState(3);
  const [layout, setLayout] = useState('small');
  const [modalState, setModalState] = useState({ type: null, data: null });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [dispatch, status]);

  const displayedPosts = posts.slice(0, visibleCount);

  const handleView = (post) => {
    setModalState({ type: 'view', data: post });
  };

  const handleAdd = () => {
    setModalState({ type: 'add', data: null });
  };

  const handleEdit = (post) => {
    setModalState({ type: 'edit', data: post });
  };

  const handleDelete = (post) => {
    setModalState({ type: 'delete', data: post });
  };

  const handleFormSubmit = (formData) => {
    if (modalState.type === 'edit') {
      dispatch(updateArticle({ ...formData, id: modalState.data.id }));
    } else {
      dispatch(addArticle({ ...formData, id: Date.now() }));
    }
    setModalState({ type: null, data: null });
  };

  const handleConfirmDelete = () => {
    dispatch(deleteArticle(modalState.data.id));
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
        <h1 className="page-title">Articles</h1>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Article
          </button>
          <button className="btn btn-secondary" onClick={handleToggleLayout}>
            Make {layout === 'small' ? 'big' : 'small'} cards
          </button>
          {visibleCount < posts.length && (
            <button className="btn btn-secondary" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </div>

      <div className={`cards-container cards-${layout}`}>
        {displayedPosts.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
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
          title="Article Info"
        >
          <div className="view-content">
            <h3>{modalState.data.title}</h3>
            <p>{modalState.data.body}</p>
          </div>
        </Modal>
      )}

      {(modalState.type === 'add' || modalState.type === 'edit') && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={modalState.type === 'add' ? 'Add Article' : 'Edit Article'}
        >
          <ArticleForm
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
          title="Delete Article"
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

export default ArticlesPage;



