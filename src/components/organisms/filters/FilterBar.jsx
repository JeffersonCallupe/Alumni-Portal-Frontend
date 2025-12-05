import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Chip, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const FilterBar = ({
    searchTerm,
    onSearchChange,
    activeFilters = {},
    onRemoveFilter,
    onOpenFilterDrawer
}) => {
    const [searchValue, setSearchValue] = useState(searchTerm || '');

    // Contar filtros activos
    const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

    // Manejar cambio de búsqueda con debounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        // Debounce de 300ms
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            onSearchChange(value);
        }, 300);
    };

    // Limpiar búsqueda
    const handleClearSearch = () => {
        setSearchValue('');
        onSearchChange('');
    };

    // Renderizar chips de filtros activos
    const renderFilterChips = () => {
        const chips = [];

        if (activeFilters.eventType) {
            chips.push(
                <Chip
                    key="eventType"
                    label={`Tipo: ${activeFilters.eventType}`}
                    onDelete={() => onRemoveFilter('eventType')}
                    size="small"
                    sx={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                            color: '#1E40AF',
                            '&:hover': {
                                color: '#1E3A8A',
                            },
                        },
                    }}
                />
            );
        }

        if (activeFilters.startDate) {
            chips.push(
                <Chip
                    key="startDate"
                    label={`Desde: ${new Date(activeFilters.startDate).toLocaleDateString()}`}
                    onDelete={() => onRemoveFilter('startDate')}
                    size="small"
                    sx={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                            color: '#1E40AF',
                            '&:hover': {
                                color: '#1E3A8A',
                            },
                        },
                    }}
                />
            );
        }

        if (activeFilters.modality) {
            chips.push(
                <Chip
                    key="modality"
                    label={`Modalidad: ${activeFilters.modality}`}
                    onDelete={() => onRemoveFilter('modality')}
                    size="small"
                    sx={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                            color: '#1E40AF',
                            '&:hover': {
                                color: '#1E3A8A',
                            },
                        },
                    }}
                />
            );
        }

        if (activeFilters.area) {
            chips.push(
                <Chip
                    key="area"
                    label={`Área: ${activeFilters.area}`}
                    onDelete={() => onRemoveFilter('area')}
                    size="small"
                    sx={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                            color: '#1E40AF',
                            '&:hover': {
                                color: '#1E3A8A',
                            },
                        },
                    }}
                />
            );
        }

        if (activeFilters.nivel) {
            chips.push(
                <Chip
                    key="nivel"
                    label={`Nivel: ${activeFilters.nivel}`}
                    onDelete={() => onRemoveFilter('nivel')}
                    size="small"
                    sx={{
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                            color: '#1E40AF',
                            '&:hover': {
                                color: '#1E3A8A',
                            },
                        },
                    }}
                />
            );
        }

        return chips;
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #E5E7EB',
                padding: '1rem 0',
                marginBottom: '1.5rem',
            }}
        >
            <Box
                sx={{
                    maxWidth: '48rem',
                    margin: '0 auto',
                    padding: '0 1rem',
                }}
            >
                {/* Barra de búsqueda y botón de filtros */}
                <Box sx={{ display: 'flex', gap: 1, marginBottom: activeFilterCount > 0 ? '0.75rem' : 0 }}>
                    <TextField
                        fullWidth
                        placeholder="Buscar por nombre de empresa..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#6B7280' }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchValue && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={handleClearSearch}
                                        sx={{ padding: '4px' }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#F9FAFB',
                                '&:hover': {
                                    backgroundColor: '#F3F4F6',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#FFFFFF',
                                },
                            },
                        }}
                    />

                    <IconButton
                        onClick={onOpenFilterDrawer}
                        sx={{
                            borderRadius: '12px',
                            border: '1px solid #E5E7EB',
                            backgroundColor: '#FFFFFF',
                            padding: '8px 16px',
                            '&:hover': {
                                backgroundColor: '#F9FAFB',
                                borderColor: '#3B82F6',
                            },
                        }}
                    >
                        <Badge badgeContent={activeFilterCount} color="primary">
                            <FilterListIcon sx={{ color: '#6B7280' }} />
                        </Badge>
                    </IconButton>
                </Box>

                {/* Chips de filtros activos */}
                {activeFilterCount > 0 && (
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                        {renderFilterChips()}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default FilterBar;
