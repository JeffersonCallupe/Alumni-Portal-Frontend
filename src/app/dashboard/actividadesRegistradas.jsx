import React, { useState, useEffect } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog";
import FilterBar from "../../components/organisms/filters/FilterBar";
import FilterDrawer from "../../components/organisms/filters/FilterDrawer";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";

function ActividadesRegistradas() {
  const [enrollments, setEnrollments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [tempFilters, setTempFilters] = useState({
    eventType: "",
    startDate: "",
  });
  const [activeFilters, setActiveFilters] = useState({
    eventType: "",
    startDate: "",
  });
  const [filteredActivities, setFilteredActivities] = useState([]);

  const enrollmentsEndpoint = `${import.meta.env.VITE_API_URL}/api/enrollment/user/${userData?.id}`;
  const { getData: getEnrollments } = useGet(enrollmentsEndpoint);

  const deleteEnrollmentEndpoint = `${import.meta.env.VITE_API_URL}/api/enrollment`;
  const { deleteData: deleteEnrollment } = useDelete(deleteEnrollmentEndpoint);

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
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        showAlert("No se pudieron cargar las actividades", "error");
      }
    };

    fetchEnrollments();
  }, [userData]);

  const handleOpenConfirmation = (activity) => {
    setSelectedActivity(activity);
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedActivity(null);
    setOpenConfirmationDialog(false);
  };

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

        showAlert("Inscripción cancelada exitosamente", "success");
        handleCloseConfirmation();
      }
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      showAlert("No se pudo cancelar la inscripción", "error");
    }
  };

  useEffect(() => {
    let filtered = activities;
    if (activeFilters.eventType) {
      filtered = filtered.filter(
        (activity) => activity.eventType === activeFilters.eventType
      );
    }
    if (activeFilters.startDate) {
      filtered = filtered.filter(
        (activity) => activity.startDate >= activeFilters.startDate
      );
    }
    setFilteredActivities(filtered);
  }, [activeFilters, activities]);


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

  if (!userData) {
    return <div>Loading...</div>;
  }

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
        <div>
          {filteredActivities.length > 0 ? (
            filteredActivities.slice().reverse().map((activity) => (
              <ActividadCard
                key={activity.id}
                actividad={activity}
                multimediaApi={`${import.meta.env.VITE_API_URL}/api/activity/activity-image`}
                onCancelEnrollment={() => handleOpenConfirmation(activity)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              No tienes actividades registradas
            </div>
          )}
        </div>

        <ConfirmationDialog
          open={openConfirmationDialog}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirmCancelEnrollment}
          title="Confirmar Cancelación"
          content={`¿Estás seguro de que deseas cancelar tu inscripción en "${selectedActivity?.title}"?`}
        />
      </div>

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

export default ActividadesRegistradas;