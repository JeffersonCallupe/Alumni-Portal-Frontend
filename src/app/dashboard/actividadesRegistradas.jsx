import React, { useState, useEffect } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/ActividadCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/ConfirmationDialog"; // Modal reutilizable
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import SinBuscador from "../../components/organisms/cards/filtros/SinBuscador";

function ActividadesRegistradas() {
  const [enrollments, setEnrollments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null); // Actividad seleccionada para cancelar inscripción
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false); // Estado del modal

  console.log(activities)

  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(activities);

  const enrollmentsEndpoint = `${
    import.meta.env.VITE_API_URL
  }/api/enrollment/user/${userData?.id}`;
  const { getData: getEnrollments } = useGet(enrollmentsEndpoint);

  const deleteEnrollmentEndpoint = `${
    import.meta.env.VITE_API_URL
  }/api/enrollment`;
  const { deleteData: deleteEnrollment } = useDelete(deleteEnrollmentEndpoint);

  // Fetch user's enrollments
  useEffect(() => {
    if (!userData) return;

    const fetchEnrollments = async () => {
      try {
        const enrollmentData = await getEnrollments();
        setEnrollments(enrollmentData);

        const activityPromises = enrollmentData.map((enrollment) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/activity/${enrollment.activityId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }).then((response) => response.json())
        );

        const activityDetails = await Promise.all(activityPromises);
        setActivities(activityDetails);
        setFilteredActivities(activityDetails);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        showAlert("No se pudieron cargar las actividades", "error");   // modificar
      }
    };

    fetchEnrollments();
  }, [userData]);

  // Open confirmation modal
  const handleOpenConfirmation = (activity) => {
    setSelectedActivity(activity); // Guarda la actividad seleccionada
    setOpenConfirmationDialog(true);
  };

  // Close confirmation modal
  const handleCloseConfirmation = () => {
    setSelectedActivity(null);
    setOpenConfirmationDialog(false);
  };

  // Handle canceling enrollment
  const handleConfirmCancelEnrollment = async () => {
    if (!selectedActivity) return;

    try {
      const enrollment = enrollments.find(
        (e) => e.activityId === selectedActivity.id
      );
      if (enrollment) {
        await deleteEnrollment(enrollment.id);

        setEnrollments((prev) => prev.filter((e) => e.activityId !== selectedActivity.id));
        setActivities((prev) => prev.filter((activity) => activity.id !== selectedActivity.id));
        setFilteredActivities((prev) =>
          prev.filter((activity) => activity.id !== selectedActivity.id)
        );

        showAlert("Inscripción cancelada exitosamente", "success");
        handleCloseConfirmation(); // Cierra el modal
      }
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      showAlert("No se pudo cancelar la inscripción", "error");
    }
  };

  const applyFilters = () => {
    let filtered = activities;

    if (eventTypeFilter) {
      filtered = filtered.filter(
        (activity) => activity.eventType === eventTypeFilter
      );
    }

    const normalizeDate = (dateStr) => new Date(dateStr).setHours(0, 0, 0, 0);

    if (startDateFilter) {
      filtered = filtered.filter((activity) => {
        const activityDate = normalizeDate(activity.startDate);
        const filterDate = normalizeDate(startDateFilter);
        return activityDate >= filterDate;
      });
    }

    setFilteredActivities(filtered);
  };

  const clearFilters = () => {
    setEventTypeFilter("");
    setStartDateFilter("");
    setFilteredActivities(activities); // Restaurar todas las actividades
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <HomeBase>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        <div className="lg:w-4/12">
          <SinBuscador
            eventTypeFilter={eventTypeFilter}
            setEventTypeFilter={setEventTypeFilter}
            startDateFilter={startDateFilter}
            setStartDateFilter={setStartDateFilter}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />
        </div>
        <div className="flex flex-col w-10/12 lg:w-7/12">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <ActividadCard
                key={activity.id}
                actividad={{
                  ...activity,
                  userId: userData.id,
                  userName: userData.name,
                  userPaternalSurname: userData.paternalSurname,
                  userMaternalSurname: userData.maternalSurname,
                }}
                multimediaApi={`${
                  import.meta.env.VITE_API_URL
                }/api/activity/activity-image`}
                onCancelEnrollment={() => handleOpenConfirmation(activity)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No se encontraron actividades con los filtros aplicados
            </div>
          )}
        </div>
      </div>
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmCancelEnrollment}
        title="Cancelar Inscripción"
        content={`¿Estás seguro de que deseas cancelar tu inscripción en la actividad "${selectedActivity?.title}"?`}
      />
    </HomeBase>
  );
}

export default ActividadesRegistradas;