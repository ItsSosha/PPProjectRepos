import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@mui/material";
import SpecificationsList from "../components/SpecificationsList/SpecificationsList";

const AboutWrapper = styled.div`
padding: 20px;
`


const ProductAbout = () => {
  const { product } = useOutletContext();

  return (
    <AboutWrapper>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          mb: 1
        }}>
        Характеристики
      </Typography>
      <SpecificationsList specs={product.Specifications}/>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          mt: 2,
          mb: 1
        }}>
        Динаміка цін
      </Typography>
    </AboutWrapper>
  )
}

export default ProductAbout;
