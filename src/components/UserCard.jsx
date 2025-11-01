import { useState } from 'react';
import '../App.css';

const UserCard = ({ user, layout, onView, onEdit, onDelete }) => {
  const [color, setColor] = useState('default');

  const handleChangeColor = () => {
    const colors = ['default', '#e0cffe', '#1a1a1a', '#f9a826'];
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    setColor(colors[nextIndex]);
  };

  const cardStyle = {
    backgroundColor: color === 'default' ? '#ffffff' : color,
    color: color === '#1a1a1a' ? '#ffffff' : '#000000',
  };

  return (
    <div className={`user-card card-${layout}`} style={cardStyle}>
      <div className="card-header">
        <h3 className="card-title">{user.name}</h3>
      </div>
      <div className="card-body">
        <p className="card-text"><strong>Email:</strong> {user.email}</p>
        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
        {user.username && <p className="card-text"><strong>Username:</strong> {user.username}</p>}
        {user.website && <p className="card-text"><strong>Website:</strong> {user.website}</p>}
      </div>
      <div className="card-actions">
        <button className="btn btn-sm btn-primary" onClick={() => onView(user)}>
          View
        </button>
        <button className="btn btn-sm btn-secondary" onClick={handleChangeColor}>
          Change Color
        </button>
        <button className="btn btn-sm btn-warning" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(user)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;



