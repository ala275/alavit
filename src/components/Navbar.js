import React from "react";
import logo from "./assets/image/logotop.png";
import { Link } from "react-router-dom";
import "../App.css";
import { Button, Icon } from 'semantic-ui-react'


function Navbar() {
  return (
    <>
      <a
        class="close-navbar-toggler collapsed"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></a>
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "black", minHeight: "90px" }}
      >
        <div className="container-fluid" style={{ maxWidth: "210vh" }}>
          <Link className="navbar-brand" to="/">
            <img id="logoimg" src={logo} alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li className="nav-item active" id="kkk">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>

          

              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
         

              <li className="nav-item">
                <Link className="nav-link" to="/team">
                  Board'23
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact
                </Link>
              </li>

              <li className="nav-item" style={{marginTop:'-1px'}}>
                <Link
                  className="nav-link"
                  to="/portal"
                >
                <Button icon labelPosition='right' size='small'
                
                  color="orange"
                >
                  <Icon name='sign-in'/> Login
                </Button>

                
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
