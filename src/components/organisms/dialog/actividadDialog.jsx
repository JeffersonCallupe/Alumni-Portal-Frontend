// src/components/ActivityDialog.js
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormActividad from "../forms/dashboard/formActividad";

const ActividadDialog = ({ open, onClose, initialData, onSave, loading, error }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{initialData ? "Editar Actividad" : "Nueva Actividad"}</DialogTitle>
        <DialogContent>
            <FormActividad
                initialData={initialData}
                onSubmit={onSave}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </DialogContent>
    </Dialog>
);

export default ActividadDialog;