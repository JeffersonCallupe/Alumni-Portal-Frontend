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
    Button,
    IconButton,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';

const FollowingModal = ({ open, onClose, following, onUnfollow, loading }) => {
    const handleUnfollow = async (companyId) => {
        if (onUnfollow) {
            await onUnfollow(companyId);
        }
    };

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
                    Empresas Siguiendo ({following?.length || 0})
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
                ) : following && following.length > 0 ? (
                    <List sx={{ padding: 0 }}>
                        {following.map((item, index) => (
                            <ListItem
                                key={item.id}
                                sx={{
                                    borderBottom: index < following.length - 1 ? '1px solid #E5E7EB' : 'none',
                                    padding: '1rem 1.5rem',
                                    '&:hover': {
                                        backgroundColor: '#F9FAFB',
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={item.companyPhotoUrl}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: '#6F191C',
                                        }}
                                    >
                                        {!item.companyPhotoUrl && <BusinessIcon />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {item.companyName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            {item.companySector || 'Sector no especificado'}
                                        </Typography>
                                    }
                                    sx={{ marginLeft: '1rem' }}
                                />
                                <Button
                                    onClick={() => handleUnfollow(item.companyId)}
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#EF4444',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#DC2626',
                                        },
                                        textTransform: 'none',
                                        fontSize: '0.875rem',
                                        padding: '0.4rem 1rem',
                                    }}
                                >
                                    Dejar de seguir
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ padding: '3rem', textAlign: 'center' }}>
                        <BusinessIcon sx={{ fontSize: 64, color: '#9CA3AF', marginBottom: '1rem' }} />
                        <Typography variant="h6" color="text.secondary">
                            No sigues ninguna empresa
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
                            Explora empresas y comienza a seguirlas
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FollowingModal;
