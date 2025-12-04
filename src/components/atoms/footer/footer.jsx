import React, { useState } from 'react';
import Box from '@mui/material/Box';

const Footer= () => {
    return (
        <Box component="footer"
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                width: '100%',
                margin: '0 auto',
                padding: '1rem',
                backgroundColor: '#6F191C',
                color: 'white',
                }}>
            <p>© 2024 Universidad Nacional Mayor de San Marcos - grupo 2 uwu</p>
        </Box>
    );
};

export default Footer;