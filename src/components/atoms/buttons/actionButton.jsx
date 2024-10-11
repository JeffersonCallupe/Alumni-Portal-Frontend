import Button from '@mui/material/Button';

const actionButton = ({ texto, onClick }) => {
    return (
        <Button variant="contained" color="white" border="black" onClick={onClick}>
            {texto}
        </Button>
    );
}

export default actionButton;
