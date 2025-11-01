import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../store/slices/userSlice';
import UserCard from '../components/UserCard';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import ConfirmationModal from '../components/ConfirmationModal';
import '../App.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { items: users, status, error } = useSelector(state => state.users);
  
  const [visibleCount, setVisibleCount] = useState(3);
  const [layout, setLayout] = useState('small');
  const [modalState, setModalState] = useState({ type: null, data: null });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const displayedUsers = users.slice(0, visibleCount);

  const handleView = (user) => {
    setModalState({ type: 'view', data: user });
  };

  const handleAdd = () => {
    setModalState({ type: 'add', data: null });
  };

  const handleEdit = (user) => {
    setModalState({ type: 'edit', data: user });
  };

  const handleDelete = (user) => {
    setModalState({ type: 'delete', data: user });
  };

  const handleFormSubmit = (formData) => {
    if (modalState.type === 'edit') {
      dispatch(updateUser({ ...formData, id: modalState.data.id }));
    } else {
      dispatch(addUser({ ...formData, id: Date.now() }));
    }
    setModalState({ type: null, data: null });
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(modalState.data.id));
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
        <h1 className="page-title">Users</h1>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add User
          </button>
          <button className="btn btn-secondary" onClick={handleToggleLayout}>
            Make {layout === 'small' ? 'big' : 'small'} cards
          </button>
          {visibleCount < users.length && (
            <button className="btn btn-secondary" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </div>

      <div className={`cards-container cards-${layout}`}>
        {displayedUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
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
          title="User Info"
        >
          <div className="view-content">
            <h3>{modalState.data.name}</h3>
            <p><strong>Email:</strong> {modalState.data.email}</p>
            <p><strong>Phone:</strong> {modalState.data.phone}</p>
            {modalState.data.username && <p><strong>Username:</strong> {modalState.data.username}</p>}
            {modalState.data.website && <p><strong>Website:</strong> {modalState.data.website}</p>}
          </div>
        </Modal>
      )}

      {(modalState.type === 'add' || modalState.type === 'edit') && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={modalState.type === 'add' ? 'Add User' : 'Edit User'}
        >
          <UserForm
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
          title="Delete User"
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

export default UsersPage;



