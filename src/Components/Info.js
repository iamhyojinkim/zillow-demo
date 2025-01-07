import { useState } from "react";
import Modal from "react-modal";

export default function Info({ name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button className="info" onClick={openModal}>
        Get more info
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Contact Agent"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Contact Agent</h2>
        <button onClick={closeModal} className="close-button">
          X
        </button>
        <form>
          <label>
            Name
            <input type="name" placeholder="Enter name" />
          </label>
          <label>
            Your email
            <input type="email" placeholder="Enter email" />
          </label>
          <label>
            Include message (optional)
            <textarea placeholder={`I am interested in ${name}.`} />
          </label>
          <button type="submit" className="send-button">
            Contact Agent
          </button>
        </form>
      </Modal>
    </>
  );
}
