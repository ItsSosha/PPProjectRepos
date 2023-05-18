import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { AuthProvider } from "./auth/auth";
import Modal from "./components/Modal/Modal"
import ModalAuth from "./components/Modal/ModalAuth";
import jwt_decode from "jwt-decode";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function handleLogin(resp) {
    setLoginModalOpen(false);
    
    let decoded = jwt_decode(resp.credential);
    document.cookie = `firstName=${decoded["given_name"]}; max-age=${Math.ceil(decoded["exp"] / 1000)}`;
    document.cookie = `lastName=${decoded["family_name"]}; max-age=${Math.ceil(decoded["exp"] / 1000)};`;
    document.cookie = `email=${decoded["email"]}; max-age=${Math.ceil(decoded["exp"] / 1000)};`;
    document.cookie = `profilePictureURL=${decoded["picture"].slice(0, decoded["picture"].indexOf("s96-c")) + "s256-c"}; max-age=${Math.ceil(decoded["exp"] / 1000)};`;
    document.cookie = `isAdmin=${true}; max-age=${Math.ceil(decoded["exp"] / 1000)};`;

    setUser({
      firstName: decoded["given_name"],
      lastName: decoded["family_name"],
      email: decoded["email"],
      profilePictureURL: decoded["picture"].slice(0, decoded["picture"].indexOf("s96-c")) + "s256-c",
      isAdmin: true
    });

    navigate("/users/0/about");
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "831759783769-tb5j14bhijihhhv7nkju52325remua8c.apps.googleusercontent.com",
      callback: handleLogin,
    });

    const cookies = document.cookie;
    const regex = /(firstName|lastName|email|profilePictureURL|isAdmin)=([^;]*)/g;
    const matches = cookies.matchAll(regex);
    
    const user = {};

    for (const match of matches) {
      user[match[1]] = match[2];
    }

    console.log(user);

    if (user["firstName"]) {
      setUser(user);
    }
  }, []);

  return (
    <AuthProvider value={{user: user, logout: () => setUser(false)}}>
      <Header handleSidebarClick={() => setSidebarOpen(true)} setLoginModalOpen={() => setLoginModalOpen(true)} />
      <Modal open={isLoginModalOpen} onModalClose={() => setLoginModalOpen(false)}>
        <ModalAuth />
      </Modal>
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
