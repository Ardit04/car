import React, { useEffect, useState } from "react";
import { getContactMessages, deleteMessage, replyToMessage } from "../api/contactService";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replyData, setReplyData] = useState({ subject: "", message: "" });
  const [replyingToId, setReplyingToId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getContactMessages();
    setMessages(data);
  };

const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        loadCars();
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const handleReplyChange = (e) => {
    setReplyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStartReply = (id) => {
    setReplyingToId(id);
    setReplyData({ subject: "", message: "" });
  };

  const handleSendReply = async (email) => {
    if (!replyData.message.trim()) {
      alert("Please enter a reply message before sending.");
      return;
    }
    const result = await replyToMessage({
      email,
      subject: replyData.subject || "Reply from Admin",
      message: replyData.message,
    });
    alert(result.message);
    if (result.success) {
      setReplyingToId(null);
      setReplyData({ subject: "", message: "" });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded bg-white shadow">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleStartReply(msg.id)}
                  className="text-blue-600 hover:underline"
                >
                  Reply
                </button>
              </div>

              {replyingToId === msg.id && (
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject (optional)"
                    value={replyData.subject}
                    onChange={handleReplyChange}
                    className="border rounded p-2 w-full"
                  />
                  <textarea
                    name="message"
                    placeholder="Write reply message..."
                    value={replyData.message}
                    onChange={handleReplyChange}
                    className="border rounded p-2 w-full"
                    rows={3}
                  />
                  <button
                    onClick={() => handleSendReply(msg.email)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send Reply
                  </button>
                  <button
                    onClick={() => setReplyingToId(null)}
                    className="ml-4 text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
