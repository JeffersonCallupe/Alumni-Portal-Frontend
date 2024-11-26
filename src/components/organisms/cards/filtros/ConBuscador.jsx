import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {TextField } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Autocomplete from "@mui/material/Autocomplete";
import TextInput from "../../../atoms/inputs/TextInput";
import ActionButton from "../../../atoms/buttons/actionButton";
import { useSearchParams } from "react-router-dom";

const options = ["The Godfather", "Pulp Fiction"];





const ConBuscador = ({ onSearch, searchTerm }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <React.Fragment>
          <Box component="form" sx={{ width: "80%", margin: "0 auto", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Ingrese nombre de empresa ...  "
              variant="outlined"
              size="small"
              type="text"
              value={searchTerm}
              onChange={onSearch}
              sx={{ width: "100%" }}
             />
            
          </Box>

          <hr className="w-full h-1 " />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          >
            <FilterAltIcon />
            <p> Filtros</p>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              margin: "0 auto",
              paddingTop: "20px",
              gap: "20px",
            }}
          >
            <Autocomplete
              disablePortal
              options={options}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de evento" />
              )}
              size="small"
            />

            <TextInput
              label="Fecha de inicio"
              name="startDate"
              //   value={formData.startDate}
              type="date"
              required={true}
              //   onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
              size="small"
              //   error={!!errors.startDate}
              //   helperText={errors.startDate}
              //   disabled={loading}
            />

            <ActionButton texto="Aplicar" />
          </Box>
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default ConBuscador;
