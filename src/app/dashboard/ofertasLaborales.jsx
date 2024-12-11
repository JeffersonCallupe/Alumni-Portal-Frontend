import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/OfertaLaboralCard";
import OfertaLaboralDialog from "../../components/organisms/dialog/OfertaLaboralDialog";
import ParticipantsDialog from "../../components/organisms/dialog/participantsDialogs";
import Button from "../../components/atoms/buttons/ActionButton";
import HomeBase from "../../components/templates/home/homeBase";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import ConBuscador from "../../components/organisms/cards/filtros/ConBuscador";
import { useSearchParams } from "react-router-dom";

function OfertasLaborales() {
  const { open, handleOpen, handleClose } = useModal();
  const {
    open: openParticipantsModal,
    handleOpen: handleOpenParticipants,
    handleClose: handleCloseParticipants,
  } = useModal();
  const [ofertas, setOfertas] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const fetchDataRef = useRef(false);
  const token = sessionStorage.getItem("token");

  // useSearchParams para manejar el término de búsqueda en la URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("filter") || "";
  const modalityFilter = searchParams.get("modality") || "";
  const areaFilter = searchParams.get("area") || "";
  const nivelFilter = searchParams.get("nivel") || "";

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
          showAlert("Error al obtener las ofertas laborales", "error");
        }
      };
      fetchOfertas();
      fetchDataRef.current = true;
    }
  }, [getData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleCreate = () => {
    if (userData.role !== "COMPANY") {
      showAlert("Solo las empresas pueden crear ofertas laborales.", "info");
      return;
    }
    setSelectedJob(null);
    handleOpen();
  };

  const handleEdit = (oferta) => {
    if (userData.role !== "COMPANY") {
      showAlert("Solo las empresas pueden editar ofertas laborales.", "info");
      return;
    }
    setSelectedJob(oferta);
    handleOpen();
  };

  const handleDelete = async (jobId) => {
    if (userData.role !== "COMPANY") {
      showAlert("Solo las empresas pueden eliminar ofertas laborales.", "info");
      return;
    }
    try {
      await deleteData(jobId);
      setOfertas((prevOfertas) =>
        prevOfertas.filter((job) => job.id !== jobId)
      );
      showAlert("Oferta laboral eliminada correctamente", "success");
    } catch (error) {
      showAlert("Error al eliminar la oferta laboral:", "error");
    }
  };

  const handleSaveJob = async (formData) => {
    try {
      if (selectedJob && selectedJob.id) {
        await patch(formData);
        showAlert("Oferta laboral actualizada correctamente", "success");
      } else {
        await post(formData);
        showAlert("Oferta laboral publicada correctamente", "success");
      }
      handleClose();
      const updatedOfertas = await getData();
      setOfertas(updatedOfertas);
    } catch (error) {
      showAlert("Error al guardar la oferta laboral:", "error");
    }
  };

  const handleViewParticipants = async (jobId) => {
    if (!jobId) {
      showAlert("No se seleccionó una oferta de trabajo válida.", "warning");
      return;
    }
    
    try {
      const endpoint = `http://178.128.147.224:8080/api/application/job-offer/${jobId}`;
      
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
      showAlert("No hay postulantes que han aplicado a la oferta laboral", "error");
    }
  };

  const filteredOfertas = ofertas.filter((oferta) => {
    if (!oferta) return false;
    // Mostrar solo ofertas del usuario actual
    if (userData.role === "COMPANY" && oferta.companyId !== userData.id) return false;
    // Filtro por término de búsqueda
    if (searchTerm && !oferta.companyName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (modalityFilter && oferta.modality.toLowerCase() !== modalityFilter.toLowerCase()) return false;
    if (areaFilter && oferta.area.toLowerCase() !== areaFilter.toLowerCase()) return false;
    if (nivelFilter && oferta.nivel.toLowerCase() !== nivelFilter.toLowerCase()) return false;
    return true;
  });

  const asideContent = (
    <div className="sticky top-8 bg-white p-6 lg:mt-2 mx-1 rounded-lg flex flex-col gap-4">
      {userData.role === "COMPANY" && (
        <Button texto={"Publica una oferta"} onClick={handleCreate} />
      )}
      <ConBuscador searchTerm={searchTerm} setSearchParams={setSearchParams} />
    </div>
  );

  return (
    <HomeBase aside={asideContent}>
      <div className="flex flex-row mt-4 mb-16 gap-4 lg:mx-1 justify-center">
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
        <div className="flex flex-col w-12/12 lg:w-11/12">
          {filteredOfertas.length > 0 ? (
            filteredOfertas.map((oferta) => (
              <OfertaLaboralCard
                key={oferta.id}
                oferta={oferta}
                onEdit={() => handleEdit(oferta)}
                onDelete={() => handleDelete(oferta.id)}
                onSeeListPostulants={() => handleViewParticipants(oferta.id)}
              />
            ))
          ) : (
            <div>No hay ofertas laborales disponibles</div>
          )}
        </div>
      </div>
    </HomeBase>
  );
}

export default OfertasLaborales;


