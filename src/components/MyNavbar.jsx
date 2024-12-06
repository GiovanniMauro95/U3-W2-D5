import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const WeatherNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("IT");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-0">
      <Container>
        <Navbar.Brand href="#home">
          EpiMeteo 1.0
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown id="basic-nav-dropdown" title={selectedLanguage}>
              <NavDropdown.Item onClick={() => handleLanguageChange("EN")}>EN</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("IT")}>IT</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherNavbar;
