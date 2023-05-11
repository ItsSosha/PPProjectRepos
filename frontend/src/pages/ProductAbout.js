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
const samplePriceHistory = [
  {date: "2023-05-06", price: 32500},
  {date: "2023-05-07", price: 33500},
  {date: "2023-05-08", price: 33500},
  {date: "2023-05-09", price: 30000},
  {date: "2023-05-10", price: 30000},
  {date: "2023-05-11", price: 32500}
];

const IS_USER_PREMIUM = true;


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
      
      {(!IS_USER_PREMIUM) 
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
        <PriceHistoryChart data={samplePriceHistory}/>
      </Box>}
    </AboutWrapper>
  )
}

export default ProductAbout;
