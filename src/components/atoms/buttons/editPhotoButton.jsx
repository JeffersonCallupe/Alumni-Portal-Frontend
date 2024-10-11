import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
});

export default function editPhotoButton({ onChange }) {
  return (
    <Button
      component="label"
      role={undefined}
      color="white"
      variant="contained"
      tabIndex={-1}
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        padding:"0",
        display: "block",
      }}
    >
      <ModeEditIcon />
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
}
