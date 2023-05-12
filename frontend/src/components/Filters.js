import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button
} from "@mui/material";

import { Refresh } from "@mui/icons-material";

const Filters = ({ props }) => {

  const vendors = ["Rozetka", "Citrus"];

  return (
    <Box
      maxWidth="260px"
      py={4}
      px={2}
      boxShadow="0 4px 24px rgba(123, 123, 123, 0.35)"
      borderRadius="5px"
      alignSelf="start"
    >
      <form>
        <Typography variant="h6" mb={2}>
          Ціна, &#8372;
        </Typography>
        <Typography variant="body1" mb={1}>
          Від
        </Typography>
        <TextField
          mb={1}
          variant="outlined"
          label="Введіть початкову ціну"
          size="small"
          color="secondary"
          sx={{
            mb: "0.5em"
          }}
        >
        </TextField>
        <Typography variant="body1" mb={1}>
          До
        </Typography>
        <TextField
          mb={1}
          variant="outlined"
          label="Введіть кінцеву ціну"
          size="small"
          color="secondary"
          sx={{
            mb: "0.5em"
          }}
        >
        </TextField>
        <Typography variant="h6" mb={0} mt={1}>
          Акційні товари
        </Typography>
        <FormControlLabel control={<Checkbox color="secondary" />} label="Тільки акційні товари" />
        <Typography variant="h6" mb={0} mt={1}>
          Продавець
        </Typography>
        <FormGroup>
        {vendors.map((vendor) => (
          <FormControlLabel key={"checkbox" + vendor} control={<Checkbox color="secondary" />} label={vendor} />
        ))}
        </FormGroup>
        <Box 
          display="flex"
          justifyContent="space-between"
          mt={2}
        > 
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary"
            sx={{
              color: "#FFF",
              paddingX: "2em"
            }}
          >
            Шукати
          </Button>
          <Button 
            type="reset" 
            variant="outlined" 
            color="secondary"
          >
            <Refresh />
          </Button>
        </Box>
      </form>
    </Box>
  )
};

export default Filters;
