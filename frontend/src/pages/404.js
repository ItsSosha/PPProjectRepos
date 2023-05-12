import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        inset: 0,
        p: 2,
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "secondary.main",
        color: "primary.main"
      }}>
        <Typography
          align="center"
          variant="h2"
          component="h2"
        >
          404
        </Typography>
        <Typography
          align="center"
          variant="h6"
          component="p"
        >
          Ми не можемо знайти сторінку за вашим запитом.
        </Typography>
        <Typography
          align="center"
          variant="body1"
          component="p"
        >
          Можливо, сторінку, яку ви шукаєте, було видалено
        </Typography>
        <Button
          component={Link}
          variant="outlined"
          to="/"
          sx={{
            textTransform: "none",
            textDecoration: 'none',
            py: 1,
            px: 3,
            color: 'inherit'
          }}
        >
          На головну
        </Button>
    </Paper>
  );
};

export default NotFound;
