import React, { useState } from 'react';
import { data as initialData } from '../../data/data';
import './ContactList.css';
import Modal from '../Modal/Modal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useMediaQuery from '@mui/material/useMediaQuery';


interface ContactListProps {
  onSelectContact: (userId: string) => void;
  onDeleteContact: (userId: string) => void;
  onBackArrowClick: (isContactListVisible: boolean) => void; 
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, onDeleteContact, onBackArrowClick }) => {
  const [contacts, setContacts] = useState(initialData);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleThreeDotsClick = (userId: string) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleMarkAsUnread = () => {
    if (selectedUserId) {
      setContacts(contacts.map(contact => {
        if (contact.userId === selectedUserId) {
          contact.unreadCount = 1;
        }
        return contact;
      }));
      setModalVisible(false);
    }
  };

  const handleDeleteConversation = () => {
    if (selectedUserId) {
      setContacts(contacts.map(contact => {
        if (contact.userId === selectedUserId) {
          contact.chat = [];
          contact.unreadCount = 0;
        }
        return contact;
      }));
      setModalVisible(false);
      onDeleteContact(selectedUserId);
    }
  };

  const handleContactClick = (userId: string) => {
    setContacts(contacts.map(contact => {
      if (contact.userId === userId) {
        contact.unreadCount = 0;
      }
      return contact;
    }));
    onSelectContact(userId);
  };

  return (
    <div className="contact-list">
      <div className="chat-header-wrapper">
        {isMobile && <div><ArrowBackIosNewIcon className="back-arrow" onClick={() => onBackArrowClick(false)} /></div>}

        <p className="chats-header">
          Chats
        </p>
      </div>
      {contacts.map(contact => (
        <div key={contact.userId} className="contact-list-item" onClick={() => handleContactClick(contact.userId)}>
          <div className="contact-list-item-info">
            <img src={contact.profilePictureURL} alt={contact.name} className="avatar" />
            <div>
              <div className="contact-name">{contact.name}</div>
              <div className="contact-last-message">
                {contact.chat.length > 0 ? contact.chat[contact.chat.length - 1].message : 'No messages yet'}
              </div>
            </div>
          </div>
          {contact.unreadCount > 0 && <div className="contact-unread-count">{contact.unreadCount}</div>}
          <button className="three-dots-btn" onClick={(e) => { e.stopPropagation(); handleThreeDotsClick(contact.userId); }}>⋮</button>
        </div>
      ))}
      {modalVisible && (
        <Modal
          onClose={handleModalClose}
          onMarkAsUnread={handleMarkAsUnread}
          onDeleteConversation={handleDeleteConversation}
        />
      )}
    </div>
  );
};

export default ContactList;
