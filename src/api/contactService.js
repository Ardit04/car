export const sendContactMessage = async (formData) => {
  try {
    const res = await fetch('http://localhost/car/backend/api/contact/create.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); // this line fails if response isn't valid JSON

    if (!res.ok || !data.success) {
      console.error('Server responded with error:', data.message);
      return { success: false, message: data.message || 'Server error' };
    }

    return data;
  } catch (err) {
    console.error('Failed to parse or send:', err);
    return { success: false, message: 'Failed to send message (JSON or network issue)' };
  }
};
