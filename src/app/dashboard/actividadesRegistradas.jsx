import React, { useState, useEffect, useRef } from "react";
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
        const formdata = new FormData();
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

        formdata.append("activity", JSON.stringify(activityData));
        if (formData.multimedia) {
            formdata.append("image", formData.multimedia);
        }

        try {
            if (selectedActivity) {
                console.log("patch", formdata);
                await patch(formdata, true);
            } else {
                console.log("post", formdata);
                await post(formdata, true);
            }
            handleClose();
            const updatedActivities = await getData();
            setActividades(updatedActivities);
        } catch (error) {
            console.error("Error al guardar la actividad:", error);
        }
    };

    return (
        <HomeBase>
            <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
                <div className="lg:w-4/12">
                    <p>Filtros aaa</p>
                </div>
                <div className="flex flex-col w-10/12 lg:w-7/12">

                    <div>

                    </div>
                </div>
            </div>
        </HomeBase>
    );
}

export default Actividades;