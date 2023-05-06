import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./utils/theme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header handleSidebarClick={() => setSidebarOpen(true)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Container 
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
        }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
