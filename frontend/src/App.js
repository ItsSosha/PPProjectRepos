import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);

  return (
    <>
      <Header handleSidebarClick={() => setSidebarOpen(true)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Container 
        component={"main"}
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          my: '48px',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
