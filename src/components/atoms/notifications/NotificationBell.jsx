import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Box,
    Divider,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import { useUserContext } from '../../../contexts/userContext';
import useNotifications from '../../../hooks/useNotifications';
import NotificationItem from './NotificationItem';

const NotificationBell = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const { userData } = useUserContext();
    const {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
    } = useNotifications();

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (userData?.id) {
            fetchNotifications(userData.id);

            const interval = setInterval(() => {
                fetchNotifications(userData.id);
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [userData, fetchNotifications]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAllAsRead = async () => {
        if (userData?.id) {
            await markAllAsRead(userData.id);
            fetchNotifications(userData.id);
        }
    };

    const fetchItemDetails = async (notification) => {
        setLoadingDetails(true);
        const token = sessionStorage.getItem('token');
        const baseUrl = import.meta.env.VITE_API_URL;

        try {
            let endpoint = '';

            if (notification.type?.includes('JOB_OFFER') && notification.relatedId) {
                endpoint = `${baseUrl}/api/job-offer/${notification.relatedId}`;
            } else if (notification.type?.includes('ACTIVITY') && notification.relatedId) {
                endpoint = `${baseUrl}/api/activity/${notification.relatedId}`;
            }

            if (endpoint) {
                const response = await fetch(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setItemData(data);
                }
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleNavigateFromNotification = async (notification) => {
        setSelectedNotification(notification);
        await fetchItemDetails(notification);
        setDetailsOpen(true);
        handleClose();
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
        setItemData(null);
        setSelectedNotification(null);
    };

    const recentNotifications = notifications.slice(0, 10);

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    color: 'white',
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    max={99}
                >
                    <NotificationsIcon sx={{ fontSize: 32 }} />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        marginTop: '8px',
                    },
                }}
            >
                <Box sx={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Notificaciones
                    </Typography>
                    {unreadCount > 0 && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#3B82F6',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                            onClick={handleMarkAllAsRead}
                        >
                            Marcar todas como leídas
                        </Typography>
                    )}
                </Box>
                <Divider />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <CircularProgress size={32} />
                    </Box>
                ) : recentNotifications.length === 0 ? (
                    <Box sx={{ padding: '40px', textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No tienes notificaciones
                        </Typography>
                    </Box>
                ) : (
                    recentNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            onNavigate={handleNavigateFromNotification}
                        />
                    ))
                )}

                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        window.location.href = '/notifications';
                    }}
                    sx={{
                        justifyContent: 'center',
                        color: '#3B82F6',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#EFF6FF',
                        },
                    }}
                >
                    Ver todas las notificaciones
                </MenuItem>
            </Menu>

            {/* Modal de detalles */}
            <Dialog
                open={detailsOpen}
                onClose={handleCloseDetails}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedNotification?.type?.includes('JOB_OFFER') ? 'Oferta Laboral' : 'Actividad'}
                    </Typography>
                    <IconButton onClick={handleCloseDetails} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {loadingDetails ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <CircularProgress />
                        </Box>
                    ) : itemData ? (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
                                {itemData.title}
                            </Typography>

                            {itemData.companyName && (
                                <Typography variant="subtitle1" sx={{ color: '#6B7280', marginBottom: '8px' }}>
                                    <strong>Empresa:</strong> {itemData.companyName}
                                </Typography>
                            )}

                            <Typography variant="body1" sx={{ marginBottom: '16px', lineHeight: 1.6 }}>
                                {itemData.description}
                            </Typography>

                            {itemData.area && (
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: '16px' }}>
                                    {itemData.area && (
                                        <Box sx={{ padding: '4px 12px', backgroundColor: '#EFF6FF', borderRadius: '16px', fontSize: '0.875rem' }}>
                                            Área: {itemData.area}
                                        </Box>
                                    )}
                                    {itemData.modality && (
                                        <Box sx={{ padding: '4px 12px', backgroundColor: '#F0FDF4', borderRadius: '16px', fontSize: '0.875rem' }}>
                                            {itemData.modality}
                                        </Box>
                                    )}
                                    {itemData.nivel && (
                                        <Box sx={{ padding: '4px 12px', backgroundColor: '#FEF3C7', borderRadius: '16px', fontSize: '0.875rem' }}>
                                            {itemData.nivel}
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {itemData.eventType && (
                                <Box sx={{ marginTop: '16px' }}>
                                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                        <strong>Tipo:</strong> {itemData.eventType}
                                    </Typography>
                                    {itemData.location && (
                                        <Typography variant="body2" sx={{ color: '#6B7280', marginTop: '4px' }}>
                                            <strong>Ubicación:</strong> {itemData.location}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No se pudo cargar la información
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NotificationBell;
