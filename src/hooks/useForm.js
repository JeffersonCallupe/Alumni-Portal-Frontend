import { useState } from "react";

const useForm = (initialValues, onSubmit, validate) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleValidation = (fieldsToValidate=null) => {
        if (validate) {
            const validationErrors = validate(formData);
    
            // Si se pasan campos específicos, filtrar los errores
            const filteredErrors = fieldsToValidate
                ? Object.keys(validationErrors).reduce((acc, field) => {
                    if (fieldsToValidate.includes(field)) {
                        acc[field] = validationErrors[field];
                    }
                    return acc;
                }, {})
                : validationErrors;
    
            setErrors(filteredErrors);
            return Object.keys(filteredErrors).length === 0;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate ? validate(formData) : {};
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleValidation,
        handleSubmit
    };
};

export default useForm;
