import React from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  onMarkAsUnread: () => void;
  onDeleteConversation: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onMarkAsUnread, onDeleteConversation }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onMarkAsUnread}>Mark as Unread</button>
        <button onClick={onDeleteConversation}>Delete Conversation</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
