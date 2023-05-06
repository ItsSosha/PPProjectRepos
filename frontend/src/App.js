import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./utils/theme";
import Header from "./components/Header";
import ProductCard from "./components/ProductsList/ProductCard";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Container 
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
        }}>
        <ProductCard />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
