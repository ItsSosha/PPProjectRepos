import { Typography, TextField, Rating, Button } from "@mui/material";

const ModalReview = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        sx={{
          fontWeight: 700,
          marginBottom: "1em"
        }}
      >
        Додати відгук
      </Typography>
      <TextField 
        multiline
        label="Введіть ваш відгук"
        minRows={10}
        color="secondary"
        sx={{
          minWidth: "75ch"
        }}
      />
      <Rating size="large"/>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          color: "primary.main",
          px: 5,
          py: 1
        }}
      >
        Додати відгук
      </Button>
    </>
  );
};

export default ModalReview;
