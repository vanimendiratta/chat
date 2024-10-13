// src/components/Chat.js
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { 
  sendMessage, 
  receiveMessage, 
  setTyping, 
  startEditingMessage, 
  editMessage, 
  cancelEditingMessage 
} from '../store/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmojiPicker from './EmojiPicker';

const Chat = () => {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const editingMessageId = useSelector((state) => state.chat.editingMessageId);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (input && !isTyping) {
      dispatch(setTyping(true));
    } else if (!input && isTyping) {
      dispatch(setTyping(false));
    }
  }, [input, isTyping, dispatch]);

  const handleSend = () => {
    if (input.trim()) {
      if (editingMessageId) {
        dispatch(editMessage({ id: editingMessageId, newText: input }));
      } else {
        dispatch(sendMessage(input));
        
        // Simulate receiving a message
        setTimeout(() => {
          dispatch(receiveMessage('This is a mock response.'));
        }, 1000);
      }
      setInput('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput(prevInput => prevInput + emoji.native);
  };

  const handleEdit = (id) => {
    dispatch(startEditingMessage(id));
    const messageToEdit = messages.find(msg => msg.id === id);
    if (messageToEdit) {
      setInput(messageToEdit.text);
    }
  };

  const handleCancelEdit = () => {
    dispatch(cancelEditingMessage());
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 600, margin: 'auto' }}>
      <MessageList 
        messages={messages} 
        messagesEndRef={messagesEndRef} 
        onEdit={handleEdit}
        editingMessageId={editingMessageId}
      />
      {isTyping && (
        <Typography variant="caption" sx={{ p: 1, fontStyle: 'italic' }}>
          Someone is typing...
        </Typography>
      )}
      <MessageInput 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        isEditing={!!editingMessageId}
        onCancelEdit={handleCancelEdit}
      />
      {showEmojiPicker && <EmojiPicker onEmojiSelect={handleEmojiSelect} />}
    </Box>
  );
};

export default Chat;