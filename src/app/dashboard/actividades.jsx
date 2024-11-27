import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import ActividadDialog from "../../components/organisms/dialog/actividadDialog";
import ParticipantsDialog from "../../components/organisms/dialog/participantsDialog";
import Button from "../../components/atoms/buttons/actionButton";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import { uploadProfilePicture } from "../../hooks/manageImageUser";
import SinBuscador from "../../components/organisms/cards/filtros/SinBuscador";

function Actividades() {
  const { open, handleOpen, handleClose } = useModal();
  const { open: openParticipantsModal, handleOpen: handleOpenParticipants, handleClose: handleCloseParticipants } = useModal();
  const [actividades, setActividades] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { userData, isInstitutional } = useUserContext();
  const { showAlert } = useAlert();
  const [apiEndpoints, setApiEndpoints] = useState({});
  const fetchDataRef = useRef(false);

  // Estados para los filtros
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [filteredActividades, setFilteredActividades] = useState([]);

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
        save: `${import.meta.env.VITE_API_URL}/api/activity/save-${userType}/${
          userData.id
        }`,
        update: selectedActivity
          ? `${import.meta.env.VITE_API_URL}/api/activity/update-activity/${
              selectedActivity.id
            }`
          : `${import.meta.env.VITE_API_URL}/api/activity/update-activity`,
        delete: `${import.meta.env.VITE_API_URL}/api/activity`,
        multimedia: `${
          import.meta.env.VITE_API_URL
        }/api/activity/activity-image`,
        getParticipants: selectedActivity
          ? `${import.meta.env.VITE_API_URL}/api/enrollment/activity/${selectedActivity.id}`
          : null,
      });
    }
  }, [userData, isInstitutional, selectedActivity]);

  // Hooks de API solo se inicializan cuando los endpoints están definidos
  const { getData } = useGet(apiEndpoints.getAll);
  const { getData: getParticipantsData } = useGet(apiEndpoints.getParticipants);
  const { post } = usePost(apiEndpoints.save);
  const { patch } = usePatch(apiEndpoints.update);
  const { deleteData } = useDelete(apiEndpoints.delete);

  useEffect(() => {
    if (userData && apiEndpoints.getAll && !fetchDataRef.current) {
      const fetchActividades = async () => {
        try {
          const data = await getData();
          setActividades(data);
          setFilteredActividades(data);
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
      setActividades((prevActividades) =>
        prevActividades.filter((act) => act.id !== activityId)
      );
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  };

  const handleViewParticipants = async () => {
    if (!apiEndpoints.getParticipants) {
      showAlert("No se seleccionó una actividad válida.", "warning");
      return;
    }
    try {
      const data = await getParticipantsData();
      setParticipants(data);
      handleOpenParticipants();
    } catch (error) {
      console.error("Error al obtener los participantes:", error);
      showAlert("No se pudo cargar la lista de participantes.", "error");
    }
  };

  // Filtrado de actividades
  const applyFilters = () => {
    let filtered = actividades;
    if (eventTypeFilter) {
      filtered = filtered.filter(
        (actividad) => actividad.eventType === eventTypeFilter
      );
    }
    if (startDateFilter) {
      filtered = filtered.filter(
        (actividad) => actividad.startDate >= startDateFilter
      );
    }
    setFilteredActividades(filtered);
  };

  const clearFilters = () => {
    setEventTypeFilter("");
    setStartDateFilter("");
    setFilteredActividades(actividades); // Restaurar todas las actividades
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
        // Actualización de la actividad
        await patch(activityData, false);
        activityId = selectedActivity.id;
        showAlert(`Actividad actualizada con ID: ${activityId}`, "success");
      } else {
        // Creación de la actividad
        const activityResponse = await post(activityData);
        const match = activityResponse.match(/: (\d+)/); // Busca el ID en la respuesta
        activityId = match ? match[1] : null;

        if (!activityId) {
          throw new Error(
            "No se pudo obtener el ID de la actividad de la respuesta."
          );
        }

        showAlert(`Actividad creada con ID: ${activityId}`, "success");
      }

      // Subir o actualizar multimedia
      if (formData.multimedia) {
        await uploadProfilePicture(
          apiEndpoints.multimedia,
          activityId,
          formData.multimedia
        );
        showAlert("Multimedia subida o actualizada con éxito.", "success");
      }

      // Actualizar la lista de actividades
      const updatedActivities = actividades.map((activity) =>
        activity.id === activityId ? { ...activity, ...formData } : activity
      );
      setActividades(updatedActivities);

      handleClose();
    } catch (error) {
      console.error(
        "Error al guardar o actualizar la actividad y/o multimedia:",
        error
      );
    }
  };

  const asideContent = (
    <div className="sticky top-8 bg-white p-6 lg:mt-2 mx-8 rounded-lg flex flex-col gap-4  ">
      <Button texto={"Publica una actividad"} onClick={handleCreate} />
      <SinBuscador
        eventTypeFilter={eventTypeFilter}
        setEventTypeFilter={setEventTypeFilter}
        startDateFilter={startDateFilter}
        setStartDateFilter={setStartDateFilter}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />
    </div>
  );

  return (
    <HomeBase aside={asideContent}>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        
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
            activityTitle={selectedActivity?.title}
          />
        <div className="flex flex-col w-12/12 lg:w-12/12 ">
          <div>
            {filteredActividades.length > 0 ? (
              filteredActividades.map((actividad) => (
                <ActividadCard
                  key={actividad.id}
                  actividad={actividad}
                  multimediaApi={apiEndpoints.multimedia}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSeeListParticipants={() => {
                    setSelectedActivity(actividad);
                    handleViewParticipants();
                  }}
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
