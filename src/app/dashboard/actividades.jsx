import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import ActividadDialog from "../../components/organisms/dialog/actividadDialog";
import ParticipantsDialog from "../../components/organisms/dialog/participantsDialog";
import FilterBar from "../../components/organisms/filters/FilterBar";
import FilterDrawer from "../../components/organisms/filters/FilterDrawer";
import HomeBase from "../../components/templates/home/HomeBase";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import { uploadProfilePicture } from "../../hooks/manageImageUser";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Actividades() {
    const { open, handleOpen, handleClose } = useModal();
    const { open: openParticipantsModal, handleOpen: handleOpenParticipants, handleClose: handleCloseParticipants } = useModal();
    const [actividades, setActividades] = useState([]);
    const [filteredActividades, setFilteredActividades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [participants, setParticipants] = useState([]);
    const { userData, isInstitutional } = useUserContext();
    const { showAlert } = useAlert();
    const [apiEndpoints, setApiEndpoints] = useState({});
    const fetchDataRef = useRef(false);
    const token = sessionStorage.getItem("token");
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const [tempFilters, setTempFilters] = useState({
        eventType: "",
        startDate: "",
    });
    const [activeFilters, setActiveFilters] = useState({
        eventType: "",
        startDate: "",
    });

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

    const { getData } = useGet(apiEndpoints.getAll);
    const { post } = usePost(apiEndpoints.save);
    const { patch } = usePatch(apiEndpoints.update);
    const { deleteData } = useDelete(apiEndpoints.delete);

    useEffect(() => {
        if (userData && apiEndpoints.getAll && !fetchDataRef.current) {
            const fetchActividades = async () => {
                try {
                    const data = await getData();
                    let filtered;
                    if (userData.role === "USER") {
                        filtered = data.filter(activity => activity.userId === String(userData.id));
                    } else if (userData.role === "COMPANY") {
                        filtered = data.filter(activity => activity.companyId === String(userData.id));
                    }
                    setActividades(filtered);
                    setFilteredActividades(filtered);
                } catch (error) {
                    console.error("Error al obtener las actividades:", error);
                }
            };
            fetchActividades();
            fetchDataRef.current = true;
        }
    }, [userData, apiEndpoints.getAll, getData]);

    useEffect(() => {
        if (actividades.length === 0) {
            setFilteredActividades([]);
            return;
        }

        let filtered = actividades;
        if (activeFilters.eventType) {
            filtered = filtered.filter(
                (actividad) => actividad.eventType === activeFilters.eventType
            );
        }
        if (activeFilters.startDate) {
            filtered = filtered.filter(
                (actividad) => actividad.startDate >= activeFilters.startDate
            );
        }
        setFilteredActividades(filtered);
    }, [activeFilters, actividades]);

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
            setFilteredActividades((prevFiltered) => prevFiltered.filter((act) => act.id !== activityId));
            showAlert("Actividad eliminada con éxito.", "success");
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
        }
    };

    const handleViewParticipants = async (activityId) => {
        if (!activityId) {
            showAlert("No se seleccionó una actividad válida.", "warning");
            return;
        }
        try {
            const getParticipantsEndpoint = `${import.meta.env.VITE_API_URL}/api/enrollment/activity/${activityId}`;
            const response = await fetch(getParticipantsEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setParticipants(data);
            handleOpenParticipants();
        } catch (error) {
            console.error("Error al obtener los participantes:", error);
            showAlert("No hay participantes registrados en la actividad", "error");
        }
    };

    const handleFilterChange = (filterName, value) => {
        setTempFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleApplyFilters = () => {
        setActiveFilters(tempFilters);
    };

    const handleClearFilters = () => {
        setTempFilters({
            eventType: '',
            startDate: '',
        });
        setActiveFilters({
            eventType: '',
            startDate: '',
        });
    };

    const handleRemoveFilter = (filterName) => {
        setTempFilters(prev => ({
            ...prev,
            [filterName]: ''
        }));
        setActiveFilters(prev => ({
            ...prev,
            [filterName]: ''
        }));
    };

    const handleSaveActivity = async (formData) => {
        const activityData = {
            title: formData.title,
            description: formData.description,
            eventType: formData.eventType,
            startDate: formData.startDate,
            endDate: formData.endDate,
            location: formData.location,
            url: formData.url,
            enrollable: formData.enrollable,
        };

        try {
            let activityId;

            if (selectedActivity) {
                await patch(activityData, false);
                activityId = selectedActivity.id;

                setActividades((prevActividades) =>
                    prevActividades.map((activity) =>
                        activity.id === activityId ? { ...activity, ...formData } : activity
                    )
                );

                showAlert(`Actividad actualizada correctamente`, "success");
            } else {
                const activityResponse = await post(activityData);
                activityId = activityResponse.id;
                if (!activityId) {
                    throw new Error("No se pudo obtener el ID de la actividad de la respuesta.");
                }

                setActividades((prevActividades) => [
                    ...prevActividades,
                    { id: activityId, ...formData },
                ]);

                showAlert(`Actividad creada correctamente`, "success");
            }

            if (formData.multimedia) {
                await uploadProfilePicture(apiEndpoints.multimedia, activityId, formData.multimedia);
                showAlert("Multimedia subida o actualizada con éxito.", "success");
            }

            handleClose();
            window.location.reload();
        } catch (error) {
            console.error("Error al guardar o actualizar la actividad y/o multimedia:", error);
            showAlert("Error al guardar o actualizar la actividad.", "error");
        }
    };

    return (
        <HomeBase>
            <FilterBar
                searchTerm=""
                onSearchChange={() => { }}
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
            />

            <div className="max-w-3xl mx-auto px-4">
                <ActividadDialog
                    open={open}
                    onClose={handleClose}
                    initialData={selectedActivity || {}}
                    onSave={handleSaveActivity}
                    multimediaApi={apiEndpoints.multimedia}
                />
                <ParticipantsDialog
                    open={openParticipantsModal}
                    onClose={handleCloseParticipants}
                    participants={participants}
                />
                <div>
                    {filteredActividades.length > 0 ? (
                        filteredActividades.slice().reverse().map((actividad) => (
                            <ActividadCard
                                key={actividad.id}
                                actividad={actividad}
                                multimediaApi={apiEndpoints.multimedia}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSeeListParticipants={() => {
                                    handleViewParticipants(actividad.id);
                                }}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                            No hay actividades disponibles
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Button */}
            <Tooltip title="Publicar nueva actividad" placement="left" arrow>
                <Fab
                    aria-label="add"
                    onClick={handleCreate}
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        zIndex: 1000,
                        backgroundColor: '#6F191C',
                        color: '#FFFFFF',
                        boxShadow: '0 4px 12px rgba(111, 25, 28, 0.4)',
                        '&:hover': {
                            backgroundColor: '#8B1F23',
                            boxShadow: '0 6px 20px rgba(111, 25, 28, 0.6)',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <FilterDrawer
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
                viewActivies={true}
                filters={tempFilters}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
        </HomeBase>
    );
}

export default Actividades;
