import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordStrengthIndicator = ({ password }) => {
    const requirements = [
        { label: 'Al menos 8 caracteres', test: (pwd) => pwd.length >= 8 },
        { label: 'Una letra mayúscula', test: (pwd) => /[A-Z]/.test(pwd) },
        { label: 'Una letra minúscula', test: (pwd) => /[a-z]/.test(pwd) },
        { label: 'Un número', test: (pwd) => /\d/.test(pwd) },
    ];

    const passedRequirements = requirements.filter(req => req.test(password)).length;
    const strength = passedRequirements === 0 ? 0 : (passedRequirements / requirements.length) * 100;

    const getStrengthLabel = () => {
        if (passedRequirements === 0) return { text: '', color: '' };
        if (passedRequirements <= 2) return { text: 'Débil', color: '#EF4444' };
        if (passedRequirements === 3) return { text: 'Media', color: '#F59E0B' };
        return { text: 'Fuerte', color: '#10B981' };
    };

    const strengthInfo = getStrengthLabel();

    if (!password) return null;

    return (
        <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#E5E7EB',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: strengthInfo.color,
                            borderRadius: 3,
                        },
                    }}
                />
                {strengthInfo.text && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: strengthInfo.color,
                            fontWeight: 600,
                            minWidth: '60px',
                            fontSize: '0.75rem',
                        }}
                    >
                        {strengthInfo.text}
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {requirements.map((req, index) => {
                    const passed = req.test(password);
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                            }}
                        >
                            {passed ? (
                                <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                            ) : (
                                <CancelIcon sx={{ fontSize: 16, color: '#D1D5DB' }} />
                            )}
                            <Typography
                                variant="caption"
                                sx={{
                                    color: passed ? '#10B981' : '#6B7280',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {req.label}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default PasswordStrengthIndicator;
