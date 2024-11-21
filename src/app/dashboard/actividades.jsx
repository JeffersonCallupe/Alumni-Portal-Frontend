import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard2";
import ActividadDialog from "../../components/organisms/dialog/actividadDialog";
import Button from "@mui/material/Button";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import { uploadProfilePicture } from "../../hooks/manageImageUser";

function Actividades() {
    const { open, handleOpen, handleClose } = useModal();
    const [actividades, setActividades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const { userData, isInstitutional } = useUserContext();
    const { showAlert } = useAlert();
    const [apiEndpoints, setApiEndpoints] = useState({});
    const fetchDataRef = useRef(false);

    // Solo se define userType y URLs dinámicas si userData está disponible
    useEffect(() => {
        if (userData) {
            let userType;
            if (userData.role === "USER") {
                userType = "user";
            } else if (userData.role === "COMPANY") {
                userType = "company";
            }
            setApiEndpoints({
                getAll: `${import.meta.env.VITE_API_URL}/api/activity/all`,
                save: `${import.meta.env.VITE_API_URL}/api/activity/save-${userType}/${userData.id}`,
                update: selectedActivity
                    ? `${import.meta.env.VITE_API_URL}/api/activity/update-activity/${selectedActivity.id}`
                    : `${import.meta.env.VITE_API_URL}/api/activity/update-activity`,
                delete: `${import.meta.env.VITE_API_URL}/api/activity`,
                multimedia: `${import.meta.env.VITE_API_URL}/api/activity/activity-image`,
            });
        }
    }, [userData, isInstitutional, selectedActivity]);

    // Hooks de API solo se inicializan cuando los endpoints están definidos
    const { getData } = useGet(apiEndpoints.getAll);
    const { post } = usePost(apiEndpoints.save);
    const { patch } = usePatch(apiEndpoints.update);
    const { deleteData } = useDelete(apiEndpoints.delete);

    useEffect(() => {
        if (userData && apiEndpoints.getAll && !fetchDataRef.current) {
            const fetchActividades = async () => {
                try {
                    const data = await getData();
                    setActividades(data);
                } catch (error) {
                    console.error("Error al obtener las actividades:", error);
                }
            };
            fetchActividades();
            fetchDataRef.current = true;
        }
    }, [userData, apiEndpoints.getAll, getData]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleCreate = () => {
        setSelectedActivity(null);
        handleOpen();
    };

    const handleEdit = (actividad) => {
        setSelectedActivity(actividad);
        handleOpen();
    };

    const handleDelete = async (activityId) => {
        try {
            await deleteData(activityId);
            setActividades((prevActividades) => prevActividades.filter((act) => act.id !== activityId));
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
        }
    };

    const handleSaveActivity = async (formData) => {
        const activityData = {
            title: formData.title,
            description: formData.description,
            eventType: formData.eventType,
            startDate: formData.startDate,
            endDate: formData.endDate,
            location: formData.location,
            url: null,
            enrollable: formData.enrollable,
        };
    
        try {
            let activityId;
    
            if (selectedActivity) {
                // Actualización de la actividad
                //const patchEndpoint = `${import.meta.env.VITE_API_URL}/api/activity/update-activity/${selectedActivity.id}`;
                await patch(activityData, false);
                activityId = selectedActivity.id;
                showAlert(`Actividad actualizada con ID: ${activityId}`, "success");
            } else {
                // Creación de la actividad
                const activityResponse = await post(activityData);
                const match = activityResponse.match(/: (\d+)/); // Busca el ID en la respuesta
                activityId = match ? match[1] : null;
    
                if (!activityId) {
                    throw new Error("No se pudo obtener el ID de la actividad de la respuesta.");
                }
    
                showAlert(`Actividad creada con ID: ${activityId}`, "success");
            }
    
            // Subir o actualizar multimedia
            if (formData.multimedia) {
                await uploadProfilePicture(apiEndpoints.multimedia, activityId, formData.multimedia);
                window.location.reload();
                showAlert("Multimedia subida o actualizada con éxito.", "success");
            }
    
            // Actualizar la lista de actividades
            const updatedActivities = await getData();
            setActividades(updatedActivities);
    
            handleClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al guardar o actualizar la actividad y/o multimedia:", error);
        }
    };
    
    

    return (
        <HomeBase>
            <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
                <div className="lg:w-4/12">
                    <p>Filtros aaa</p>
                </div>
                <div className="flex flex-col w-10/12 lg:w-7/12">
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Nueva Actividad
                    </Button>
                    <ActividadDialog
                        open={open}
                        onClose={handleClose}
                        initialData={selectedActivity || {}}
                        onSave={handleSaveActivity}
                    />
                    <div>
                        {actividades.length > 0 ? (
                            actividades.map((actividad) => (
                                <ActividadCard
                                    key={actividad.id}
                                    actividad={actividad}
                                    multimediaApi={apiEndpoints.multimedia}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div>No hay actividades disponibles</div>
                        )}
                    </div>
                </div>
            </div>
        </HomeBase>
    );
}

export default Actividades;
