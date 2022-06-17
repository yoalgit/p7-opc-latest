import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Components
import { Link, Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import HeaderLogo from "../../assets/icon-left-font-monochrome-white.svg";

// Style
import styled from "styled-components";
import colors from "../../utils/style/colors";

const NavbarStyled = styled(Navbar)`
  background-color: ${colors.primary} !important;
`;
const Logo = styled(Image)`
  max-width: 250px;
`;
const NavStyled = styled(Nav)`
  .nav-link {
    color: ${colors.secondary} !important;
    margin-left: 15px;
    border-bottom: 2px solid transparent;
    &.active {
      border-color: ${colors.secondary};
    }
    &:hover {
      color: ${colors.secondary} !important;
      border-color: ${colors.secondary};
    }
  }
`;

function MainHeader() {
  const { currentUser, logout } = useContext(AuthContext);

  // once readyn, returns the 'window.location' object
  const location = useLocation();
  const [url, setUrl] = useState(null);

  // When location is read, indicate which link should be active
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <NavbarStyled
        collapseOnSelect
        expand="md"
        // bg="dark"
        variant="dark"
        className="sticky-top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <Logo alt="Groupomania" src={HeaderLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavStyled className="ms-auto">
              <Nav.Link
                as={Link}
                eventKey={1}
                to="/home"
                active={false}
                className={url === "/home" && "active"}
              >
                Accueil
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey={2}
                to={`/profile/${currentUser.userId}`}
                active={false}
                className={url && url.startsWith("/profile") && "active"}
              >
                Profil
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey={3}
                onClick={() => logout()}
                to="/auth"
              >
                Déconnexion
              </Nav.Link>
            </NavStyled>
          </Navbar.Collapse>
        </Container>
      </NavbarStyled>
      <Outlet />
    </>
  );
}

export default MainHeader;
