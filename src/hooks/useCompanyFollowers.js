import { useState, useCallback } from 'react';

const useCompanyFollowers = () => {
    const [stats, setStats] = useState({ followingCount: 0 });
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_API_URL;

    const fetchFollowingCount = useCallback(async (userId) => {
        if (!userId) return;

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${baseUrl}/api/company-follower/user/${userId}/count`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setStats({ followingCount: data.count || 0 });
            } else {
                console.error('Failed to fetch following count');
            }
        } catch (err) {
            console.error('Error fetching following count:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    const fetchFollowing = useCallback(async (userId) => {
        if (!userId) return;

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${baseUrl}/api/company-follower/user/${userId}/following`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setFollowing(data);
            } else {
                console.error('Failed to fetch following list');
                setFollowing([]);
            }
        } catch (err) {
            console.error('Error fetching following list:', err);
            setError(err.message);
            setFollowing([]);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    const unfollowCompany = useCallback(async (userId, companyId) => {
        if (!userId || !companyId) return false;

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return false;
        }

        try {
            const response = await fetch(
                `${baseUrl}/api/company-follower/unfollow`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, companyId }),
                }
            );

            if (response.ok) {
                return true;
            } else {
                console.error('Failed to unfollow company');
                return false;
            }
        } catch (err) {
            console.error('Error unfollowing company:', err);
            setError(err.message);
            return false;
        }
    }, [baseUrl]);

    return {
        stats,
        following,
        loading,
        error,
        fetchFollowingCount,
        fetchFollowing,
        unfollowCompany,
    };
};

export default useCompanyFollowers;
