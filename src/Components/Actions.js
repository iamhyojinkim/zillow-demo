import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { login } from "./api/firebase";
import { useProperty } from "./api/Context";
import emailjs from "emailjs-com";

Modal.setAppElement("#root");

export default function Actions({ itemId }) {
  const { user } = useProperty();
  const [likedItems, setLikedItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipientEmail: "",
    senderEmail: "",
    message: "",
  });

  useEffect(() => {
    const savedLikedItems =
      JSON.parse(localStorage.getItem("likedItems")) || {};
    setLikedItems(savedLikedItems);
  }, []);

  const handleToggle = () => {
    if (!user) {
      login();
      return;
    }
    const newLikedItems = { ...likedItems, [itemId]: !likedItems[itemId] };
    setLikedItems(newLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(newLikedItems));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_email: formData.recipientEmail,
          sender_email: formData.senderEmail,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        () => {
          alert("Email sent successfully!");
          setFormData({ recipientEmail: "", senderEmail: "", message: "" });
          closeModal();
        },
        () => {
          alert("Failed to send email");
        }
      );
  };

  return (
    <>
      <div className="action-buttons">
        <div onClick={handleToggle} className="save-button">
          {user && likedItems[itemId] ? <FaHeart color="red" /> : <CiHeart />}
          Save
        </div>
        <div onClick={openModal} className="share-button">
          <FaRegShareFromSquare /> Share
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Contact Agent"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Share this home</h2>
        <button onClick={closeModal} className="close-button">
          X
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Recipient's email
            <input
              type="email"
              name="recipientEmail"
              placeholder="Enter recipient's email"
              value={formData.recipientEmail}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recipientEmail: e.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Your email
            <input
              type="email"
              name="senderEmail"
              placeholder="Enter your email"
              value={formData.senderEmail}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  senderEmail: e.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Include message (optional)
            <textarea
              name="message"
              placeholder="Check out this home I found."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </label>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </Modal>
    </>
  );
}
