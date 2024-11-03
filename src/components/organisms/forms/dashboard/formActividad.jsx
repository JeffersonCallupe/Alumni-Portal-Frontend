import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormActividad = ({ initialData = {}, onSubmit, onCancel, loading, error }) => {
    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            title: initialData.title || "",
            description: initialData.description || "",
            eventType: initialData.eventType || "",
            startDate: initialData.startDate || "",
            endDate: initialData.endDate || "",
            location: initialData.location || "",
            enrollable: initialData.enrollable || false,
            multimedia: initialData.multimedia || null,
        },
        async (formData) => {
            await onSubmit(formData);
            if (!error) {
                onCancel();
            }
        }
    );

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
            }}
        >
            <div className="flex flex-row">
                <TextInput
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextInput
                    label="Tipo de evento"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.eventType}
                    helperText={errors.eventType}
                />
                <Switch label="Inscribible" checked={formData.enrollable} onChange={handleChange} name="enrollable" />
            </div>
            <div>
                <TextInput
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description}
                    multiline
                    rows={4}
                />
            </div>
            <div className="flex flex-row">
                <TextInput
                    label="Fecha de inicio"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                />
                <TextInput
                    label="Fecha de finalización"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                />
                <TextInput
                    label="Ubicación"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.location}
                    helperText={errors.location}
                />
            </div>
            <input
                type="file"
                name="multimedia"
                onChange={(e) => handleChange({ target: { name: "multimedia", value: e.target.files[0] } })}
                accept="image/*,video/*"
                style={{ marginTop: '16px' }}
                disabled={loading}
            />
            <div className="flex justify-end gap-4 mt-4">
                <Button variant="outlined" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </Box>
    );
};

export default FormActividad;