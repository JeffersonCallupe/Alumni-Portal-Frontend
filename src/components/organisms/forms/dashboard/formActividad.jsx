import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Textarea from "../../../atoms/inputs/TextareaAutosize";
import TextInput from "../../../atoms/inputs/TextInput";
import Typography from "@mui/material/Typography";
import useForm from "../../../../hooks/useForm";
import { getProfilePicture, deleteProfilePicture } from "../../../../hooks/manageImageUser";
import { useAlert } from "../../../../contexts/alertContext";

const FormActividad = ({ initialData = {}, onSubmit, onCancel, multimediaApi, loading, error }) => {  
    const eventTypeOptions = ["Charla", "Conferencia", "Curso", "Taller", "Seminario", "Otro"]
    const [imageFile, setImageFile] = useState(null);
    const [multimedia, setMultimedia] = useState(initialData.multimedia || null);
    const { showAlert } = useAlert();
    
    useEffect(() => {
        const fetchMultimedia = async () => {
          if (initialData.url) {
            try {
              const multimediaUrl = await getProfilePicture(multimediaApi, initialData.id);
              setMultimedia(multimediaUrl);
            } catch (error) {
              showAlert('Error al obtener el contenido multimedia de la actividad:', "error");
              setMultimedia(null);
            }
          }
        };
        fetchMultimedia();
      }, [multimediaApi, initialData]);

    const handleImageUpdate = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setMultimedia(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleImageDelete = async () => {
        if (multimedia && initialData.id) {
            await deleteProfilePicture(multimediaApi, initialData.id);
            setMultimedia(null);
            setImageFile(null);
            showAlert("Imagen eliminada correctamente", "success");
        }
      };

    const handleSwitchChange = (e) => {
        handleChange({
            target: {
                name: e.target.name,
                value: e.target.checked,
            }
        });
    };

    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            title: initialData.title || "",
            description: initialData.description || "",
            eventType: initialData.eventType || "",
            startDate: initialData.startDate || "",
            endDate: initialData.endDate || "",
            location: initialData.location || "",
            enrollable: initialData.enrollable || true,
        },
        async (formData) => {
            await onSubmit({...formData, multimedia: imageFile });
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
            <Stack direction="row" justifyContent={"flex-end"} spacing={1} sx={{ alignItems: 'center' }}>
                <Typography>
                    {formData.enrollable ? "Se aceptan inscripciones" : "Las inscripciones están cerradas"}
                </Typography>
                <Switch 
                    label="Inscribible" 
                    name="enrollable"
                    checked={formData.enrollable} 
                    onChange={handleSwitchChange}
                />
            </Stack>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/5">
                    <TextInput
                        label="Título"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                        required={true}
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={loading}
                        className="flex-1"
                        fullWidth={true}
                    />
                </div>
                <div className="flex flex-col flex-1 mt-2">
                <FormControl>
                    <InputLabel>Tipo de Evento</InputLabel>
                    <Select
                        name="eventType"
                        value={formData.eventType}
                        onChange={(e) => handleChange(e)}
                        error={!!errors.eventType}
                        label="Tipo de Evento"
                        disabled={loading}
                    >
                        {eventTypeOptions.map((evento) => (
                        <MenuItem key={evento} value={evento}>
                            {evento}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
            </div>
            <div>
                <Textarea
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    maxRows={5}
                    onChange={(e) => handleChange(e)}
                    disabled={loading}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <TextInput
                    label="Fecha de inicio"
                    name="startDate"
                    value={formData.startDate}
                    type="date"
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    disabled={loading}
                />
                <TextInput
                    label="Fecha de finalización"
                    name="endDate"
                    value={formData.endDate}
                    type="date"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    disabled={loading}
                />
                <TextInput
                    label="Ubicación"
                    name="location"
                    value={formData.location}
                    required={true}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="normal"
                    error={!!errors.location}
                    helperText={errors.location}
                    disabled={loading}
                />
            </div>
            {/* Sección de multimedia */}
            <div className="flex flex-col items-center gap-4">
                {multimedia && (
                <div className="relative">
                    <img src={multimedia} alt="Previsualización" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                </div>
                )}
                <label htmlFor="file-upload">
                <input
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    accept="image/*,video/*"
                    onChange={handleImageUpdate}
                />
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading}
                    >
                        {multimedia ? "Actualizar Archivo" : "Subir Archivo"}
                    </Button>
                    <Button 
                        className="text-red-700"
                        onClick={handleImageDelete} 
                        startIcon={<DeleteIcon />}
                        disabled={multimedia==null}
                    >
                        Eliminar archivo
                    </Button>
                </div>
                </label>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <Button variant="outlined" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                </Button>
            </div>
        </Box>
    );
};

export default FormActividad;