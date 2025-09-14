import React from "react";
import './Style.css'
import { Link } from "react-router-dom"

import { Card } from 'semantic-ui-react'
import GoToTop from '../../../GoToTop'

const Home = () => {





  return (
    <>  <GoToTop />
  <div className="main-wrapper">
      
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li className="menu-title">Main</li>
                        <li>
                            <Link to="/portal"><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link>
                        </li>
                        <li>
                            <Link to="/mom"><i className="fa fa-users" aria-hidden="true"></i> <span>Minutes of Meeting</span></Link>
                        </li>

		
                        <li>
                            <Link to="/boardview"><i className="fa fa-users" aria-hidden="true"></i> <span>Board</span></Link>
                        </li>

                    

                          <li>
                            <Link to="/facultyview"><i className="fa fa-users" aria-hidden="true"></i> <span>Advisors</span></Link>
                        </li>

                        <li>
                            <Link to="/messages"><i className="fa fa-envelope" aria-hidden="true"></i> <span>Messages</span></Link>
                        </li>

   
                    
                    </ul>
                </div>
            </div>
        </div>
        <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-12"  style={{marginTop: '6vh'}}>
                        <h4 style={{fontWeight: 'bold', fontFamily: 'Montserrat'}} className="page-title">DASHBOARD</h4>
                       
                    </div>
                </div>

             
<div className="container-fluid">
                <div className="row" style={{marginTop: '2vh'}}>

                <div className="col-lg my-2" >
                <Link to="/attendance">
                   <Card 
                     image=''
                        header='Attendance'
                        description='Details >>'/>
                   </Link>
                    </div>

                   
                   

                <div className="col-lg my-2" >
                <Link to="/mom">
                   <Card
                     image=''
                        header='Minutes of Meeting'
                        description='Details >>'/>
                   </Link>
                    </div>

                   


                   <div className="col-lg my-2">
                   <Link to="/galleryview">
                   <Card
                     image=''
                        header='Gallery'
                        description='Details >>'/>
                   </Link>
                   </div>

                   <div className="col-lg my-2">
                    <Link to="/facultyview">
                   <Card
                   image=''
                        header='Advisors'
                        description='Details >>'/>
                   </Link>
                    </div>

                   <div className="col-lg my-2">
                   <Link to="/boardview">
                   <Card
                    image=''
                        header='Board'
                        description='Details >>'/>
                   </Link>
                   </div>


                   <div className="col-lg my-2">
                   <Link to="/teammembers">
                   <Card
                    image=''
                        header='Team'
                        description='Details >>'/>
                   </Link>
                   </div>


                   <div className="col-lg my-2">
                   <Link to="/members_dept">
                   <Card
                    image=''
                        header='Departments'
                        description='Details >>'/>
                   </Link>
                   </div>

                   <div className="col-lg my-2">
                   <Link to="/sector_heads_list">
                   <Card
                    image=''
                        header='Sector Heads'
                        description='Details >>'/>
                   </Link>
                   </div>



                   <div className="col-lg my-2" >
                   <Link to="/teamapprove">
                   <Card 
                    image=''
                        header='Members Validation'
                        
                        description='Details >>'/>
                   </Link>
                   </div>


                   <div className="col-lg my-2">
                 <Link to="/messages">
                   <Card
                    image=''
                        header='Messages'
                        description='Details >>'/>
                   </Link>
                   </div>


                   <div className="col-lg my-2">
                   <Link to="/aboutusview">
                   <Card 
                   image=''
                        header='About Us'
                        description='Details >>'/>
                   </Link>
                   </div>

                   <div className="col-lg my-2">
                    <Link to="/blogview">
                   <Card
                   image=''
                        header='Blogs'
                        description='Details >>'/>
                   </Link>
                    </div>

                   <div className="col-lg my-2">
                    <Link to="/financesecuritypass">
                   <Card
                   image=''
                        header='Finance'
                        description='Details >>'/>
                   </Link>
                    </div>
              

                 

                    <div className="col-lg my-2" >
                    <Link to="/eventsview">
                   <Card 
                   image=''
                        header='Events (Online/Offline)'
                        description='Details >>'/>
                   </Link>
                    </div>

                    <div className="col-lg my-2">
                   <Link to="/regeventmembers">
                   <Card
                     image=''
                        header='Event Registration'
                        description='Details >>'/>
                   </Link>
                   </div>


                   <div className="col-lg my-2">
                   <Link to="/eventfeedbacks">
                   <Card
                     image=''
                        header='Event Feedbacks'
                        description='Details >>'/>
                   </Link>
                   </div>

                    
                   <div className="col-lg my-2">
                   <Link to="/tshirtsreg">
                   <Card
                   image=''
                        header='T-shirts'
                        description='Details >>'/>
                   </Link>
                    </div>


                    <div className="col-lg my-2" >
                    <Link to="/form_controls">
                   <Card
                   image=''
                        header='Form Controls'
                        description='Details >>'/>
                   </Link>
                    </div>


                    <div className="col-lg my-2" >
                   <Link to="/users_permission">
                   <Card style={{backgroundColor:'#ffa291'}}
                   image=''
                        header='Users Permission'
                        description='Only for Faculty Coordinator >>'/>
                   </Link>
                    </div>


                  
               
                    <div className="col-lg my-2" >
                 
                 </div>

            

                </div>


                
                    </div>

            </div>
         
        </div>
    </div>
    </>
  );
};

export default Home;
