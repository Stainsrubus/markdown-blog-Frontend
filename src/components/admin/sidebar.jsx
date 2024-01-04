import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Button } from "react-bootstrap";
import { Logouticon } from "../../assets/icons";

function Sidebar({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();

  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [role, setRole] = useState("");
  let logout = useLogout();

  return (
    <div className="sidebar-container">
      <div className="sidebar d-flex flex-column align-items-center">
        <img
          src="src/assets/markdown_logo.png"
          className="brand-icon mt-3 ms-3"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
        <div className="link-icons mt-3 d-flex flex-column ">
          <i className="fa-solid fa-house-user mt-4" onClick={() => navigate("/home")}></i>
          <i className="fa-solid fa-users-gear mt-5" onClick={() => navigate("/admin_dashboard")}></i>
          <i className="fa-solid fa-user-plus mt-5"  onClick={() => navigate("/createuser")}></i>
        </div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Navbar.Brand className="brand-name text-gradient">
                <img
                  src="src/assets/markdown_logo.png"
                  className="brand-icon"
                />
                Markdown Viewer
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav.Item className="nav-links" onClick={() => navigate("/home")}>
            <i className="fa-solid fa-house-user"></i><nav-link>Home</nav-link>
            </Nav.Item>
            <Nav.Item
              className="nav-links"
              onClick={() => navigate("/admin_dashboard")}
            >
              <i className="fa-solid fa-users"></i><nav-link>Dashboard</nav-link>
            </Nav.Item>
            <Nav.Item className="nav-links" onClick={() => navigate("/createuser")}>
              
            </Nav.Item>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <NAV userData={userData} role={role} logout={logout} />
    </div>
  );
}

function NAV({ userData, role, logout }) {
  return (
    <div className="navbar-container">
    <Navbar expand="lg" className="navbar p-1">
      <Container>
        <Nav>
          <Nav.Item className="d-flex flex-row align-items-center ms-5">
            <h4>{`Hi!  ${userData.firstName} ${userData.lastName} `}</h4>
            <h6>{role === "admin" ? `(${userData.role})` : null}</h6>
          </Nav.Item>
        </Nav>
        <div className="d-flex  gap-4 nav-items me-2">
          <Nav>
            <Nav.Item onClick={logout}>
              <Button className="lg-btn">
                {" "}
                <Logouticon />
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
    </div>
  );
}

export default Sidebar;
