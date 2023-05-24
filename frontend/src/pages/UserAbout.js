import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../auth/auth";
import FormField from "../components/FormField";

const UserAbout = (props) => {
  const { user } = useAuthContext();

  return (
    <>
      <Typography variant="h4" fontWeight="700">
        Мій профіль
      </Typography>
      <Grid container mt={4}>
        <Grid item xs={8}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: "480px",
            }}
          >
            <Typography variant="body1">Ім'я</Typography>
            <FormField label={user.firstName} />
            <Typography variant="body1">Прізвище</Typography>
            <FormField label={user.lastName} />
            <Typography variant="body1">Email</Typography>
            <FormField label={user.email} />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" height="100%">
            <img
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
      {user.expireDate > new Date() ? (
        <Stack spacing={0}>
          <Typography variant="body1" fontSize="26px">
            Ваша підписка діє до {user.expireDate.toLocaleString()}
          </Typography>
          <Typography variant="body1" fontSize="26px">
            До сплину підписки{" "}
            {Math.ceil((user.expireDate - Date.now()) / 8.64e7)} днів
          </Typography>
          <Link
            href={`https://pricely.tech/api/User/pay?jwt=${user.jwt}`}
            variant="body1"
            fontSize="26px"
            color="inherit"
            target="_blank"
          >
            Продовжити підписку
          </Link>
        </Stack>
      ) : (
        <Typography variant="body1" fontSize="26px">
          На даний момент підписка не активна 😞. Щоб отримати доступ до
          преміального функціоналу, такого як доступ до історії цін на товар,
          <Link
            href={`https://pricely.tech/api/User/pay?jwt=${user.jwt}`}
            variant="body1"
            fontSize="26px"
            color="inherit"
            target="_blank"
          >
            оформіть підписку.
          </Link>
        </Typography>
      )}
    </>
  );
};

export default UserAbout;
