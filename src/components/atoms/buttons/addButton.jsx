import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const EditButton = ({ onClick }) => {
    return (
      <Button width="fit-content" color="white" onClick={onClick}>
        <AddCircleIcon />
      </Button>
    );
  };
  
  export default EditButton;