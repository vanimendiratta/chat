
import React from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const MessageInput = ({ 
  input, 
  setInput, 
  handleSend, 
  showEmojiPicker, 
  setShowEmojiPicker,
  isEditing,
  onCancelEdit
}) => (
  <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder={isEditing ? "Edit your message" : "Type a message"}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <EmojiEmotionsIcon />
          </IconButton>
        ),
      }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSend}
      >
        {isEditing ? "Save" : "Send"}
      </Button>
      {isEditing && (
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onCancelEdit}
        >
          Cancel
        </Button>
      )}
    </Box>
  </Box>
);