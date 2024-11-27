import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import ActividadDialog from "../../components/organisms/dialog/actividadDialog";
import ParticipantsDialog from "../../components/organisms/dialog/participantsDialog";
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
import SinBuscador from "../../components/organisms/cards/filtros/SinBuscador";

function Actividades() {
  const { open: openActivityModal, handleOpen: handleOpenActivity, handleClose: handleCloseActivity } = useModal();
  const { open: openParticipantsModal, handleOpen: handleOpenParticipants, handleClose: handleCloseParticipants } = useModal();
  const [actividades, setActividades] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { userData, isInstitutional } = useUserContext();
  const { showAlert } = useAlert();
  const [apiEndpoints, setApiEndpoints] = useState({});
  const fetchDataRef = useRef(false);

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
        getParticipants: selectedActivity
          ? `${import.meta.env.VITE_API_URL}/api/enrollment/activity/${selectedActivity.id}`
          : null,
      });
    }
  }, [userData, isInstitutional, selectedActivity]);

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
    handleOpenActivity();
  };

  const handleEdit = (actividad) => {
    setSelectedActivity(actividad);
    handleOpenActivity();
  };

  const handleDelete = async (activityId) => {
    try {
      await deleteData(activityId);
      setActividades((prevActividades) =>
        prevActividades.filter((act) => act.id !== activityId)
      );
      showAlert("Actividad eliminada con éxito.", "success");
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
      showAlert("No se pudo eliminar la actividad.", "error");
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
        await patch(activityData, false);
        activityId = selectedActivity.id;
        showAlert(`Actividad actualizada con ID: ${activityId}`, "success");
      } else {
        const activityResponse = await post(activityData);
        const match = activityResponse.match(/: (\d+)/);
        activityId = match ? match[1] : null;

        if (!activityId) {
          throw new Error("No se pudo obtener el ID de la actividad de la respuesta.");
        }

        showAlert(`Actividad creada con ID: ${activityId}`, "success");
      }

      if (formData.multimedia) {
        await uploadProfilePicture(apiEndpoints.multimedia, activityId, formData.multimedia);
        window.location.reload();
        showAlert("Multimedia subida o actualizada con éxito.", "success");
      }

      const updatedActivities = await getData();
      setActividades(updatedActivities);

      handleCloseActivity();
    } catch (error) {
      console.error("Error al guardar o actualizar la actividad y/o multimedia:", error);
    }
  };

  return (
    <HomeBase>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        <div className="lg:w-4/12">
          
        </div>
        <div className="flex flex-col w-10/12 lg:w-7/12">
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Nueva Actividad
          </Button>
          <ActividadDialog
            open={openActivityModal}
            onClose={handleCloseActivity}
            initialData={selectedActivity || {}}
            onSave={handleSaveActivity}
          />
          <ParticipantsDialog
            open={openParticipantsModal}
            onClose={handleCloseParticipants}
            participants={participants}
            activityTitle={selectedActivity?.title}
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
