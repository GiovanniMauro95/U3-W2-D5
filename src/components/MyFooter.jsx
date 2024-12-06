import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 EpiMeteo 1.0. Diritti Riservati.</p>
            <p>
              <a href="/privacy" className="text-white">Privacy Policy</a> | 
              <a href="/terms" className="text-white"> Termini del Servizio</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;