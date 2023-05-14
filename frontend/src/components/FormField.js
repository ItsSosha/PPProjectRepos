import { Paper, Typography } from "@mui/material";

const FormField = ({ label }) => {
  return (
    <Paper variant="outlined" sx={{
      backgroundColor: "#F8FAFC",
      paddingX: "20px",
      paddingY: "13px"
    }}>
      <Typography variant="body2" fontWeight="700">
        {label}
      </Typography>
    </Paper>
  )
};

export default FormField;
