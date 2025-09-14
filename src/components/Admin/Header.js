import React, {useState, useEffect} from 'react'
import { useUserAuth } from "./context/UserAuthContext";
import { useNavigate } from "react-router";
import logo from "../assets/image/logotop.png";
import { Link } from "react-router-dom";
import "../../App.css";
import { Button, Icon } from 'semantic-ui-react'


function Header() {


  function refreshPage() {
    window.location.reload(false);
  }
const [date, setDate] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() =>setDate(new Date()), 1000)

  return function cleanup() {
    clearInterval(timer)
  }
})

     const { logOut, user } = useUserAuth();
   
   

     const navigate = useNavigate();
     const handleLogout = async () => {
       try {
         await logOut();
         navigate("/signin");
         refreshPage()
         return false;
       } catch (error) {
         console.log(error.message);
       }
     };
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
          <Link className="navbar-brand" >
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
            <li class="nav-item">
            <p style={{textAlign:'right',color: 'white',marginTop:'9px'}}>{date.toLocaleDateString()} | {date.toLocaleTimeString()}</p>
        </li>
        <li>
        <Button type="button" style={{marginTop:'9px'}} size='small' data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fa fa-user"></i> <i class="fa fa-caret-down" style={{marginLeft:'10px'}} aria-hidden="true"></i>
                            </Button>
       </li>
            </ul>
          </div>
        </div>
     
     
       
      </nav>







      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
      User: <span style={{color:'orange', textTransform:'uppercase'}}>{user && user.email}</span> <br></br> <br></br>
      <Button type="button" size='small' data-bs-dismiss="modal">Cancel</Button> 
      <Button icon labelPosition='left' size='small' color="red" style={{marginTop: '9px'}} onClick={handleLogout}>  <Icon name='sign-out'/> LogOut</Button>
       <br></br> <br></br>
      </div>
 
    </div>
  </div>
</div>
  
    </>
  )
}

export default Header
