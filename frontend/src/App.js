import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { AuthProvider } from "./auth/auth";
import Modal from "./components/Modal/Modal";
import ModalAuth from "./components/Modal/ModalAuth";

const fetchUserSubscription = async (jwt) => {
  const response = await fetch(
    `https://pricely.tech/api/User/getSubscription?jwt=${jwt}`
  );

  return await response.json();
};

const fetchCategories = async () => {
  const response = await fetch("https://pricely.tech/api/Category");
  return await response.json();
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUserInfo = async (jwt) => {
    const subscription = await fetchUserSubscription(jwt);
    const user = subscription.user;

    const res = {
      jwt,
      id: user.id,
      firstName: user.firstName,
      lastName: user.surname,
      email: user.email,
      profilePictureURL:
        user.pictureLink.slice(0, user.pictureLink.indexOf("s96-c")) + "s256-c",
      isAdmin: user.isAdmin,
      expireDate: new Date(subscription.expireDate),
      isPremium: new Date(subscription.expireDate) > Date.now() ? true : false,
    };

    return res;
  };

  const handleLogin = async (resp) => {
    setLoginModalOpen(false);
    const user = await fetchUserInfo(resp.credential);
    setUser(user);
    document.cookie = `jwt=${resp.credential}; max-age=3599;`;
    navigate(`/users/${user.id}/about`);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "831759783769-tb5j14bhijihhhv7nkju52325remua8c.apps.googleusercontent.com",
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
      fetchUserInfo(jwt).then(setUser);
    }

    fetchCategories().then(setCategories);
  }, []);

  return (
    <AuthProvider value={{ user: user, logout: () => setUser(false) }}>
      <Header
        handleSidebarClick={() => setSidebarOpen(true)}
        setLoginModalOpen={() => setLoginModalOpen(true)}
      />
      <Modal
        open={isLoginModalOpen}
        onModalClose={() => setLoginModalOpen(false)}
      >
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
          my: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </AuthProvider>
  );
}

export default App;
