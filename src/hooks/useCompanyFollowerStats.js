import { useState, useCallback } from 'react';

const useCompanyFollowerStats = () => {
    const [stats, setStats] = useState({ followersCount: 0 });
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_API_URL;

    const fetchFollowersCount = useCallback(async (companyId) => {
        if (!companyId) return;

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${baseUrl}/api/company-follower/company/${companyId}/count`,
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
                setStats({ followersCount: data.count || 0 });
            } else {
                console.error('Failed to fetch followers count');
            }
        } catch (err) {
            console.error('Error fetching followers count:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    const fetchFollowers = useCallback(async (companyId) => {
        if (!companyId) return;

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${baseUrl}/api/company-follower/company/${companyId}/followers`,
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
                setFollowers(data);
            } else {
                console.error('Failed to fetch followers list');
                setFollowers([]);
            }
        } catch (err) {
            console.error('Error fetching followers list:', err);
            setError(err.message);
            setFollowers([]);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    return {
        stats,
        followers,
        loading,
        error,
        fetchFollowersCount,
        fetchFollowers,
    };
};

export default useCompanyFollowerStats;
