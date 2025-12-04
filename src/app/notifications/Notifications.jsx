import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import HomeBase from '../../components/templates/home/HomeBase';
import NotificationItem from '../../components/atoms/notifications/NotificationItem';
import useNotifications from '../../hooks/useNotifications';
import { useUserContext } from '../../contexts/userContext';

const Notifications = () => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const { userData } = useUserContext();
    const {
        notifications,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
    } = useNotifications();

    useEffect(() => {
        if (userData?.id) {
            fetchNotifications(userData.id);
        }
    }, [userData, fetchNotifications]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleMarkAllAsRead = async () => {
        if (userData?.id) {
            await markAllAsRead(userData.id);
            refreshNotifications(userData.id);
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
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
        setItemData(null);
        setSelectedNotification(null);
    };

    const filteredNotifications = notifications.filter(notif => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return !notif.read;
        if (tabValue === 2) return notif.read;
        return true;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <HomeBase>
            <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        color: '#111827',
                    }}
                >
                    Notificaciones
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Todas" />
                        <Tab label={`No leídas (${unreadCount})`} />
                        <Tab label="Leídas" />
                    </Tabs>

                    {unreadCount > 0 && (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleMarkAllAsRead}
                            sx={{
                                textTransform: 'none',
                                borderColor: '#3B82F6',
                                color: '#3B82F6',
                                '&:hover': {
                                    borderColor: '#2563EB',
                                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                                },
                            }}
                        >
                            Marcar todas como leídas
                        </Button>
                    )}
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && filteredNotifications.length === 0 && (
                    <Box sx={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px' }}>
                        <NotificationsIcon sx={{ fontSize: 64, color: '#D1D5DB', marginBottom: '1rem' }} />
                        <Typography variant="h6" color="text.secondary">
                            No tienes notificaciones
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '0.5rem' }}>
                            {tabValue === 1 ? 'No tienes notificaciones sin leer' : tabValue === 2 ? 'No tienes notificaciones leídas' : 'Cuando recibas notificaciones, aparecerán aquí'}
                        </Typography>
                    </Box>
                )}

                {!loading && filteredNotifications.length > 0 && (
                    <Box sx={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        {filteredNotifications.map((notification, index) => (
                            <Box key={notification.id}>
                                <NotificationItem
                                    notification={notification}
                                    onMarkAsRead={markAsRead}
                                    onNavigate={handleNavigateFromNotification}
                                />
                                {index < filteredNotifications.length - 1 && <Box sx={{ borderBottom: '1px solid #E5E7EB' }} />}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

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
        </HomeBase>
    );
};

export default Notifications;
