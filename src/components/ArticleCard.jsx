import { useState } from 'react';
import '../App.css';

const ArticleCard = ({ post, layout, onView, onEdit, onDelete }) => {
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
    <div className={`article-card card-${layout}`} style={cardStyle}>
      <div className="card-header">
        <h3 className="card-title">{post.title}</h3>
      </div>
      <div className="card-body">
        <p className="card-text">{post.body}</p>
      </div>
      <div className="card-actions">
        <button className="btn btn-sm btn-primary" onClick={() => onView(post)}>
          View
        </button>
        <button className="btn btn-sm btn-secondary" onClick={handleChangeColor}>
          Change Color
        </button>
        <button className="btn btn-sm btn-warning" onClick={() => onEdit(post)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(post)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;



