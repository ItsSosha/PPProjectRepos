import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { AuthProvider } from "./auth/auth";
import Modal from "./components/Modal/Modal"
import ModalAuth from "./components/Modal/ModalAuth";

const fetchUser = async (jwt) => {
  const response = await fetch(`https://pricely.tech/api/User?jwt=${jwt}`);

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
}

const fetchCategories = async () => {
  const response = await fetch('https://pricely.tech/api/Category');
  return await response.json();
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = async (resp) => {
    setLoginModalOpen(false);

    fetchUser(resp.credential).then(user => {
      setUser({
        jwt: resp.credential,
        id: user.id,
        firstName: user.firstName,
        lastName: user.surname,
        email: user.email,
        profilePictureURL: user.pictureLink.slice(0, user.pictureLink.indexOf("s96-c")) + "s256-c",
        isAdmin: true
      });
      document.cookie = `jwt=${resp.credential}; max-age=604800;`;
      navigate(`/users/${user.id}/about`);
    });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "831759783769-tb5j14bhijihhhv7nkju52325remua8c.apps.googleusercontent.com",
      callback: handleLogin,
    });

    const cookies = document.cookie;
    const regex = /(jwt)=([^;]*)/g;
    const matches = cookies.matchAll(regex);
    let jwt;
    for (const match of matches) {
      jwt = match[2];
    }

    if (jwt) {
      fetchUser(jwt).then(user => {
        setUser({
          jwt,
          id: user.id,
          firstName: user.firstName,
          lastName: user.surname,
          email: user.email,
          profilePictureURL: user.pictureLink.slice(0, user.pictureLink.indexOf("s96-c")) + "s256-c",
          isAdmin: true
        });
      });
    }

    fetchCategories()
      .then(setCategories);

  }, []);

  return (
    <AuthProvider value={{user: user, logout: () => setUser(false)}}>
      <Header handleSidebarClick={() => setSidebarOpen(true)} setLoginModalOpen={() => setLoginModalOpen(true)} />
      <Modal open={isLoginModalOpen} onModalClose={() => setLoginModalOpen(false)}>
        <ModalAuth />
      </Modal>
      <Sidebar
        categories={categories}
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: "center"
        }}>
        <Outlet />
      </Container>
      <Footer />
    </AuthProvider>
  );
}

export default App;
