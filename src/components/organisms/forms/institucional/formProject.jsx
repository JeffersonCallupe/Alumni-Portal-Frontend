import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import usePost from "../../../../hooks/usePost";

const FormNewProject = ({ onCancel }) => {
    const { userData } = useUserContext(); // Obtener el contexto del usuario
    const apiUrl = `http://178.128.147.224:8080/api/project/save/${userData?.id}`; // URL dinámica para guardar el proyecto
    const { loading, error, post } = usePost(apiUrl); // Hook para realizar el POST

    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            name: "",
            date: "",
            description: "",
        },
        async (formData) => {
            console.log("Datos a enviar:", formData); // Verificar los datos
            await post(formData); // Realizar la solicitud POST
            if (!error) {
                onCancel(); // Cerrar el formulario si no hay errores
            }
        }
    );

    const formFields = [
        { label: "Nombre del Proyecto", name: "name", value: formData.name },
        { label: "Fecha", name: "date", value: formData.date, type: "date" },
        { label: "Descripción", name: "description", value: formData.description, multiline: true }, // Suponiendo que necesitarás un área de texto
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
            {formFields.map(({ label, name, value, type }) => (
                <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
                        {label}:
                    </label>
                    {type === "textarea" ? (
                        <TextInput
                            name={name}
                            value={value}
                            onChange={handleChange}
                            error={errors[name]}
                            helperText={errors[name]}
                            disabled={loading}
                            multiline
                            rows={4} // Ajusta el número de filas según sea necesario
                        />
                    ) : (
                        <TextInput
                            name={name}
                            value={value}
                            onChange={handleChange}
                            error={errors[name]}
                            helperText={errors[name]}
                            disabled={loading}
                            type={type || "text"}
                        />
                    )}
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

export default FormNewProject;