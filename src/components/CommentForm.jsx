import React, { useState } from 'react';

const CommentForm = ({ userId, carId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { user_id: userId, text: comment, car_id: carId }; // Use carId from props
    console.log('Data being sent to the server:', newComment);

    try {
      const response = await fetch('http://localhost/car/backend/api/comments/create_comment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        alert(data.message);
        setComment(''); // Clear the input field

        if (onCommentAdded) {
          onCommentAdded({ id: data.comment_id, text: comment });
        }
      } else {
        alert(data.message || 'Failed to create comment.');
      }
    } catch (error) {
      console.error('Error while submitting the comment:', error);
      alert('An error occurred while connecting to the server.');
    }
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
