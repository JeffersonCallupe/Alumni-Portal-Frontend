import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Autocomplete from "@mui/material/Autocomplete";
import ActionButton from "../../../atoms/buttons/ActionButton";

const options = ["Charla", "Conferencia", "Curso", "Taller", "Seminario", "Otro"];

const SinBuscador = ({ eventTypeFilter, setEventTypeFilter, startDateFilter, setStartDateFilter, applyFilters, clearFilters }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "80%", margin: "0 auto", paddingTop: "20px" }}>
          <FilterAltIcon />
          <p>Filtros</p>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "70%", margin: "0 auto", paddingTop: "20px", gap: "20px" }}>
          <Autocomplete
            options={options}
            value={eventTypeFilter}
            onChange={(event, newValue) => setEventTypeFilter(newValue || "")}
            renderInput={(params) => <TextField {...params} label="Tipo de evento" />}
            size="small"
          />
          <TextField
            label="Fecha de inicio"
            type="date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{ width: "100%" }}
          />
          <ActionButton texto="Aplicar" onClick={applyFilters} />
          <ActionButton texto="Limpiar" onClick={clearFilters} />
        </Box>
      </Card>
    </Box>
  );
};

export default SinBuscador;
