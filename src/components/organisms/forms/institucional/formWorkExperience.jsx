import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import usePost from "../../../../hooks/usePost"; 

const FormNewExperience = ({ onCancel }) => {
    const { userData } = useUserContext();
    const { loading, error, post } = usePost();
    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            company: "",
            jobTitle: "",
            startDate: "",
            endDate: "",
            description: "",
        },
        async (formData) => {
            const userId = userData?.id; // Asegúrate de que userData tenga un id
            if (!userId) {
                console.error("User ID no encontrado");
                return;
            }
            const endpoint = `http://178.128.147.224:8080/api/work-experience/save/${userId}`;
            console.log("Endpoint:", endpoint); // Verifica que el endpoint sea correcto
            console.log("Datos a enviar:", formData); // Verifica que los datos sean correctos
            await post(endpoint, formData);
            if (!error) {
                onCancel(); // Cierra el formulario si no hay error
            } else {
                console.error("Error en la solicitud:", error);
            }
        }
    );

    const formFields = [
        { label: "Empresa", name: "company", value: formData.company },
        { label: "Título del puesto", name: "jobTitle", value: formData.jobTitle },
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
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
            {error && <p className="text-red-500">{error.message}</p>} {/* Mostrar mensaje de error */}
        </Box>
    );
};

export default FormNewExperience;