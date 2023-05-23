import styled from "styled-components";

import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button
} from "@mui/material";

import Logo from "./Logo";
import { Person, Menu, StarOutlineRounded, Search } from "@mui/icons-material";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { useAuthContext } from "../auth/auth";
import { useState } from "react";

const GridItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
`;

const Form = styled.form`
width: 80%;
`

const Header = ({ handleSidebarClick, setLoginModalOpen }) => {
  const { user } = useAuthContext();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!search) {
      return;
    }

    const params = createSearchParams({
      searchResult: search,
      offset: 0
    });

    navigate({
      pathname: "search",
      search: `?${params}`,
    });
  }

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        borderBottom: '1px rgba(0, 0, 0, 0.2) solid',
        marginBottom: '20px'
      }}
      position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          sx={{py: 1}}>
          <Grid container justifyItems="center" alignItems="center">
            <Grid item xs={1}>
              <GridItemContainer>
                <IconButton onClick={handleSidebarClick}>
                  <Menu sx={{ color: "rgba(0, 0, 0, 1)" }} />
                </IconButton>
              </GridItemContainer>
            </Grid>
            <Grid item xs={2}>
              <GridItemContainer>
                <Logo />
              </GridItemContainer>
            </Grid>
            <Grid item xs={7}>
              <GridItemContainer>
                <Form onSubmit={handleSubmit}>
                  <TextField
                  variant="outlined"
                  label="Search"
                  size="small"
                  color="secondary"
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                  sx={{
                      width: '100%'
                    }}
                  InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>)}}>
                  </TextField>
                </Form>
              </GridItemContainer>
            </Grid>
            <Grid item xs={1}>
              <GridItemContainer>
                <IconButton
                  onClick={user ? () => {} : () => setLoginModalOpen(true)}
                  component={(user) ? Link : Button}
                  to={`/users/${user?.id}/about`}>
                  
                  <Person sx={{ color: "rgba(0, 0, 0, 1)" }} />
                </IconButton>
              </GridItemContainer>
            </Grid>
            <Grid item xs={1}>
              <GridItemContainer>
                <IconButton
                  component={Link}
                  disabled={(user) ? false : true}
                  to={`/users/${user?.id}/wishlist`}>
                  <StarOutlineRounded sx={{ color: "rgba(0, 0, 0, 1)" }} />
                </IconButton>
              </GridItemContainer>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
