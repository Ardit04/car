export const sendContactMessage = async (formData) => {
  const res = await fetch('http://localhost/carshop/backend/api/Contact/create.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res.json();
};