import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
// import { BsFillPersonFill } from "react-icons/fa";

function CollapsibleExample(props) {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const pathname = window.location.pathname;
  console.log(pathname);
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedin(true);
  };

  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const [name, setname] = useState();

  useEffect(() => {
    var item_value = sessionStorage.getItem("UserInfo");
    console.log(item_value);
    setname(item_value);
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavbarBrand className="nav-bar">
            <a href="/home">
              <h2>Online Shoping</h2>
            </a>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {pathname === "/home" ? (
              <Nav className="me-auto">
                <NavDropdown title="Category" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/mobile">Mobile</NavDropdown.Item>
                  <NavDropdown.Item href="/tv">TV</NavDropdown.Item>
                  <NavDropdown.Item href="/laptop">Laptop</NavDropdown.Item>
                  <NavDropdown.Item href="/ac">AC</NavDropdown.Item>
                  <NavDropdown.Item href="/watch">Watch</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              ""
            )}
          </Navbar.Collapse>
          {pathname === "/home" || "/cart" ? (
            <>
              <NavbarBrand> {name}</NavbarBrand>
              <NavbarBrand href="/myorder">Myorder</NavbarBrand>

              <Nav>
                <Link to="/cart">
                  {" "}
                  <div className="nav-bag">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-handbag-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                    </svg>

                    <span className="bag-quantity">
                      <span>{cartTotalQuantity}</span>
                    </span>
                  </div>
                </Link>
              </Nav>

              <NavbarBrand href="/login" onClickCapture={logout}>
                Logout
              </NavbarBrand>
            </>
          ) : (
            <NavbarBrand href="/regi" className="nav-bar">
              Registration
            </NavbarBrand>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default CollapsibleExample;
