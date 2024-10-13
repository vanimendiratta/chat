
import React from 'react';
import { Box } from '@mui/material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ onEmojiSelect }) => (
  <Box sx={{ position: 'absolute', bottom: '100%', right: 0, zIndex: 1 }}>
    <Picker data={data} onEmojiSelect={onEmojiSelect} />
  </Box>
);

export default EmojiPicker;