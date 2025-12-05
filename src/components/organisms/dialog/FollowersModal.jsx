import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const FollowersModal = ({ open, onClose, followers, loading }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    maxHeight: '80vh',
                }
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: '#6F191C',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h6" sx={{ color: 'white' }}>
                    Seguidores ({followers?.length || 0})
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ padding: 0 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <CircularProgress sx={{ color: '#6F191C' }} />
                    </Box>
                ) : followers && followers.length > 0 ? (
                    <List sx={{ padding: 0 }}>
                        {followers.map((item, index) => (
                            <ListItem
                                key={item.id}
                                sx={{
                                    borderBottom: index < followers.length - 1 ? '1px solid #E5E7EB' : 'none',
                                    padding: '1rem 1.5rem',
                                    '&:hover': {
                                        backgroundColor: '#F9FAFB',
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: '#6F191C',
                                        }}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {`${item.userName} ${item.userPaternalSurname} ${item.userMaternalSurname || ''}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            {item.userEmail}
                                        </Typography>
                                    }
                                    sx={{ marginLeft: '1rem' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ padding: '3rem', textAlign: 'center' }}>
                        <PersonIcon sx={{ fontSize: 64, color: '#9CA3AF', marginBottom: '1rem' }} />
                        <Typography variant="h6" color="text.secondary">
                            Aún no tienes seguidores
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
                            Comparte tu perfil para que más personas te sigan
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FollowersModal;
