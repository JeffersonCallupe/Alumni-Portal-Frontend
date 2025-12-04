import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Avatar,
    Divider,
    Chip,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FollowButton from '../../atoms/buttons/FollowButton';

const CompanyProfileModal = ({ open, onClose, companyId }) => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            if (!companyId || !open) return;

            setLoading(true);
            const token = sessionStorage.getItem('token');
            const baseUrl = import.meta.env.VITE_API_URL;

            try {
                const response = await fetch(`${baseUrl}/api/company/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompany(data);
                }
            } catch (error) {
                console.error('Error fetching company profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyProfile();
    }, [companyId, open]);

    if (!open) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    maxHeight: '90vh',
                },
            }}
        >
            {/* Botón de cerrar */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 10,
                    color: '#6B7280',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        backgroundColor: '#F3F4F6',
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ padding: 0 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                        <CircularProgress />
                    </Box>
                ) : company ? (
                    <>
                        {/* Perfil de la empresa */}
                        <Box sx={{ padding: '24px' }}>
                            {/* Avatar y nombre */}
                            <Box sx={{ marginBottom: '16px' }}>
                                <Avatar
                                    src={company.photoUrl}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        backgroundColor: '#F3F4F6',
                                    }}
                                >
                                    <BusinessIcon sx={{ fontSize: 48, color: '#9CA3AF' }} />
                                </Avatar>
                            </Box>

                            {/* Nombre y botón de seguir */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                                        {company.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#6B7280', marginBottom: '8px' }}>
                                        {company.sector || 'Sector no especificado'}
                                    </Typography>
                                </Box>
                                <FollowButton userId={companyId} isCompany={true} size="medium" />
                            </Box>

                            {/* Información de contacto */}
                            <Box sx={{ marginBottom: '24px' }}>
                                {company.location && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                                        <LocationOnIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                        <Typography variant="body2" sx={{ color: '#374151' }}>
                                            {company.location}
                                        </Typography>
                                    </Box>
                                )}
                                {company.email && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                                        <EmailIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                        <Typography variant="body2" sx={{ color: '#374151' }}>
                                            {company.email}
                                        </Typography>
                                    </Box>
                                )}
                                {company.phone && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                                        <PhoneIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                        <Typography variant="body2" sx={{ color: '#374151' }}>
                                            {company.phone}
                                        </Typography>
                                    </Box>
                                )}
                                {company.website && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                                        <LanguageIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                        <Typography
                                            variant="body2"
                                            component="a"
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: '#3B82F6',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            {company.website}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <Divider sx={{ marginBottom: '24px' }} />

                            {/* Descripción */}
                            <Box sx={{ marginBottom: '24px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '12px', color: '#111827' }}>
                                    Acerca de la empresa
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                    {company.description || 'No hay descripción disponible.'}
                                </Typography>
                            </Box>

                            {/* Información adicional */}
                            <Box sx={{ marginBottom: '24px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '12px', color: '#111827' }}>
                                    Información
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {company.ruc && (
                                        <Chip
                                            label={`RUC: ${company.ruc}`}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#EFF6FF',
                                                color: '#1E40AF',
                                                fontWeight: 500,
                                            }}
                                        />
                                    )}
                                    {company.sector && (
                                        <Chip
                                            label={company.sector}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#F0FDF4',
                                                color: '#166534',
                                                fontWeight: 500,
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ padding: '60px', textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            No se pudo cargar la información de la empresa
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CompanyProfileModal;
