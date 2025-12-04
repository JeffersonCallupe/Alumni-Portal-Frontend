import { useState, useCallback } from 'react';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_API_URL;

    // Obtener todas las notificaciones
    const fetchNotifications = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/notification/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener notificaciones');
            }

            const data = await response.json();
            console.log('Notifications fetched:', data);

            // Adaptar el formato de la respuesta al formato esperado por el frontend
            const formattedNotifications = data.map(notif => ({
                id: notif.id,
                userId: notif.userId,
                type: notif.type,
                message: notif.message,
                userName: notif.companyName || notif.userName || 'Usuario',
                userProfilePicture: notif.companyPhotoUrl || '',
                relatedId: notif.jobOfferId,
                read: notif.isRead,
                createdAt: notif.createdAt,
            }));

            setNotifications(formattedNotifications);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    // Obtener contador de no leídas
    const getUnreadCount = useCallback(async (userId) => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/notification/user/${userId}/unread`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener contador');
            }

            const data = await response.json();
            console.log('Unread notifications:', data);

            // El contador es la longitud del array de notificaciones no leídas
            setUnreadCount(Array.isArray(data) ? data.length : 0);
        } catch (err) {
            console.error('Error fetching unread count:', err);
        }
    }, [baseUrl]);

    // Marcar como leída
    const markAsRead = useCallback(async (notificationId) => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return false;
        }

        try {
            const response = await fetch(`${baseUrl}/api/notification/${notificationId}/mark-as-read`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al marcar como leída');
            }

            console.log('Notification marked as read:', notificationId);

            // Actualizar el estado local
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, read: true } : notif
                )
            );

            return true;
        } catch (err) {
            console.error('Error marking as read:', err);
            return false;
        }
    }, [baseUrl]);

    // Marcar todas como leídas
    const markAllAsRead = useCallback(async (userId) => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return false;
        }

        try {
            const response = await fetch(`${baseUrl}/api/notification/user/${userId}/mark-all-as-read`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al marcar todas como leídas');
            }

            console.log('All notifications marked as read');

            // Actualizar el estado local
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
            setUnreadCount(0);

            return true;
        } catch (err) {
            console.error('Error marking all as read:', err);
            return false;
        }
    }, [baseUrl]);

    // Refrescar notificaciones y contador
    const refreshNotifications = useCallback(async (userId) => {
        await Promise.all([
            fetchNotifications(userId),
            getUnreadCount(userId),
        ]);
    }, [fetchNotifications, getUnreadCount]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        getUnreadCount,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
    };
};

export default useNotifications;
