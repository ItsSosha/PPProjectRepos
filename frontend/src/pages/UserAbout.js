import {
  Box,
  Grid,
  Stack,
  Typography,
  Link
} from "@mui/material";
import { useAuthContext } from "../auth/auth";

import FormField from "../components/FormField";

// const user = {
//   name: "Shark",
//   surname: "Fishers",
//   email: "shark@ocean.bul",
//   isPremium: false,
// }

const UserAbout = (props) => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <>
      <Typography variant="h4" fontWeight="700">
        Мій профіль
      </Typography>
      <Grid container mt={4}>
        <Grid item xs={8}>
          <Stack spacing={2} sx={{
            maxWidth: "480px"
          }}>
            <Typography variant="body1">
              Ім'я
            </Typography>
            <FormField label={user.firstName} />
            <Typography variant="body1">
              Прізвище
            </Typography>
            <FormField label={user.lastName} />
            <Typography variant="body1">
              Email
            </Typography>
            <FormField label={user.email} />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" height="100%">
            <img
              // src="https://lh3.googleusercontent.com/ogw/AOLn63HMIWZpv0of2VYV5NFGSQlWW5BU6GmdSx2OZOnBJA=s256-c-mo"
              src={user.profilePictureURL}
              alt="profile"
              style={{ borderRadius: "50%", scale: "1.2" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h4" fontWeight="700" mt={4}>
        Преміум підписка
      </Typography>
      {(user.isPremium) ?
        <Stack spacing={0}>
          <Typography variant="body1" fontSize="26px">
            Ваша підписка діє з 28.04.2023 до 28.05.2023
          </Typography>
          <Typography variant="body1" fontSize="26px">
            До сплину підписки 30 днів
          </Typography>
          <Link href="#" variant="body1" fontSize="26px" color="inherit">
            Продовжити підписку
          </Link>
        </Stack> :
        <Typography variant="body1" fontSize="26px">
          На даний момент підписка не активна 😞.
          Щоб отримати доступ до преміального функціоналу,
          такого як доступ до історії цін на товар,
          <Link href="#" variant="body1" fontSize="26px" color="inherit">оформіть підписку.</Link>
        </Typography>
      }
    </>
  )
};

export default UserAbout;
