import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/ofertaLaboralCard";
import OfertaLaboralDialog from "../../components/organisms/dialog/ofertaLaboralDialog";
import Button from "@mui/material/Button";
import HomeBase from "../../components/templates/home/home";
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
  const [ofertas, setOfertas] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const fetchDataRef = useRef(false);
  let viewActivies = false;

  // useSearchParams para manejar el término de búsqueda en la URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("filter") || ""; 
  const modalityFilter = searchParams.get("modality") || "";
  const areaFilter = searchParams.get("area") || "";
  const nivelFilter = searchParams.get("nivel") || "";

  const apiEndpoints = {
    getAll: `${import.meta.env.VITE_API_URL}/api/job-offer/all`,
    getById: (id) => `${import.meta.env.VITE_API_URL}/api/job-offer/${id}`,
    delete: `${import.meta.env.VITE_API_URL}/api/job-offer`,
    save: (companyId) =>
      `${import.meta.env.VITE_API_URL}/api/job-offer/save/${companyId}`,
    update: (id) => `${import.meta.env.VITE_API_URL}/api/job-offer/${id}`,
    getByCompany: (companyId) =>
      `${import.meta.env.VITE_API_URL}/api/job-offer/company/${companyId}`,
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


   // Filtrado de ofertas
   const filteredOfertas = ofertas.filter((oferta) => {
    if (!oferta) return false;
  
    // Filtro por término de búsqueda
    if (searchTerm && oferta.companyName && !oferta.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
  
    // Filtro por modalidad
    if (modalityFilter && (!oferta.modality || oferta.modality.toLowerCase() !== modalityFilter.toLowerCase())) {
      return false;
    }
  
    // Filtro por área
    if (areaFilter && (!oferta.area || oferta.area.toLowerCase() !== areaFilter.toLowerCase())) {
      return false;
    }
  
    // Filtro por nivel
    if (nivelFilter && (!oferta.nivel || oferta.nivel.toLowerCase() !== nivelFilter.toLowerCase())) {
      return false;
    }
  
    return true;
  });
  




  return (
    <HomeBase>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        <div className="lg:w-4/12 ">
          <ConBuscador
          searchTerm={searchTerm}
          setSearchParams={setSearchParams}
          viewActivies={viewActivies}
          />
        </div>

        <div className="flex flex-col w-10/12 lg:w-7/12">
          {userData.role === "COMPANY" && (
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Nueva Oferta
            </Button>
          )}
          <OfertaLaboralDialog
            open={open}
            onClose={handleClose}
            initialData={selectedJob || {}}
            onSave={handleSaveJob}
          />
          <div>
            {filteredOfertas.length > 0 ? (
              filteredOfertas.map((oferta) => (
                <OfertaLaboralCard
                  key={oferta.id}
                  oferta={oferta}
                  onEdit={() => handleEdit(oferta)}
                  onDelete={() => handleDelete(oferta.id)}
                />
              ))
            ) : (
              <div>No hay ofertas laborales disponibles</div>
            )}
          </div>
        </div>
      </div>
    </HomeBase>
  );
}

export default OfertasLaborales;
