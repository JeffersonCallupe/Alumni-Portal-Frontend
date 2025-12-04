import React from 'react';
import { MenuItem, Avatar, Typography, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';

const NotificationItem = ({ notification, onMarkAsRead, onNavigate }) => {
    const handleClick = () => {
        if (!notification.read) {
            onMarkAsRead(notification.id);
        }

        // Navegar directamente al item específico
        if (onNavigate) {
            onNavigate(notification);
        }
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const notifTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - notifTime) / (1000 * 60));

        if (diffInMinutes < 1) return 'Justo ahora';
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return 'Ayer';
        if (diffInDays < 7) return `Hace ${diffInDays} días`;

        return `Hace ${Math.floor(diffInDays / 7)} ${Math.floor(diffInDays / 7) === 1 ? 'semana' : 'semanas'}`;
    };

    const getNotificationIcon = () => {
        if (notification.type?.includes('JOB_OFFER')) {
            return <WorkIcon sx={{ fontSize: 16, color: '#3B82F6', flexShrink: 0 }} />;
        }
        if (notification.type?.includes('ACTIVITY')) {
            return <EventIcon sx={{ fontSize: 16, color: '#10B981', flexShrink: 0 }} />;
        }
        return null;
    };

    return (
        <MenuItem
            onClick={handleClick}
            sx={{
                padding: '12px 16px',
                backgroundColor: notification.read ? 'transparent' : '#EFF6FF',
                '&:hover': {
                    backgroundColor: notification.read ? '#F9FAFB' : '#DBEAFE',
                },
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                whiteSpace: 'normal', // Permite que el texto se ajuste
            }}
        >
            {/* Avatar del usuario/empresa */}
            <Avatar
                src={notification.userProfilePicture}
                sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0, // Evita que el avatar se encoja
                }}
            >
                {notification.userName?.charAt(0)}
            </Avatar>

            {/* Contenido de la notificación */}
            <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, marginBottom: '4px' }}>
                    {getNotificationIcon()}
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.875rem',
                            color: '#111827',
                            lineHeight: 1.5,
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            flex: 1,
                        }}
                    >
                        <strong>{notification.userName}</strong> {notification.message}
                    </Typography>
                </Box>
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: '0.75rem',
                        color: '#6B7280',
                        display: 'block',
                    }}
                >
                    {getTimeAgo(notification.createdAt)}
                </Typography>
            </Box>

            {/* Indicador de no leída */}
            {!notification.read && (
                <FiberManualRecordIcon
                    sx={{
                        fontSize: 10,
                        color: '#3B82F6',
                        marginTop: '6px',
                        flexShrink: 0, // Evita que el indicador se encoja
                    }}
                />
            )}
        </MenuItem>
    );
};

export default NotificationItem;
