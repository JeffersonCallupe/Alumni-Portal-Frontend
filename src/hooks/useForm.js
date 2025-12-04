import { useState } from "react";

/**
 * Custom hook para gestionar formularios con validación
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} onSubmit - Función a ejecutar al enviar el formulario
 * @param {Function} [validate] - Función opcional de validación
 * @returns {Object} Objeto con datos y funciones del formulario
 * @returns {Object} returns.formData - Datos actuales del formulario
 * @returns {Object} returns.errors - Errores de validación
 * @returns {Function} returns.handleChange - Manejador de cambios en inputs
 * @returns {Function} returns.handleValidation - Función de validación manual
 * @returns {Function} returns.handleSubmit - Manejador de envío del formulario
 */
const useForm = (initialValues, onSubmit, validate) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    /**
     * Maneja los cambios en los campos del formulario
     * @param {Object} event - Evento del input
     */
    const handleChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Valida el formulario o campos específicos
     * @param {Array<string>} [fieldsToValidate=null] - Campos específicos a validar
     * @returns {boolean} True si no hay errores, false en caso contrario
     */
    const handleValidation = (fieldsToValidate = null) => {
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

    /**
     * Maneja el envío del formulario
     * @param {Event} e - Evento de submit
     */
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
