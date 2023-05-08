import { LocalOffer } from "@mui/icons-material";
import { Typography } from "@mui/material";
import styled from "styled-components";

const LogoWrapper = styled.div`
display: flex;
column-gap: 8px;
`

const Logo = () => {
  return (
    <LogoWrapper>
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
