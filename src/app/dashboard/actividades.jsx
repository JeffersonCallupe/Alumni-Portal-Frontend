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

function Actividades() {
    const { open, handleOpen, handleClose } = useModal();
    const [actividades, setActividades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const { userData, isInstitutional } = useUserContext();
    console.log(userData)

    //console.log("actividad es?", isInstitutional);
    //console.log("actividad data", userData);

    const { loading: getLoading, error: getError, getData } = useGet(`${import.meta.env.VITE_API_URL}/api/activity/all`);
    const { loading: postLoading, error: postError, post } = usePost(/*postApi*/null);
    const { loading: patchLoading, error: patchError, patch } = usePatch(/*postApi*/null);

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


    const handleOpenDialog = (actividad) => {
        setSelectedActivity(actividad);
        handleOpen();
    }
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

        if (selectedActivity) {
            //await patch(requestData);
            console.log("patch");
        } else {
            //await post(requestData);
            console.log("post");
        }

        handleClose();
    };

    return (
        <HomeBase>
            <div>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                    Nueva Actividad
                </Button>
                {/* Ejemplo para editar */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDialog(actividades[0])}
                >
                    Editar Actividad
                </Button>
                <ActividadDialog
                    open={open}
                    onClose={handleClose}
                    initialData={selectedActivity}
                    onSave={handleSaveActivity}
                    loading={postLoading || patchLoading}
                    error={postError || patchError}
                />
                <div>
                    {actividades && actividades.length > 0 ? (
                        actividades.map((actividad) => (
                            <ActividadCard key={actividad.id} actividad={actividad} />
                        ))
                    ) : (
                        <div>No hay actividades disponibles</div>
                    )}
                </div>
            </div>

        </HomeBase>
    );
}

export default Actividades;
