import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/ofertaLaboralCard";
import OfertaLaboralDialog from "../../components/organisms/dialog/ofertaLaboralDialog";
import ParticipantsDialog from "../../components/organisms/dialog/ParticipantsDialogs";
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
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MESSAGES, USER_ROLES } from "../../constants/app.constants";

function OfertasLaborales() {
  const { open, handleOpen, handleClose } = useModal();
  const {
    open: openParticipantsModal,
    handleOpen: handleOpenParticipants,
    handleClose: handleCloseParticipants,
  } = useModal();
  const [ofertas, setOfertas] = useState([]);
  const [filteredOfertas, setFilteredOfertas] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const fetchDataRef = useRef(false);
  const token = sessionStorage.getItem("token");
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
    save: (companyId) =>
      `${import.meta.env.VITE_API_URL}/api/job-offer/save/${companyId}`,
    update: (id) => `${import.meta.env.VITE_API_URL}/api/job-offer/${id}`,
    delete: `${import.meta.env.VITE_API_URL}/api/job-offer`,
  };

  const { getData } = useGet(apiEndpoints.getAll);
  const { post } = usePost(apiEndpoints.save(userData?.id || ""));
  const { patch } = usePatch(apiEndpoints.update(selectedJob?.id || ""));
  const { deleteData } = useDelete(apiEndpoints.delete);

  useEffect(() => {
    if (!fetchDataRef.current) {
      const fetchOfertas = async () => {
        try {
          const data = await getData();
          setOfertas(data);
        } catch (error) {
          console.error("Error al cargar las ofertas laborales:", error);
        }
      };
      fetchOfertas();
      fetchDataRef.current = true;
    }
  }, [getData]);

  useEffect(() => {
    if (ofertas.length === 0) {
      setFilteredOfertas([]);
      return;
    }

    let filtered = ofertas;

    if (userData.role === USER_ROLES.COMPANY) {
      filtered = filtered.filter((oferta) => oferta.companyId === userData.id);
    }

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
  }, [searchTerm, activeFilters, ofertas, userData]);


  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleCreate = () => {
    if (userData.role !== USER_ROLES.COMPANY) {
      showAlert(MESSAGES.PERMISSIONS.COMPANY_ONLY_CREATE_JOB, "info");
      return;
    }
    setSelectedJob(null);
    handleOpen();
  };

  const handleEdit = (oferta) => {
    if (userData.role !== USER_ROLES.COMPANY) {
      showAlert(MESSAGES.PERMISSIONS.COMPANY_ONLY_EDIT_JOB, "info");
      return;
    }
    setSelectedJob(oferta);
    handleOpen();
  };

  const handleDelete = async (jobId) => {
    if (userData.role !== USER_ROLES.COMPANY) {
      showAlert(MESSAGES.PERMISSIONS.COMPANY_ONLY_DELETE_JOB, "info");
      return;
    }
    try {
      await deleteData(jobId);
      setOfertas((prevOfertas) =>
        prevOfertas.filter((job) => job.id !== jobId)
      );
      showAlert(MESSAGES.SUCCESS.JOB_DELETED, "success");
    } catch (error) {
      showAlert(MESSAGES.ERROR.JOB_DELETE, "error");
    }
  };

  const handleSaveJob = async (formData) => {
    try {
      if (selectedJob && selectedJob.id) {
        await patch(formData);
        showAlert(MESSAGES.SUCCESS.JOB_UPDATED, "success");
      } else {
        await post(formData);
        showAlert(MESSAGES.SUCCESS.JOB_CREATED, "success");
      }
      handleClose();
      const updatedOfertas = await getData();
      setOfertas(updatedOfertas);
    } catch (error) {
      showAlert(MESSAGES.ERROR.JOB_SAVE, "error");
    }
  };

  const handleViewParticipants = async (jobId) => {
    if (!jobId) {
      showAlert(MESSAGES.WARNING.NO_JOB_SELECTED, "warning");
      return;
    }

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/api/application/job-offer/${jobId}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de postulantes');
      }
      const data = await response.json();
      setParticipants(data);
      handleOpenParticipants();
    } catch (error) {
      console.error("Error al cargar la lista de postulantes:", error);
      showAlert(MESSAGES.ERROR.NO_APPLICANTS, "error");
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
        <OfertaLaboralDialog
          open={open}
          onClose={handleClose}
          initialData={selectedJob || {}}
          onSave={handleSaveJob}
        />
        <ParticipantsDialog
          open={openParticipantsModal}
          onClose={handleCloseParticipants}
          participants={participants}
        />
        <div>
          {filteredOfertas.length > 0 ? (
            filteredOfertas.slice().reverse().map((oferta) => (
              <OfertaLaboralCard
                key={oferta.id}
                oferta={oferta}
                onEdit={() => handleEdit(oferta)}
                onDelete={() => handleDelete(oferta.id)}
                onSeeListPostulants={() => handleViewParticipants(oferta.id)}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              No hay ofertas laborales disponibles
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button - Only for companies */}
      {userData.role === USER_ROLES.COMPANY && (
        <Tooltip title="Publicar nueva oferta" placement="left" arrow>
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
      )}

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

export default OfertasLaborales;
