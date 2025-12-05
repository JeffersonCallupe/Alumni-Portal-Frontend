import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    TextField,
    Autocomplete,
    IconButton,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from '../../atoms/buttons/actionButton';

const typeEvent = ["Charla", "Conferencia", "Curso", "Taller", "Seminario", "Otro"];
const typeModality = ["Presencial", "Remoto", "Híbrido"];
const typeArea = [
    "Agricultura", "Banca", "Construcción", "Educación", "Energía",
    "Finanzas", "Manufactura", "Retail", "Salud", "Tecnología",
    "Telecomunicaciones", "Transporte", "Turismo", "Otro"
];
const typeNivel = ["Practicante", "Trainee", "Junior", "Semi-senior", "Senior", "Ejecutivo", "Otro"];

const FilterDrawer = ({
    open,
    onClose,
    viewActivies = true,
    filters = {},
    onFilterChange,
    onApplyFilters,
    onClearFilters
}) => {

    const handleFilterChange = (filterName, value) => {
        onFilterChange(filterName, value);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: '400px' },
                    backgroundColor: '#FFFFFF',
                },
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem 1.5rem',
                        borderBottom: '1px solid #E5E7EB',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                        Filtros
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Contenido de filtros */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {viewActivies ? (
                        <>
                            {/* Filtros para Actividades */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Tipo de Evento
                                </Typography>
                                <Autocomplete
                                    options={typeEvent}
                                    value={filters.eventType || null}
                                    onChange={(event, newValue) => handleFilterChange('eventType', newValue || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Seleccionar tipo"
                                            size="small"
                                        />
                                    )}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Fecha de Inicio
                                </Typography>
                                <TextField
                                    type="date"
                                    value={filters.startDate || ''}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            {/* Filtros para Ofertas Laborales */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Modalidad
                                </Typography>
                                <Autocomplete
                                    options={typeModality}
                                    value={filters.modality || null}
                                    onChange={(event, newValue) => handleFilterChange('modality', newValue || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Seleccionar modalidad"
                                            size="small"
                                        />
                                    )}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Área
                                </Typography>
                                <Autocomplete
                                    options={typeArea}
                                    value={filters.area || null}
                                    onChange={(event, newValue) => handleFilterChange('area', newValue || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Seleccionar área"
                                            size="small"
                                        />
                                    )}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    Nivel
                                </Typography>
                                <Autocomplete
                                    options={typeNivel}
                                    value={filters.nivel || null}
                                    onChange={(event, newValue) => handleFilterChange('nivel', newValue || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Seleccionar nivel"
                                            size="small"
                                        />
                                    )}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </Box>

                {/* Footer con botones */}
                <Box
                    sx={{
                        padding: '1.25rem 1.5rem',
                        borderTop: '1px solid #E5E7EB',
                        display: 'flex',
                        gap: '0.75rem',
                    }}
                >
                    <ActionButton
                        texto="Limpiar"
                        onClick={onClearFilters}
                        sx={{
                            flex: 1,
                            backgroundColor: '#F3F4F6',
                            color: '#374151',
                            '&:hover': {
                                backgroundColor: '#E5E7EB',
                            },
                        }}
                    />
                    <ActionButton
                        texto="Aplicar Filtros"
                        onClick={() => {
                            onApplyFilters();
                            onClose();
                        }}
                        sx={{ flex: 1 }}
                    />
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;
