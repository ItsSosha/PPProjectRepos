import styled from "styled-components"
import Logo from "./Logo"
import { Container, IconButton, Typography } from "@mui/material"
import { 
  Twitter,
  Instagram,
  Facebook, 
} from "@mui/icons-material"

const FooterRow = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

const FooterIcons = styled.div`
display: flex;
column-gap: 48px;
`;

const Divider = styled.div`
width: 100%;
height: 1.5px;
margin: 52px 0;
background-color: #E1E1E1;
`;

const FooterWrapper = styled.footer`
width: 100%;
background-color: #221F1F;
color: #E1E1E1;
padding: 40px 0;
`;

const IconButtonInherit = styled(IconButton)`
color: inherit !important;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container
        maxWidth="xl">
        <FooterRow>
          <Logo />
          <FooterIcons>
            <IconButtonInherit><Facebook /></IconButtonInherit>
            <IconButtonInherit><Twitter /></IconButtonInherit>
            <IconButtonInherit><Instagram /></IconButtonInherit>
          </FooterIcons>
        </FooterRow>
        <Divider />
        <FooterRow>
          <Typography
            component={'p'}
            variant="body1">
            pricely@gmail.com
          </Typography>
          <Typography
            component={'p'}
            variant="body2">
            ©Pricely All Rights Reserved.
          </Typography>
        </FooterRow>
      </Container>
    </FooterWrapper>
  )
}

export default Footer;