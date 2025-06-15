import React, { useState, useEffect } from 'react';
import { getComments } from '../api/commentService';

const CommentList = ({ userId, newComment }) => {
  const [comments, setComments] = useState([]);

  console.log('CommentList component rendered, userId:', userId);

  useEffect(() => {
    if (userId) {
      const fetchComments = async () => {
        try {
          const data = await getComments(userId); // përdor userId nga props
          console.log('Fetched comments:', data);
          if (!data.success) {
            console.error('API returned failure:', data.message);
          }
          setComments(data.comments || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
          setComments([]);
        }
      };

      fetchComments();
    } else {
      console.log('User ID is missing');
    }
  }, [userId]);

useEffect(() => {
  console.log("newComment prop changed:", newComment);
  if (newComment) {
    setComments((prevComments) => [newComment, ...prevComments]);
  }
}, [newComment]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.comment}</p> {/* përdor comment.comment nga backend */}
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
