import Button from '@mui/material/Button';

const VerInfoButton = ({ texto }) => {
    return (
        <Button variant="contained" color="white" border="black">
            {texto}
        </Button>
    );
}

export default VerInfoButton;