import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { AuthProvider } from "./auth/auth";

function App() {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);
  const [user, setUser] = useState({
    name: "sasha",
    isAdmin: true
  });

  return (
    <AuthProvider value={user}>
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
    </AuthProvider>
  );
}

export default App;
