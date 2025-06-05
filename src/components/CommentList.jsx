import React, { useState, useEffect } from 'react';
import { getComments } from '../api/commentService'; // Correct import

const CommentList = ({ userId, newComment }) => {
  const [comments, setComments] = useState([]);
console.log('CommentList component rendered', userId); // Debugging line
  useEffect(() => {
    if (userId) {
      const fetchComments = async () => {
        try {
          const data = await getComments(7); // Fetch comments for the user ARDIT
          
          console.log('Fetched comments:', data); // Debug the response
          setComments(data.comments || []); // Ensure comments is always an array
        } catch (error) {
          setComments([]); // Default to an empty array on error
        }
      };
      fetchComments();
    } else {
      console.log('User ID is missing');
    }
  }, [userId]);

  // Add new comment to the list when it changes
  useEffect(() => {
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
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentList;
