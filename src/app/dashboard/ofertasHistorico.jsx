import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/ofertaLaboralCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog";
import FilterBar from "../../components/organisms/filters/FilterBar";
import FilterDrawer from "../../components/organisms/filters/FilterDrawer";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";

function OfertasHistorico() {
  const [ofertas, setOfertas] = useState([]);
  const [filteredOfertas, setFilteredOfertas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const fetchDataRef = useRef(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [tempFilters, setTempFilters] = useState({
    modality: "",
    area: "",
    nivel: "",
  });
  const [activeFilters, setActiveFilters] = useState({
    modality: "",
    area: "",
    nivel: "",
  });

  const apiEndpoints = {
    getAll: `${import.meta.env.VITE_API_URL}/api/job-offer/all`,
    getApplications: `${import.meta.env.VITE_API_URL}/api/application/user/${userData?.id}`,
    apply: `${import.meta.env.VITE_API_URL}/api/application/save`,
  };

  const { getData: getAllJobOffers } = useGet(apiEndpoints.getAll);
  const { getData: getUserApplications } = useGet(apiEndpoints.getApplications);
  const { post: applyToJob } = usePost(apiEndpoints.apply);

  useEffect(() => {
    if (userData && apiEndpoints.getAll && apiEndpoints.getApplications && !fetchDataRef.current) {
      const fetchData = async () => {
        try {
          const [jobOffers, applications] = await Promise.all([
            getAllJobOffers(),
            getUserApplications(),
          ]);

          setOfertas(jobOffers);
          setInscripciones(applications.map((app) => app.jobOfferId));
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        }
      };
      fetchData();
      fetchDataRef.current = true;
    }
  }, [userData, apiEndpoints, getAllJobOffers, getUserApplications]);

  useEffect(() => {
    if (ofertas.length === 0) {
      setFilteredOfertas([]);
      return;
    }

    let filtered = ofertas;

    if (searchTerm) {
      filtered = filtered.filter((oferta) =>
        oferta.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oferta.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.modality) {
      filtered = filtered.filter(
        (oferta) => oferta.modality === activeFilters.modality
      );
    }

    if (activeFilters.area) {
      filtered = filtered.filter(
        (oferta) => oferta.area === activeFilters.area
      );
    }

    if (activeFilters.nivel) {
      filtered = filtered.filter(
        (oferta) => oferta.nivel === activeFilters.nivel
      );
    }

    setFilteredOfertas(filtered);
  }, [searchTerm, activeFilters, ofertas]);


  const handleOpenConfirmation = (oferta) => {
    setSelectedJob(oferta);
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedJob(null);
    setOpenConfirmationDialog(false);
  };

  const handleConfirmApplication = async () => {
    if (!selectedJob) return;

    const applicationData = {
      user: { id: userData.id },
      jobOffer: { id: selectedJob.id },
    };

    try {
      await applyToJob(applicationData);
      setInscripciones((prev) => [...prev, selectedJob.id]);
      showAlert("Te has postulado exitosamente a la oferta laboral.", "success");
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error al postularse a la oferta laboral:", error);
      showAlert("No se pudo completar la postulación.", "error");
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
      modality: '',
      area: '',
      nivel: '',
    });
    setActiveFilters({
      modality: '',
      area: '',
      nivel: '',
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
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
      />

      <div className="max-w-3xl mx-auto px-4">
        <div>
          {filteredOfertas.length > 0 ? (
            filteredOfertas.slice().reverse().map((oferta) => (
              <OfertaLaboralCard
                key={oferta.id}
                oferta={oferta}
                onApplication={
                  !inscripciones.includes(oferta.id)
                    ? () => handleOpenConfirmation(oferta)
                    : null
                }
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              No hay ofertas laborales disponibles
            </div>
          )}
        </div>

        <ConfirmationDialog
          open={openConfirmationDialog}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirmApplication}
          title="Confirmar Postulación"
          content={`¿Estás seguro de que deseas postularte a la oferta "${selectedJob?.title}"?`}
        />
      </div>

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        viewActivies={false}
        filters={tempFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </HomeBase>
  );
}

export default OfertasHistorico;
