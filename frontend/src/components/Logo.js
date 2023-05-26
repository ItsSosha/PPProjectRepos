import { LocalOffer } from "@mui/icons-material";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";


const LogoWrapper = styled(Link)`
display: flex;
column-gap: 8px;
text-decoration: none;
color: inherit;
`

const Logo = () => {
  return (
    <LogoWrapper to="/">
      <LocalOffer />
      <Typography 
        component={"h1"} 
        variant="h1">
        Pricely
      </Typography>
    </LogoWrapper>
  );
};

export default Logo;
