import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Autocomplete from "@mui/material/Autocomplete";
import ActionButton from "../../../atoms/buttons/actionButton";

const typeEvent = ["Charla", "Conferencia", "Curso", "Taller", "Seminario", "Otro"];
const typeModality = ["Presencial", "Remoto", "Hibrido"];
const typeArea = ["Agricultura", "Banca", "Contruscción", "Educación", "Energía", "Finanzas", "Manufactura", "Retail", "Salud", "Tecnología", "Telecomunucaciones", "Transporte", "Turismo", "Otro" ] ;
const typeNivel = ["Practicante", "Trainee", "Junior", "Semi-senior", "Senior", "Ejecutivo", "Otro"];


const ConBuscador = ({ searchTerm, setSearchParams, viewActivies }) => {

  const [inputValue, setInputValue] = useState(searchTerm);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedModality, setSelectedModality] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedNivel, setSelectedNivel] = useState("");

  // Actualiza el valor del parámetro de búsqueda en la URL
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchParams({ filter: value });
  };

  const handleApplyFilters = () => {
    const params = {};
    if (inputValue.trim()) params.filter = inputValue;
    if(viewActivies){
      if (selectedEventType) params.eventType = selectedEventType;
      if (selectedStartDate) params.startDate = selectedStartDate;
    }else{
      if (selectedModality) params.modality = selectedModality;
      if (selectedArea) params.area = selectedArea;
      if (selectedNivel) params.nivel = selectedNivel;
    }
    setSearchParams(params);
}


  const handleClearFilters = () => {
    // Limpia los filtros aplicados
    setInputValue("");
    setSelectedEventType("");
    setSelectedStartDate("");
    setSelectedModality("");
    setSelectedArea("");
    setSelectedNivel("");
    
    setSearchParams({});
  };


  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <Box component="form" sx={{ width: "80%", margin: "0 auto", mb: 2 }}>
          <TextField
            label="Ingrese nombre de empresa..."
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={handleInputChange}
            sx={{ width: "100%" }}
          />
        </Box>

        <hr className="w-full h-1" />

        <Box sx={{ display: "flex", flexDirection: "row", width: "80%", margin: "0 auto", paddingTop: "20px" }}>
          <FilterAltIcon />
          <p>Filtros</p>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "70%", margin: "0 auto", paddingTop: "20px", gap: "20px" }}>
          
          {/* Renderizado por condicional */}

          {viewActivies ? (
            <>
              <Autocomplete
                options={typeEvent}
                onChange={(event, newValue) => setSelectedEventType(newValue || "")}
                renderInput={(params) => <TextField {...params} label="Tipo de evento" />}
                size="small"
              />
              <TextField
                label="Fecha de inicio"
                type="date"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ width: "100%" }}
              />
            </>
          ) : (
            <>
              <Autocomplete
                options={typeModality}
                onChange={(event, newValue) => setSelectedModality(newValue || "")}
                renderInput={(params) => <TextField {...params} label="Tipo de modalidad" />}
                size="small"
              />
              <Autocomplete
                options={typeArea}
                onChange={(event, newValue) => setSelectedArea(newValue || "")}
                renderInput={(params) => <TextField {...params} label="Área" />}
                size="small"
              />
              <Autocomplete
                options={typeNivel}
                onChange={(event, newValue) => setSelectedNivel(newValue || "")}
                renderInput={(params) => <TextField {...params} label="Nivel" />}
                size="small"
              />
            </>
          )}
          <ActionButton texto="Aplicar" onClick={handleApplyFilters} />
          <ActionButton texto="Limpiar Filtros" onClick={handleClearFilters} />
        </Box>
      </Card>
    </Box>
  );
};

export default ConBuscador;
