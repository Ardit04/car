const BASE_URL = 'http://localhost/car/backend/api/comments';

export const getComments = async (userId = null) => {
  let url = 'http://localhost/car/backend/api/comments/index_comment.php';
  if (userId) {
    url += `?user_id=${userId}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};



export const createComment = async (comment) => {
  const res = await fetch(`${BASE_URL}/create_comment.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!res.ok) {
    throw new Error('Failed to create comment');
  }
  return res.json();
};

export const updateComment = async (id, text) => {
  const res = await fetch(`${BASE_URL}/update.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    throw new Error('Failed to update comment');
  }
  return res.json();
};

export const deleteComment = async (id) => {
  const res = await fetch(`${BASE_URL}/delete_comment.php?id=${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete comment');
  return res.json();
};

