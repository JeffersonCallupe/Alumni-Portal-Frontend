import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContext";
import usePost from "../../../../hooks/usePost";

const FormNewEducation = ({ onCancel }) => {
    const { userData } = useUserContext(); // Obtenemos el contexto de usuario
    const apiUrl = `http://178.128.147.224:8080/api/education/save/${userData?.id}`; // URL dinámica basada en el ID de usuario
    const { loading, error, post } = usePost(apiUrl); // Hook adaptado a la nueva implementación

    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            description: "",
        },
        async (formData) => {
            console.log("Datos a enviar:", formData); // Verificar datos antes de la solicitud
            await post(formData); // Enviar la solicitud
            if (!error) {
                window.location.reload();
                onCancel(); // Cerrar el formulario si no hay errores
            }
        }
    );

    const formFields = [
        { label: "Institución", name: "institution", value: formData.institution },
        { label: "Grado", name: "degree", value: formData.degree },
        { label: "Campo de estudio", name: "fieldOfStudy", value: formData.fieldOfStudy },
        { label: "Fecha de inicio", name: "startDate", value: formData.startDate, type: "date" },
        { label: "Fecha de fin", name: "endDate", value: formData.endDate, type: "date" },
        { label: "Descripción", name: "description", value: formData.description, multiline: true },
    ];

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
            {formFields.map(({ label, name, value, type, multiline }) => (
                <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
                        {label}:
                    </label>
                    <TextInput
                        name={name}
                        value={value}
                        onChange={handleChange}
                        error={errors[name]}
                        helperText={errors[name]}
                        disabled={loading}
                        type={type || "text"}
                        multiline={multiline || false}
                        rows={multiline ? 4 : 1}
                    />
                </div>
            ))}
            <div className="flex justify-end gap-4 mt-4">
                <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Añadir"}
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
        </Box>
    );
};

export default FormNewEducation;