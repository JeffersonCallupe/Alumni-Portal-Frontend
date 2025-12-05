import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog";
import FilterBar from "../../components/organisms/filters/FilterBar";
import FilterDrawer from "../../components/organisms/filters/FilterDrawer";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import useModal from "../../hooks/useModal";
import { useSearchParams } from "react-router-dom";

function ActividadesHistorico() {
  const { open, handleOpen, handleClose } = useModal();
  const [actividades, setActividades] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [apiEndpoints, setApiEndpoints] = useState({});
  const fetchDataRef = useRef(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  let viewActivies = true;

  // useSearchParams para manejar el término de búsqueda en la URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("filter") || "";
  const eventTypeFilter = searchParams.get("eventType") || "";
  const startDateFilter = searchParams.get("startDate") || "";

  // Estado local para filtros antes de aplicarlos
  const [tempFilters, setTempFilters] = useState({
    eventType: eventTypeFilter,
    startDate: startDateFilter,
  });

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
    if (
      userData &&
      apiEndpoints.getAll &&
      apiEndpoints.getEnrollment &&
      !fetchDataRef.current
    ) {
      const fetchData = async () => {
        try {
          const [activities, enrollments] = await Promise.all([
            getAllActivities(),
            getUserEnrollments(),
          ]);
          setActividades(activities);
          setInscripciones(enrollments.map((e) => e.activityId));
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
    handleOpen();
  };

  const handleConfirmRegister = async () => {
    if (!selectedActivity) return;

    const enrollmentData = {
      user: { id: userData.id },
      activity: { id: selectedActivity.id },
    };

    try {
      await postEnrollment(enrollmentData);
      setInscripciones((prev) => [...prev, selectedActivity.id]);
      showAlert("Te has inscrito exitosamente en la actividad.", "success");
      handleClose();
    } catch (error) {
      console.error("Error al inscribirse en la actividad:", error);
      showAlert("No se pudo realizar la inscripción.", "error");
    }
  };

  // Manejar cambio de búsqueda
  const handleSearchChange = (value) => {
    const params = {};
    if (value.trim()) params.filter = value;
    if (eventTypeFilter) params.eventType = eventTypeFilter;
    if (startDateFilter) params.startDate = startDateFilter;
    setSearchParams(params);
  };

  // Manejar cambio de filtros en el drawer
  const handleFilterChange = (filterName, value) => {
    setTempFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Aplicar filtros
  const handleApplyFilters = () => {
    const params = {};
    if (searchTerm) params.filter = searchTerm;
    if (tempFilters.eventType) params.eventType = tempFilters.eventType;
    if (tempFilters.startDate) params.startDate = tempFilters.startDate;
    setSearchParams(params);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setTempFilters({
      eventType: '',
      startDate: '',
    });
    setSearchParams({});
  };

  // Remover filtro individual
  const handleRemoveFilter = (filterName) => {
    const params = Object.fromEntries(searchParams);
    delete params[filterName];
    setSearchParams(params);
    setTempFilters(prev => ({
      ...prev,
      [filterName]: ''
    }));
  };

  // Filtrar actividades
  const normalizeDate = (dateStr) => new Date(dateStr).setHours(0, 0, 0, 0);

  const filteredActivities = actividades.filter((actividad) => {
    if (!searchTerm && !eventTypeFilter && !startDateFilter) return true;
    if (!actividad) return false;

    if (searchTerm) {
      if (
        !actividad.companyName ||
        !actividad.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
    }

    if (eventTypeFilter) {
      if (!actividad.eventType || actividad.eventType !== eventTypeFilter) {
        return false;
      }
    }

    if (startDateFilter) {
      const actividadStartDate = normalizeDate(actividad.startDate);
      const filterStartDate = normalizeDate(startDateFilter);

      if (actividadStartDate < filterStartDate) {
        return false;
      }
    }

    return true;
  });

  // Filtros activos para FilterBar
  const activeFilters = {
    eventType: eventTypeFilter,
    startDate: startDateFilter,
  };

  return (
    <HomeBase>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
      />

      <div className="max-w-3xl mx-auto px-4">
        <div>
          {filteredActivities.length > 0 ? (
            filteredActivities.slice().reverse().map((actividad) => (
              <ActividadCard
                key={actividad.id}
                actividad={actividad}
                multimediaApi={`${import.meta.env.VITE_API_URL}/api/activity/activity-image`}
                onRegister={
                  !inscripciones.includes(actividad.id)
                    ? () => handleRegisterClick(actividad)
                    : null
                }
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              No hay actividades disponibles.
            </div>
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

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        viewActivies={viewActivies}
        filters={tempFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </HomeBase>
  );
}

export default ActividadesHistorico;

