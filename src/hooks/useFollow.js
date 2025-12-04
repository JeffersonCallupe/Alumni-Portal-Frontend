import { useState, useCallback } from 'react';

const useFollow = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_API_URL;

    // Seguir empresa
    const followUser = useCallback(async (followerId, followedId) => {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found in sessionStorage');
            setError('No token found');
            setLoading(false);
            return false;
        }

        try {
            console.log('Follow request:', {
                url: `${baseUrl}/api/company-follower/follow`,
                method: 'POST',
                userId: followerId,
                companyId: followedId,
            });

            const response = await fetch(`${baseUrl}/api/company-follower/follow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: followerId,
                    companyId: followedId
                })
            });

            console.log('Follow response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Follow error response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText || 'Error al seguir'}`);
            }

            const data = await response.json();
            console.log('Follow success:', data);
            return true;
        } catch (err) {
            console.error('Follow error:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    // Dejar de seguir empresa
    const unfollowUser = useCallback(async (followerId, followedId) => {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found in sessionStorage');
            setError('No token found');
            setLoading(false);
            return false;
        }

        try {
            console.log('Unfollow request:', {
                url: `${baseUrl}/api/company-follower/unfollow`,
                method: 'DELETE',
                userId: followerId,
                companyId: followedId,
            });

            const response = await fetch(`${baseUrl}/api/company-follower/unfollow`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: followerId,
                    companyId: followedId
                })
            });

            console.log('Unfollow response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Unfollow error response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText || 'Error al dejar de seguir'}`);
            }

            console.log('Unfollow success');
            return true;
        } catch (err) {
            console.error('Unfollow error:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    // Verificar si sigue a una empresa
    const checkIfFollowing = useCallback(async (followerId, followedId) => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found for checkIfFollowing');
            return false;
        }

        try {
            const response = await fetch(`${baseUrl}/api/company-follower/is-following?userId=${followerId}&companyId=${followedId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.warn('Check follow status failed:', response.status);
                return false;
            }

            const result = await response.json();
            console.log('Check follow status result:', result);

            // El endpoint retorna un objeto con la propiedad que indica si sigue
            // Puede ser { "isFollowing": true } o similar
            return result === true || result.isFollowing === true || result.following === true;
        } catch (err) {
            console.error('Error checking follow status:', err);
            return false;
        }
    }, [baseUrl]);

    return {
        followUser,
        unfollowUser,
        checkIfFollowing,
        loading,
        error,
    };
};

export default useFollow;
