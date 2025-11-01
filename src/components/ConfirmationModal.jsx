import '../App.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <p className="confirmation-message">{message}</p>
      <div className="confirmation-buttons">
        <button className="btn btn-primary" onClick={onConfirm}>
          Yes
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;



