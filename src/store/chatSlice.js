// src/store/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentUser: { id: 1, name: 'You' },
  isTyping: false,
  editingMessageId: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: state.currentUser,
        timestamp: new Date().toISOString(),
      });
      state.isTyping = false;
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: { id: 2, name: 'Bot' },
        timestamp: new Date().toISOString(),
      });
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    startEditingMessage: (state, action) => {
      state.editingMessageId = action.payload;
    },
    editMessage: (state, action) => {
      const { id, newText } = action.payload;
      const messageToEdit = state.messages.find(msg => msg.id === id);
      if (messageToEdit) {
        messageToEdit.text = newText;
        messageToEdit.edited = true;
      }
      state.editingMessageId = null;
    },
    cancelEditingMessage: (state) => {
      state.editingMessageId = null;
    },
  },
});

export const { 
  sendMessage, 
  receiveMessage, 
  setTyping, 
  startEditingMessage, 
  editMessage, 
  cancelEditingMessage 
} = chatSlice.actions;

export default chatSlice.reducer;