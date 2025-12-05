import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

const PDFViewerModal = ({ open, onClose, pdfUrl, fileName = 'documento.pdf' }) => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullScreen={window.innerWidth < 600}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: { xs: '100%', sm: '98%', md: '95vw', lg: '90vw' },
                    width: '100%',
                    height: { xs: '100%', sm: '98vh' },
                    margin: { xs: 0, sm: 1 },
                    backgroundColor: '#F9FAFB',
                }
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: '#6F191C',
                    color: 'white',
                    padding: { xs: '0.75rem 1rem', sm: '1rem 1.5rem' },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1, sm: 0 }
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: { xs: 'nowrap', sm: 'normal' },
                        maxWidth: { xs: '100%', sm: '60%' }
                    }}
                >
                    {fileName}
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
                    <IconButton
                        onClick={handleDownload}
                        size="small"
                        sx={{
                            color: 'white',
                            padding: { xs: '0.4rem', sm: '0.5rem' },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <DownloadIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                    </IconButton>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: 'white',
                            padding: { xs: '0.4rem', sm: '0.5rem' },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <CloseIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent
                sx={{
                    padding: 0,
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        title={fileName}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PDFViewerModal;
