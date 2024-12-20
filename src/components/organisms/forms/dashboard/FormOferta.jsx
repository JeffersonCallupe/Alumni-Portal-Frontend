import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Textarea from "../../../atoms/inputs/Textarea";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormOferta = ({ initialData = {}, onSubmit, onCancel, loading, error }) => {

    const modalityOptions = ["Presencial", "Remoto", "Híbrido"];
    const nivelOptions = ["Practicante", "Trainee", "Junior", "Semi-Senior", "Senior", "Ejecutivo", "Otro"];
    const areaOptions = [
        "Agricultura",
        "Banca",
        "Construcción",
        "Educación",
        "Energía",
        "Finanzas",
        "Manufactura",
        "Retail",
        "Salud",
        "Tecnología",
        "Telecomunicaciones",
        "Transporte",
        "Turismo",
        "Otro",
      ]
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
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-3/10">
                    <FormControl fullWidth>
                        <InputLabel>Modalidad</InputLabel>
                        <Select
                            name="modality"
                            value={formData.modality}
                            onChange={(e) => handleChange(e)}
                            error={!!errors.modality}
                            label="Modalidad"
                            disabled={loading}
                            className="mt-2"
                        >
                            {modalityOptions.map((modalidad) => (
                            <MenuItem key={modalidad} value={modalidad}>
                                {modalidad}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    className="w-full lg:w-2/5"
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
            <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-3/10">
                    <FormControl fullWidth>
                        <InputLabel>Area</InputLabel>
                        <Select
                            name="area"
                            value={formData.area}
                            onChange={(e) => handleChange(e)}
                            error={!!errors.area}
                            label="Area"
                            disabled={loading}
                            className="mt-2"
                        >
                            {areaOptions.map((area) => (
                            <MenuItem key={area} value={area}>
                                {area}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-full lg:w-3/10">
                    <TextInput
                        label="Horas Semanales"
                        name="workload"
                        value={formData.workload}
                        type="number"
                        required={true}
                        onChange={(e) => handleChange(e)}
                        fullWidth={false}
                        margin="normal"
                        error={!!errors.workload}
                        helperText={errors.workload}
                        disabled={loading}
                    />
                </div>
                <div className="w-full lg:w-3/10">
                    <TextInput
                        label="Vacantes"
                        name="vacancies"
                        value={formData.vacancies}
                        type="number"
                        onChange={(e) => handleChange(e)}
                        required={true}
                        fullWidth={false}
                        margin="normal"
                        error={!!errors.vacancies}
                        helperText={errors.vacancies}
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-3/10">
                    <FormControl fullWidth>
                        <InputLabel>Nivel</InputLabel>
                        <Select
                            name="nivel"
                            value={formData.nivel}
                            onChange={(e) => handleChange(e)}
                            error={!!errors.nivel}
                            label="Nivel"
                            disabled={loading}
                            className="mt-2"
                        >
                            {nivelOptions.map((nivel) => (
                            <MenuItem key={nivel} value={nivel}>
                                {nivel}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-full lg:w-3/10">
                    <TextInput
                        label="Salario Minimo (S/.)"
                        name="minSalary"
                        value={formData.minSalary}
                        type="number"
                        required={true}
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        error={!!errors.minSalary}
                        helperText={errors.minSalary}
                        disabled={loading}
                        fullWidth={false}
                    />
                </div>
                <div className="w-full lg:w-3/10">
                    <TextInput
                        label="Salario Maximo (S/.)"
                        name="maxSalary"
                        value={formData.maxSalary}
                        type="number"
                        onChange={(e) => handleChange(e)}
                        required={true}
                        margin="normal"
                        error={!!errors.maxSalary}
                        helperText={errors.maxSalary}
                        disabled={loading}
                        fullWidth={false}
                    />
                </div>
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
