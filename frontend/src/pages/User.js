import { NoEncryption } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";

import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../auth/auth";

const StyledNavLink = styled(NavLink)`
font-family: 'Inter', sans-serif;
font-weight: 400;
padding-inline: 20px;
padding-block: 12px;
border-block: 1px solid rgba(0, 0, 0, 0.15);
text-decoration: none;
color: #000;
&.active {
  border: none;
  background-color: #56B280;
  color: #fff;
}
`;

const User = (props) => {
  const { id } = useParams();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return;
  }

  const handleLogout = () => {
    document.cookie = `jwt=; max-age=-1;`;

    logout();
    navigate('/');
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <Stack sx={{
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "4px",
          boxShadow: "0 30px 24px rgba(0, 0, 0, 0.05)",
          maxWidth: "285px"
        }}>
          <Box my="20px" ml="20px">
            <Typography variant="h6" fontWeight="700">
              {user.firstName + " " + user.lastName}
            </Typography>
            <Typography variant="body2">
              {user.email}
            </Typography>
          </Box>
          <StyledNavLink to={`/users/${id}/about`}>
            Мій профіль
          </StyledNavLink>
          <StyledNavLink to={`/users/${id}/wishlist`}>
            Список бажань
          </StyledNavLink>
          {user?.isAdmin
          ? 
            <>
              <StyledNavLink to={`/users/${id}/admin/approved`}>
                Затверджені товари
              </StyledNavLink>
              <StyledNavLink to={`/users/${id}/admin/unapproved`}>
                Незатверджені товари
              </StyledNavLink>
              <StyledNavLink to={`/users/${id}/admin/manageCategories`}>
                Управління категоріями
              </StyledNavLink>
              <StyledNavLink to={`/users/${id}/admin/linkCategories`}>
                Пов'язання категорій
              </StyledNavLink>
            </> 
          : null }
          <Button variant="text" onClick={handleLogout} sx={{
            paddingInline: "20px",
            paddingBlock: "12px",
            borderBlock: "1px solid rgba(0, 0, 0, 0.15)",
            textDecoration: "none",
            color: "#000",
            justifyContent: "flex-start",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "400",
          }}>
            Вихід
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  )
};

export default User;
