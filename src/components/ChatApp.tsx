import React, { useEffect, useState } from 'react';
import ContactList from './ContactList/ContactList';
import Conversation from './Conversation/Conversation';
import './ChatApp.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const ChatApp: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [contactListVisibleOnMobile, setContactListVisibleOnMobile] = useState<boolean>(true);
  const [contactConversationOnMobile, setContactConversationOnMobile] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  useEffect(() => {
    if (!isMobile) {
      setContactListVisibleOnMobile(true);
      setContactConversationOnMobile(true);
    } else {
      setContactListVisibleOnMobile(true);
      setContactConversationOnMobile(false);
    }
  }, [isMobile]);

  const handleSelectContact = (userId: string) => {
    if (isMobile) {
      handleMenuToggle(false);
    }
    setSelectedUserId(userId);
  };

  const handleDeleteContact = (userId: string) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
  };

  const handleMenuToggle = (isContactListVisible: boolean) => {
    setContactListVisibleOnMobile(isContactListVisible);
    setContactConversationOnMobile(!isContactListVisible);
  }

  
  return (
    <div className="chat-app">

      {contactListVisibleOnMobile && (<div className="chat-list">
        <ContactList
          onSelectContact={handleSelectContact}
          onDeleteContact={handleDeleteContact}
          onBackArrowClick={handleMenuToggle}
        />
      </div>)}

      {contactConversationOnMobile && <div className="chat-conversation">
        {selectedUserId ? 
        <Conversation 
          userId={selectedUserId} 
          onMenuIconClick={handleMenuToggle}
          /> : 
          <div className="no-conversation">
            <p>Select a contact to view conversation</p>
            {isMobile && <button onClick={() => handleMenuToggle(true)}>Contacts</button>}
          </div>}
      </div>}
    </div>
  );
};

export default ChatApp;
