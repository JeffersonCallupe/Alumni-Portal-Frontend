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

    const handleValidation = () => {
        if (validate) {
            const validationErrors = validate(formData);
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
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
        handleSubmit
    };
};

export default useForm;
