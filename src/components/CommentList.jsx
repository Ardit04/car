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
        fetchComments();
      } else {
        alert('Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the comment.');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
          >
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">{comment.user_name || 'Unknown User'}</span> said:
            </p>
            <p className="text-sm text-gray-600 italic mb-4">{comment.comment}</p>

            {comment.brand && comment.model && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex justify-center">
                  <img
                    src={`http://localhost/car/backend/uploads/${comment.image_url}`}
                    alt={`${comment.brand} ${comment.model}`}
                    className="w-48 h-auto rounded-md shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <p><span className="font-semibold">Brand:</span> {comment.brand}</p>
                  <p><span className="font-semibold">Model:</span> {comment.model}</p>
                  <p><span className="font-semibold">Year:</span> {comment.year}</p>
                  <p><span className="font-semibold">Price:</span> {comment.price}€</p>
                </div>
              </div>
            )}

            <div className="mt-4 text-end">
              <button
                onClick={() => handleDelete(comment.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
