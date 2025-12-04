import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                backgroundColor: '#000000fa',
                color: 'white',
                marginTop: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        padding: '3rem 0 2rem',
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Columna 1: Información de la Universidad */}
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    fontSize: '1.25rem',
                                    color: 'white',
                                }}
                            >
                                Portal de Egresados
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.7,
                                    marginBottom: '1rem',
                                }}
                            >
                                Plataforma oficial para la comunidad de egresados de la Universidad Nacional Mayor de San Marcos.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '0.75rem',
                                    fontStyle: 'italic',
                                }}
                            >
                                "Universidad del Perú, Decana de América"
                            </Typography>
                        </Grid>

                        {/* Columna 2: Enlaces Rápidos */}
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    fontSize: '1rem',
                                    color: 'white',
                                }}
                            >
                                Navegación
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Link
                                    href="/home"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            color: 'white',
                                            paddingLeft: '8px',
                                        },
                                    }}
                                >
                                    Inicio
                                </Link>
                                <Link
                                    href="/actividades"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            color: 'white',
                                            paddingLeft: '8px',
                                        },
                                    }}
                                >
                                    Actividades
                                </Link>
                                <Link
                                    href="/ofertasLaborales"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            color: 'white',
                                            paddingLeft: '8px',
                                        },
                                    }}
                                >
                                    Ofertas Laborales
                                </Link>
                                <Link
                                    href="/settings"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            color: 'white',
                                            paddingLeft: '8px',
                                        },
                                    }}
                                >
                                    Configuración
                                </Link>
                            </Box>
                        </Grid>

                        {/* Columna 3: Contacto */}
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    fontSize: '1rem',
                                    color: 'white',
                                }}
                            >
                                Contacto
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)', mt: 0.2 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        Av. Universitaria s/n, Ciudad Universitaria<br />
                                        Lima 15081, Perú
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        (01) 619-7000
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EmailIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }} />
                                    <Link
                                        href="mailto:informes@unmsm.edu.pe"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                color: 'white',
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        informes@unmsm.edu.pe
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Línea divisoria */}
                <Box
                    sx={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingY: '1.5rem',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.8125rem',
                            textAlign: 'center',
                        }}
                    >
                        © {new Date().getFullYear()} Universidad Nacional Mayor de San Marcos. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
