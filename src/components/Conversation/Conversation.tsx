import React from 'react';
import { data } from '../../data/data';
import './Conversation.css';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ConversationProps {
  userId: string;
  onMenuIconClick: (isContactListVisible: boolean) => void; 
}

const Conversation: React.FC<ConversationProps> = ({ userId, onMenuIconClick }) => {
  const contact = data.find(contact => contact.userId === userId);
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div className="conversation">
      <div className="conversation-header-wrapper">
        <div className="conversation-header">
          <img src={contact?.profilePictureURL} alt={contact?.name} className="avatar" />
          <div>
            <div className="conversation-name">{contact?.name}</div>
            <div className="conversation-status">Online</div>
          </div>
        </div>
          {isMobile && <div><MenuIcon className="hamburger-menu" onClick={() => onMenuIconClick(true)}/></div>}
      </div>

      <div className="conversation-messages">
        {contact?.chat.length ? (
          contact.chat.map((message, index) => (
            <div key={index} className={`message ${message.user === 'you' ? 'sent' : 'received'}`}>
              <div className="message-text">{message.message}</div>
              <div className="message-time">{message.timeStamp}</div>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages yet</div>
        )}
      </div>
      <div className="conversation-input">
        <input 
          type="text" 
          placeholder="Type a message"
        />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Conversation;
