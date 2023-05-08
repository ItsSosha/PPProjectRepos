import styled from "styled-components";

import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Grid,
  TextField,
  InputAdornment
} from "@mui/material";

import Logo from "./Logo";
import { Person, Menu, StarOutlineRounded, Search } from "@mui/icons-material";

const GridItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
`;

const Header = ({ handleSidebarClick }) => {
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
                <TextField
                variant="outlined"
                label="Search"
                size="small"
                color="secondary"
                sx={{
                    width: '80%'
                  }}
                InputProps={{endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>)}}>
                </TextField>
              </GridItemContainer>
            </Grid>
            <Grid item xs={1}>
              <GridItemContainer>
                <IconButton>
                  <Person sx={{ color: "rgba(0, 0, 0, 1)" }} />
                </IconButton>
              </GridItemContainer>
            </Grid>
            <Grid item xs={1}>
              <GridItemContainer>
                <IconButton>
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
