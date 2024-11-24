import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import HomeBase from "../../components/templates/home/home";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog"; // Modal de confirmación
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import useModal from "../../hooks/useModal";

function ActividadesHistorico() {
  const { open, handleOpen, handleClose } = useModal();
  const [actividades, setActividades] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [apiEndpoints, setApiEndpoints] = useState({});
  const fetchDataRef = useRef(false);

  useEffect(() => {
    if (userData) {
      setApiEndpoints({
        getAll: `${import.meta.env.VITE_API_URL}/api/activity/all`,
        getEnrollment: `${import.meta.env.VITE_API_URL}/api/enrollment/user/${userData.id}`,
        register: `${import.meta.env.VITE_API_URL}/api/enrollment/save`,
      });
    }
  }, [userData]);

  const { getData: getAllActivities } = useGet(apiEndpoints.getAll);
  const { getData: getUserEnrollments } = useGet(apiEndpoints.getEnrollment);
  const { post: postEnrollment } = usePost(apiEndpoints.register);

  useEffect(() => {
    if (userData && apiEndpoints.getAll && apiEndpoints.getEnrollment && !fetchDataRef.current) {
      const fetchData = async () => {
        try {
          const [activities, enrollments] = await Promise.all([
            getAllActivities(),
            getUserEnrollments(),
          ]);
          setActividades(activities);
          setInscripciones(enrollments.map((e) => e.activityId)); // Obtener solo los IDs de actividades inscritas
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
      fetchDataRef.current = true;
    }
  }, [userData, apiEndpoints, getAllActivities, getUserEnrollments]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleRegisterClick = (actividad) => {
    setSelectedActivity(actividad);
    handleOpen(); // Abre el modal de confirmación
  };

  const handleConfirmRegister = async () => {
    if (!selectedActivity) return;

    const enrollmentData = {
      user: { id: userData.id },
      activity: { id: selectedActivity.id },
    };

    try {
      await postEnrollment(enrollmentData);
      setInscripciones((prev) => [...prev, selectedActivity.id]); // Agrega la nueva inscripción
      showAlert("Te has inscrito exitosamente en la actividad.", "success");
      handleClose();
    } catch (error) {
      console.error("Error al inscribirse en la actividad:", error);
      showAlert("No se pudo realizar la inscripción.", "error");
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
            {actividades.length > 0 ? (
              actividades.map((actividad) => (
                <ActividadCard
                  key={actividad.id}
                  actividad={actividad}
                  multimediaApi={`${import.meta.env.VITE_API_URL}/api/activity/activity-image`}
                  onRegister={
                    !inscripciones.includes(actividad.id) // Verifica si el usuario no está inscrito
                      ? () => handleRegisterClick(actividad)
                      : null
                  }
                />
              ))
            ) : (
              <div>No hay actividades disponibles.</div>
            )}
          </div>
          <ConfirmationDialog
            open={open}
            onClose={handleClose}
            onConfirm={handleConfirmRegister}
            title="Confirmar Inscripción"
            content={`¿Estás seguro de que deseas inscribirte en la actividad "${selectedActivity?.title}"?`}
          />
        </div>
      </div>
    </HomeBase>
  );
}

export default ActividadesHistorico;



