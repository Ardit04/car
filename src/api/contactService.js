const BASE_URL = "http://localhost/car/backend/api/contact";

export const sendContactMessage = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Send contact message error:", err);
    return { success: false, message: "Failed to send message." };
  }
};

export const getContactMessages = async () => {
  try {
    const res = await fetch(`${BASE_URL}/read_all.php`);
    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Get contact messages error:", err);
    return [];
  }
};

export const replyToMessage = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/reply.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Reply error:", err);
    return { success: false, message: "Failed to send email." };
  }
};

export const deleteMessage = async (id) => {
  const response = await fetch(`${BASE_URL}/delete.php?id=${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};
