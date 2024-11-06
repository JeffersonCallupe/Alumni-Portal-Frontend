import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Textarea from "../../../atoms/inputs/TextareaAutosize";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormActividad = ({ initialData = {}, onSubmit, onCancel, loading, error }) => {  
    const handleSwitchChange = (e) => {
        handleChange({
            target: {
                name: e.target.name,
                value: e.target.checked,
            }
        });
    };

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
            onSubmit={(e) => handleSubmit(e)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
            }}
        >
            <div className="flex flex-row gap-4">
                <TextInput
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                    required={true}
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title}
                    disabled={loading}
                />
                <TextInput
                    label="Tipo de evento"
                    name="eventType"
                    value={formData.eventType}
                    onChange={(e) => handleChange(e)}
                    required={true}
                    fullWidth
                    margin="normal"
                    error={!!errors.eventType}
                    helperText={errors.eventType}
                    disabled={loading}
                />
                <Switch 
                    label="Inscribible" 
                    name="enrollable"
                    checked={formData.enrollable} 
                    onChange={handleSwitchChange}
                />
            </div>
            <div>
                <Textarea
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    maxRows={5}
                    onChange={(e) => handleChange(e)}
                    disabled={loading}
                />
            </div>
            <div className="flex flex-row gap-4">
                <TextInput
                    label="Fecha de inicio"
                    name="startDate"
                    value={formData.startDate}
                    type="date"
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    disabled={loading}
                />
                <TextInput
                    label="Fecha de finalización"
                    name="endDate"
                    value={formData.endDate}
                    type="date"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    disabled={loading}
                />
                <TextInput
                    label="Ubicación"
                    name="location"
                    value={formData.location}
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.location}
                    helperText={errors.location}
                    disabled={loading}
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