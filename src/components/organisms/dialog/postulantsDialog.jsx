import React from "react";
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from "@mui/material";

const ParticipantsDialog = ({ open, onClose, participants, activityTitle }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{backgroundColor: "#6F191C"}}>
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
                <TableCell><Typography variant="subtitle2">Código</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Participante</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Email</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Facultad</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Carrera</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.userStudentCode}</TableCell>
                  <TableCell>
                    {`${participant.userName} ${participant.userPaternalSurname} ${participant.userMaternalSurname}`}
                  </TableCell>
                  <TableCell>{participant.userEmail}</TableCell>
                  <TableCell>{participant.userFaculty}</TableCell>
                  <TableCell>{participant.userCareer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No hay postulantes que han aplicado.</Typography>
        )}
        <br></br>
        <div className="flex justify-end gap-4 mt-4">
            <Button variant="outlined" onClick={onClose}>
                Cerrar
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantsDialog;