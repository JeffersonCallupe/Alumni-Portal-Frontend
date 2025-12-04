import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import useFollow from '../../../hooks/useFollow';
import { useUserContext } from '../../../contexts/userContext';
import { useAlert } from '../../../contexts/alertContext';

const FollowButton = ({ userId, size = 'small', isCompany = false }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { followUser, unfollowUser, checkIfFollowing } = useFollow();
    const { userData, isInstitutional } = useUserContext();
    const { showAlert } = useAlert();

    // Solo mostrar para empresas y si el usuario es institucional (estudiante)
    if (!isCompany || !isInstitutional) {
        return null;
    }

    useEffect(() => {
        const checkStatus = async () => {
            if (userData && userId && isCompany) {
                try {
                    const following = await checkIfFollowing(userData.id, userId);
                    setIsFollowing(following);
                } catch (error) {
                    console.error('Error checking follow status:', error);
                }
            }
        };
        checkStatus();
    }, [userId, userData, checkIfFollowing, isCompany]);

    const handleToggleFollow = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!userData) {
            showAlert('Debes iniciar sesión para seguir empresas', 'warning');
            return;
        }

        setIsLoading(true);

        try {
            let success;

            if (isFollowing) {
                success = await unfollowUser(userData.id, userId);

                if (success) {
                    setIsFollowing(false);
                    showAlert('Dejaste de seguir a esta empresa', 'success');
                } else {
                    showAlert('Error al dejar de seguir', 'error');
                }
            } else {
                success = await followUser(userData.id, userId);

                if (success) {
                    setIsFollowing(true);
                    showAlert('Ahora sigues a esta empresa', 'success');
                } else {
                    showAlert('Error al seguir a la empresa', 'error');
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            showAlert('Error al actualizar el seguimiento', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Estilo LinkedIn/Twitter moderno - más compacto
    const getButtonStyle = () => {
        if (isFollowing) {
            return {
                variant: 'outlined',
                icon: <CheckIcon sx={{ fontSize: 14 }} />,
                text: isHovered ? 'Dejar de seguir' : 'Siguiendo',
                sx: {
                    borderColor: isHovered ? '#DC2626' : '#D1D5DB',
                    color: isHovered ? '#DC2626' : '#6B7280',
                    backgroundColor: isHovered ? '#FEF2F2' : 'white',
                    '&:hover': {
                        borderColor: '#DC2626',
                        backgroundColor: '#FEF2F2',
                    },
                },
            };
        }

        return {
            variant: 'contained',
            icon: <AddIcon sx={{ fontSize: 14 }} />,
            text: 'Seguir',
            sx: {
                backgroundColor: '#3B82F6',
                color: 'white',
                borderColor: '#3B82F6',
                '&:hover': {
                    backgroundColor: '#2563EB',
                },
            },
        };
    };

    const buttonStyle = getButtonStyle();

    return (
        <Tooltip
            title={isFollowing ? (isHovered ? 'Click para dejar de seguir' : 'Siguiendo a esta empresa') : 'Click para seguir esta empresa'}
            arrow
            placement="left"
        >
            <Button
                variant={buttonStyle.variant}
                size="small"
                onClick={handleToggleFollow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={12} sx={{ color: isFollowing ? '#6B7280' : 'white' }} /> : buttonStyle.icon}
                sx={{
                    textTransform: 'none',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    minWidth: '85px',
                    height: '28px',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                    border: '1px solid',
                    '&:hover': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                    ...buttonStyle.sx,
                }}
            >
                {buttonStyle.text}
            </Button>
        </Tooltip>
    );
};

export default FollowButton;
