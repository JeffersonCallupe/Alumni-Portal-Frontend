import { useState } from "react";

const useFormRegistro = (initialValues, onSubmit) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};

        // Ejemplo de validación de contraseñas
        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        setFormData,
    };
};

export default useFormRegistro;
