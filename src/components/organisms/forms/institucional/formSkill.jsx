import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import SelectInput from "../../../atoms/inputs/SelectInput"; // Asegúrate de tener un componente de SelectInput
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContext";
import usePost from "../../../../hooks/usePost";

const FormNewSkill = ({ onCancel }) => {
    const { userData } = useUserContext(); // Obtenemos el contexto de usuario
    const apiUrl = `http://178.128.147.224:8080/api/skill/save/${userData?.id}`; // URL dinámica para guardar la habilidad
    const { loading, error, post } = usePost(apiUrl); // Hook para hacer el POST request

    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            name: "",
            level: "",
        },
        async (formData) => {
            console.log("Datos a enviar:", formData); // Verificar los datos
            await post(formData); // Realizar la solicitud POST
            if (!error) {
                window.location.reload();
                onCancel(); // Cerrar el formulario si no hay errores
            }
        }
    );

    const formFields = [
        { label: "Nombre de la Habilidad", name: "name", value: formData.name },
        {
            label: "Nivel",
            name: "level",
            value: formData.level,
            type: "select",
            options: [
                { value: "", label: "Selecciona un nivel" },
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
            ],
        },
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
            {formFields.map(({ label, name, value, type, options }) => (
                <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
                        {label}:
                    </label>
                    {type === "select" ? (
                        <SelectInput
                            name={name}
                            value={value}
                            onChange={handleChange}
                            error={errors[name]}
                            helperText={errors[name]}
                            disabled={loading}
                            options={options}
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

export default FormNewSkill;