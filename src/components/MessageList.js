
import React from 'react';
import { List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line no-unused-vars
const MessageList = ({ messages, messagesEndRef, onEdit, editingMessageId }) => (
  <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
    {messages.map((message) => (
      <ListItem 
        key={message.id} 
        sx={{ 
          flexDirection: 'column', 
          alignItems: message.sender.id === 1 ? 'flex-end' : 'flex-start',
          position: 'relative',
        }}
      >
        <Typography variant="caption" sx={{ mb: 1 }}>
          {message.sender.name} - {new Date(message.timestamp).toLocaleTimeString()}
          {message.edited && " (edited)"}
        </Typography>
        <ListItemText 
          primary={message.text}
          sx={{
            bgcolor: message.sender.id === 1 ? 'primary.light' : 'secondary.light',
            p: 1,
            borderRadius: 1,
          }}
        />
        {message.sender.id === 1 && editingMessageId !== message.id && (
          <IconButton 
            size="small" 
            onClick={() => onEdit(message.id)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </ListItem>
    ))}
    <div ref={messagesEndRef} />
  </List>
);







