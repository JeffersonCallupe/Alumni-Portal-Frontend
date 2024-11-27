import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Autocomplete from "@mui/material/Autocomplete";
import ActionButton from "../../../atoms/buttons/actionButton";

const options = ["Charla", "Conferencia", "Curso", "Taller", "Seminario", "Otro"];

const ConBuscador = ({ searchTerm, setSearchParams }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");

  // Actualiza el valor del parámetro de búsqueda en la URL
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchParams({ filter: value });
  };

  const handleApplyFilters = () => {
    const params = {};
    if (inputValue.trim()) params.filter = inputValue;
    if (selectedEventType) params.eventType = selectedEventType;
    if (selectedStartDate) params.startDate = selectedStartDate;
    
    setSearchParams(params);
  };


  const handleClearFilters = () => {
    // Limpia los filtros aplicados
    setInputValue("");
    setSelectedEventType("");
    setSelectedStartDate("");
    
    // Limpia los filtros que estan en la URL 
    setSearchParams((prevParams) => {
      const newParams = { ...prevParams };
      delete newParams.filter;
      delete newParams.eventType;
      delete newParams.startDate;
      return newParams;
  });
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
            <Autocomplete
              options={options}
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
            <ActionButton texto="Aplicar" onClick={handleApplyFilters} />
            <ActionButton texto="Limpiar Filtros" onClick={handleClearFilters} />
          </Box>
      </Card>
    </Box>
  );
};

export default ConBuscador;
