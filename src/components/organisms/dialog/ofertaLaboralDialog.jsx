// src/components/ActivityDialog.js
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormOfertaLaboral from "../forms/dashboard/FormOferta";

const OfertaLaboralDialog = ({ open, onClose, initialData, onSave, loading, error }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{initialData ? "Editar Oferta Laboral" : "Nueva Oferta Laboral"}</DialogTitle>
        <DialogContent>
            <FormOfertaLaboral
                initialData={initialData}
                onSubmit={onSave}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </DialogContent>
    </Dialog>
);

export default OfertaLaboralDialog;