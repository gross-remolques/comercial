import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../context/Global/GlobalContext";
export default function Navigation() {
  const { theme, handleThemeChange } = useGlobal();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">Navbar</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/clientes" className="nav-link">Clientes</NavLink>
            <NavLink to="/unidades" className="nav-link">Unidades 0 km</NavLink>
            <NavLink to="/unidades-usadas" className="nav-link">Unidades Usadas</NavLink>
            <NavLink to="/camiones" className="nav-link">Camiones</NavLink>
          </Nav>
          <Button onClick={handleThemeChange} variant="outline-dark"><i className="bi bi-moon-stars-fill"></i></Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
