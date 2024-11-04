import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import ActividadDialog from "../../components/organisms/dialog/actividadDialog";
import Button from "@mui/material/Button";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";

function Actividades() {
    const { open, handleOpen, handleClose } = useModal();
    const [actividades, setActividades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const { userData, isInstitutional } = useUserContext();

    // Definimos userType y URL dinámicas sólo si userData está disponible
    const userType = isInstitutional ? "user" : "company";
    const baseUrl = import.meta.env.VITE_API_URL;

    const { getData } = useGet(`${baseUrl}/api/activity/all`);
    const { post } = usePost(userData ? `${baseUrl}/api/activity/save-${userType}/${userData.id}` : null);
    const { patch } = usePatch(`${baseUrl}/api/activity/update-activity`);
    const { deleteData } = useDelete(`${baseUrl}/api/activity`);
    const multimediaApi = `${baseUrl}/api/activity/activity-image`;
    const fetchDataRef = useRef(false);

    useEffect(() => {
        if (!fetchDataRef.current) {
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
    }, [getData]);

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
        const requestData = new FormData();
        requestData.append("title", formData.title);
        requestData.append("description", formData.description);
        requestData.append("eventType", formData.eventType);
        requestData.append("startDate", formData.startDate);
        requestData.append("endDate", formData.endDate);
        requestData.append("location", formData.location);
        requestData.append("enrollable", formData.enrollable);
        if (formData.multimedia) {
            requestData.append("multimedia", formData.multimedia);
        }

        try {
            if (selectedActivity) {
                await patch(`/${selectedActivity.id}`, requestData);
            } else {
                await post(requestData);
            }
            handleClose();
            const updatedActivities = await getData();
            setActividades(updatedActivities);
        } catch (error) {
            console.error("Error al guardar la actividad:", error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

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
                                    multimediaApi={multimediaApi}
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
