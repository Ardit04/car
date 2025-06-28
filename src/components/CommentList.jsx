import React, { useState, useEffect } from 'react';
import { getComments, deleteComment } from '../api/commentService';

const CommentList = ({ userId, newComment }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const data = await getComments(userId);
      if (data.success) setComments(data.comments || []);
    } catch (error) {
      console.error(error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userId]);

  useEffect(() => {
    if (newComment) fetchComments();
  }, [newComment]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const data = await deleteComment(id);
      if (data.success) {
        // Refresh comments pas fshirjes
        fetchComments();
      } else {
        alert('Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting comment.');
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <p><strong>{comment.user_name || 'Unknown User'}</strong> said:</p>
            <p>{comment.comment}</p>
            <button
              onClick={() => handleDelete(comment.id)}
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
