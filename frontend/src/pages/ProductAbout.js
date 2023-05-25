import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Typography, Paper, Link, Box } from "@mui/material";
import SpecificationsList from "../components/SpecificationsList/SpecificationsList";
import PriceHistoryChart from "../components/PriceHistoryChart";

const AboutWrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
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
      <SpecificationsList specs={product.rawItem.specifications}/>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          mt: 2,
          mb: 1
        }}>
        Динаміка цін
      </Typography>
      
      {(!product.priceHistories) 
      ? <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 0 30em",
          backgroundColor: "secondary.main"
        }}>
          <Typography 
            variant="h4"
            component="h4"
            color="primary"
            align="center">
          Для доступу до динаміки цін необхідно <Link href="#">оформити підписку</Link>
          </Typography>
      </Paper>
      : <Box sx={{
        width: "100%",
        height: "100%",
      }}>
        <PriceHistoryChart data={product.priceHistories}/>
      </Box>}
    </AboutWrapper>
  )
}

export default ProductAbout;
