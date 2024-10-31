import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Container } from "react-bootstrap";
import { GlobalContextProvider } from "../context/Global/GlobalContext";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
export default function Layout() {
  const {auth, getAuth} = useAuth(); 
  useEffect(() => {getAuth()}, []); 
  return (
    <>
      {auth && (
        <GlobalContextProvider>
        <Navigation />
        <Container>
            <Outlet />
        </Container>
        </GlobalContextProvider>
      )}
    </>
  );
}
