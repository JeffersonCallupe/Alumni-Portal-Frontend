import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Textarea from "../../../atoms/inputs/TextareaAutosize";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { Menu } from "@mui/material";

const FormOferta = ({ initialData = {}, onSubmit, onCancel, loading, error }) => {

    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            title: initialData.title || "",
            description: initialData.description || "",
            vacancies: initialData.vacancies || 0,
            area: initialData.area || "",
            nivel: initialData.nivel || "",
            modality: initialData.modality || "",
            workload: initialData.workload || 0,
            minSalary: initialData.minSalary || 0,
            maxSalary: initialData.maxSalary || 0,
            experience: initialData.experience || 0,
        },
        async (formData) => {
            // Conversión de campos numéricos
            const payload = {
                ...formData,
                vacancies: Number(formData.vacancies),
                workload: Number(formData.workload),
                minSalary: Number(formData.minSalary),
                maxSalary: Number(formData.maxSalary),
                experience: Number(formData.experience),
            };
    
            await onSubmit(payload);
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
                <TextInput
                    label="Titulo"
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
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel htmlFor="modality"> Modalidad </InputLabel>
                    <Select
                        label="Modalidad"
                        id="modality"
                        name="modality"
                        value={formData.modality}
                        onChange={(e) => handleChange(e)}
                        disabled={loading}
                        size="small"
                    >
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Remoto">Remoto</MenuItem>
                        <MenuItem value="Híbrido">Híbrido</MenuItem>
                    </Select>
                </div>
                <TextInput
                    label="Años de Experiencia"
                    name="experience"
                    value={formData.experience}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    required={true}
                    fullWidth
                    margin="normal"
                    error={!!errors.experience}
                    helperText={errors.experience}
                    disabled={loading}
                />
            </div>
                <Textarea
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    maxRows={5}
                    onChange={(e) => handleChange(e)}
                    disabled={loading}
                />
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel id="area-label">Área</InputLabel>
                    <Select
                        labelId="area-label"
                        label="Area"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={(e) => handleChange(e)}
                        disabled={loading}
                        size="small"
                    >
                        <MenuItem value="Banca">Banca</MenuItem>
                        <MenuItem value="Educación">Educación</MenuItem>
                        <MenuItem value="Finanzas">Finanzas</MenuItem>
                        <MenuItem value="Salud">Salud</MenuItem>
                        <MenuItem value="Retail">Retail</MenuItem>
                        <MenuItem value="Tecnología">Tecnología</MenuItem>
                        <MenuItem value="Transporte">Transporte</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                </div>
                <TextInput
                    label="Horas Semanales"
                    name="workload"
                    value={formData.workload}
                    type="number"
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.workload}
                    helperText={errors.workload}
                    disabled={loading}
                />
                <TextInput
                    label="Vacantes"
                    name="vacancies"
                    value={formData.vacancies}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    required={true}
                    fullWidth
                    margin="normal"
                    error={!!errors.vacancies}
                    helperText={errors.vacancies}
                    disabled={loading}
                />
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel htmlFor="nivel">Nivel</InputLabel>
                    <Select
                        id="nivel"
                        name="nivel"
                        value={formData.nivel}
                        onChange={(e) => handleChange(e)}
                        disabled={loading}
                        size="small"
                    >
                        <MenuItem value="Practicante">Practicante</MenuItem>
                        <MenuItem value="Trainee">Trainee</MenuItem>
                        <MenuItem value="Junior">Junior</MenuItem>
                        <MenuItem value="Semi-Senior">Semi-Senior</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                        <MenuItem value="Ejecutivo">Ejecutivo</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                </div>
                <TextInput
                    label="Salario Minimo"
                    name="minSalary"
                    value={formData.minSalary}
                    type="number"
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.minSalary}
                    helperText={errors.minSalary}
                    disabled={loading}
                />
                <TextInput
                    label="Salario Maximo"
                    name="maxSalary"
                    value={formData.maxSalary}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    required={true}
                    fullWidth
                    margin="normal"
                    error={!!errors.maxSalary}
                    helperText={errors.maxSalary}
                    disabled={loading}
                />
            </div>
            
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

export default FormOferta;
