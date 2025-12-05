import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PDFViewerModal from './PDFViewerModal';

const ParticipantsDialogs = ({ open, onClose, participants, activityTitle }) => {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');

  const handlePreviewCV = async (userId, userName) => {
    if (!userId) {
      alert('Usuario no válido');
      return;
    }

    const token = sessionStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/api/user/cv/download/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        setPdfUrl(blobUrl);
        setPdfFileName(`CV_${userName.replace(/\s+/g, '_')}.pdf`);
        setPdfModalOpen(true);
      } else {
        alert(`No se pudo cargar el CV de ${userName}`);
      }
    } catch (error) {
      console.error("Error al previsualizar CV:", error);
      alert(`Error al previsualizar el CV de ${userName}`);
    }
  };

  const handleDownloadCV = async (userId, participantName) => {
    if (!userId) {
      alert('Usuario no válido');
      return;
    }

    const token = sessionStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/api/user/cv/download/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `CV_${participantName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      } else {
        alert(`No se pudo descargar el CV de ${participantName}`);
      }
    } catch (error) {
      console.error("Error al descargar CV:", error);
      alert(`Error al descargar el CV de ${participantName}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ backgroundColor: "#6F191C" }}>
        <Typography variant="title" sx={{ color: "white" }}>
          {activityTitle ? `Postulantes de ${activityTitle}` : "Postulantes"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <br></br>
        {participants.length > 0
          ? `Hay ${participants.length} ${participants.length > 1 ? "postulantes que han aplicado" : "postulante que ha aplicado"}.`
          : ""}
        {participants.length > 0 && <br></br>}
        {participants.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Código</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Participante</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Email</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Facultad</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Carrera</Typography></TableCell>
                <TableCell align="center"><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>CV</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow
                  key={participant.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F5F5F5',
                    },
                  }}
                >
                  <TableCell>{participant.userStudentCode}</TableCell>
                  <TableCell>
                    {`${participant.userName} ${participant.userPaternalSurname} ${participant.userMaternalSurname}`}
                  </TableCell>
                  <TableCell>{participant.userEmail}</TableCell>
                  <TableCell>{participant.userFaculty}</TableCell>
                  <TableCell>{participant.userCareer}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Tooltip title="Previsualizar CV">
                        <IconButton
                          size="small"
                          onClick={() => handlePreviewCV(
                            participant.userId,
                            `${participant.userName} ${participant.userPaternalSurname}`
                          )}
                          sx={{
                            color: '#6F191C',
                            '&:hover': {
                              backgroundColor: 'rgba(111, 25, 28, 0.08)',
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Descargar CV">
                        <IconButton
                          size="small"
                          onClick={() => handleDownloadCV(
                            participant.userId,
                            `${participant.userName}_${participant.userPaternalSurname}`
                          )}
                          sx={{
                            color: '#10B981',
                            '&:hover': {
                              backgroundColor: 'rgba(16, 185, 129, 0.08)',
                            },
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No hay postulantes que han aplicado.</Typography>
        )}
        <br></br>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#6F191C',
              color: '#6F191C',
              '&:hover': {
                borderColor: '#8F2428',
                backgroundColor: 'rgba(111, 25, 28, 0.04)',
              },
            }}
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>

      {/* Modal de previsualización de PDF */}
      <PDFViewerModal
        open={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={pdfUrl}
        fileName={pdfFileName}
      />
    </Dialog>
  );
};

export default ParticipantsDialogs;