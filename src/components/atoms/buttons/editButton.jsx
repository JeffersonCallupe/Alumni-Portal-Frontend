import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EditButton = ({ onClick }) => {
  return (
    <Button width="fit-content" color="white" onClick={onClick}>
      <ModeEditIcon />
    </Button>
  );
};

export default EditButton;
