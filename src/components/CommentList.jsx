import React, { useState, useEffect } from 'react';
import { getComments } from '../api/commentService';

const CommentList = ({ userId, newComment }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    if (!userId) return;
    try {
      const data = await getComments(userId);
      console.log('Fetched comments:', data);
      if (data.success) {
        setComments(data.comments || []);
      } else {
        console.error('API returned failure:', data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userId]);

  useEffect(() => {
    if (newComment) {
      console.log("New comment detected, refreshing comments from backend...");
      fetchComments();
    }
  }, [newComment]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
