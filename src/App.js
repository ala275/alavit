import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Team from "./components/Team";
import About from "./components/About";
import Gallery from "./components/Gallery";
import ALAEvents from "./components/ALAEvents";
import Blogs from "./components/Blogs";
import ViewBlog from "./components/ViewBlog";
import SubmitBlog from "./components/SubmitBlog";
import AboutAssam from "./components/Assam";
import Advisors from "./components/Advisors";
import Success from "./components/Submission";
import EventReg from "./components/EventReg";

import Anthem from "./components/Assam/Anthem";
import Symbols from "./components/Assam/Symbols";
import History from "./components/Assam/History";
import Culture from "./components/Assam/Culture";
import Parks from "./components/Assam/Parks";

import Admin from "./components/Admin/components/Home";
import Login from "./components/Admin/components/Login";
import Signup from "./components/Admin/components/Signup";
import ProtectedRoute from "./components/Admin/components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/Admin/context/UserAuthContext";
import Header from "./components/Admin/Header";
import Header2 from "./components/Admin/Header2";

import Editgallery from "./components/Admin/Gallery/EditGallery";
import AGallery from "./components/Admin/Gallery/Gallery";

import Editboard from "./components/Admin/Board/EditBoard";
import ABoard from "./components/Admin/Board/Board";

import EditFaculty from "./components/Admin/Faculty/EditFaculty";
import Facultyview from "./components/Admin/Faculty/Faculty";

import Editaboutus from "./components/Admin/AboutUs/EditAboutUs";
import AAboutUs from "./components/Admin/AboutUs/AboutUs";

import Editblog from "./components/Admin/Blogs/EditBlog";
import Eblog from "./components/Admin/Blogs/Blog";
import PBlogs from "./components/Admin/Blogs/PendingBlogs";
import AddBlog from "./components/Admin/Blogs/AddBlog";

import Addmom from "./components/Admin/Meetings.js/Addmom";
import Mom from "./components/Admin/Meetings.js/Mom";

import Message from "./components/Admin/Message";
import Finance from "./components/Admin/Finance";
import FinanceList from "./components/Admin/FinanceList";
import Tshirt from "./components/Tshirt";
import Tshirtsuccess from "./components/SuccessPages/Tshirtsuccess";
import Attendance from "./components/Attendance";

import Tshirts from "./components/Admin/Tshirts/Tshirts";
import EditTshirt from "./components/Admin/Tshirts/EditTshirt";
import Users from "./components/Admin/Users/Users";
import UserList from "./components/Admin/Users/UserList";

import TeamAdE from "./components/Admin/Team/EditTeam";
import ApproveTeam from "./components/Admin/Team/ApproveTeam";
import TeamAd from "./components/Admin/Team/Team";

import AssamVideos from "./components/Assam/AssamVideos";
import Departments from "./components/Departments";
import Dept from "./components/Admin/Departments/Dept";
import EditDept from "./components/Admin/Departments/EditDept";

import DeptSelect from "./components/SuccessPages/DeptSelect";

import Atten from "./components/Admin/Attendance/Attendance";
import SectorHeads from "./components/Admin/SectorHeads/SectorHeads";
import EditSectorHeads from "./components/Admin/SectorHeads/EditSectorHeads";
import SectorHeadReg from "./components/SectorHeadReg";
import FormControls from "./components/Admin/FormControls/FormControls";

import TeamVerification from "./components/Admin/MembersValidation/TeamVerification";
import RegEvent from "./components/Admin/EventReg/RegEvent";
import EventFeedback from "./components/EventFeedback";
import StatusMembers from "./components/Admin/EventReg/StatusMembers";
import EventFeedbacks from "./components/Admin/EventFeedbacks";
import EditEvents from "./components/Admin/Events/EditEvents";
import Events from "./components/Admin/Events/Events";
import EventDetails from "./components/EventDetails";
function App() {
  const [financeId, setFinanceId] = useState("");
  const getFinanceIdHandler = (id) => {
    setFinanceId(id);
  };

  const [userId, setUserId] = useState("");
  const getUserIdHandler = (id) => {
    setUserId(id);
  };

  return (
    <div className="enajori">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <Navbar />
              <Home />
              <Advisors />
              <Footer />
            </>
          }
        />
        <Route
          path="/team"
          element={
            <>
              {" "}
              <Navbar />
              <Team />
              <Footer />
            </>
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              {" "}
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              {" "}
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              {" "}
              <Navbar />
              <Gallery />
              <Footer />
            </>
          }
        />
        <Route
          path="/ala_events"
          element={
            <>
              {" "}
              <Navbar />
              <ALAEvents />
              <Footer />
            </>
          }
        />
        <Route
          path="/events/:id"
          element={
            <>
              {" "}
              <Navbar />
              <EventDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              {" "}
              <Navbar />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <>
              {" "}
              <Navbar />
              <ViewBlog />
              <Footer />
            </>
          }
        />

        <Route
          path="/aboutassam"
          element={
            <>
              <Navbar />
              <AboutAssam />
              <Footer />
            </>
          }
        />
        <Route
          path="/submitblog"
          element={
            <>
              <Navbar />
              <SubmitBlog />
              <Footer />
            </>
          }
        />
        <Route
          path="/success"
          element={
            <>
              <Navbar />
              <Success />
              <Footer />
            </>
          }
        />
        <Route
          path="/tshirtpayment"
          element={
            <>
              <Navbar />
              <Tshirtsuccess />
              <Footer />
            </>
          }
        />

        <Route
          path="/stateanthem"
          element={
            <>
              <Navbar />
              <Anthem />
              <Footer />
            </>
          }
        />
        <Route
          path="/statesymbols"
          element={
            <>
              <Navbar />
              <Symbols />
              <Footer />
            </>
          }
        />
        <Route
          path="/assamhistory"
          element={
            <>
              <Navbar />
              <History />
              <Footer />
            </>
          }
        />
        <Route
          path="/assamparks"
          element={
            <>
              <Navbar />
              <Parks />
              <Footer />
            </>
          }
        />
        <Route
          path="/assamculture"
          element={
            <>
              <Navbar />
              <Culture />
              <Footer />
            </>
          }
        />
        <Route
          path="/assamvideogallery"
          element={
            <>
              <Navbar />
              <AssamVideos />
              <Footer />
            </>
          }
        />
        <Route
          path="/tshirt_reg"
          element={
            <>
              <Navbar />
              <Tshirt />
              <Footer />
            </>
          }
        />
        <Route
          path="/sector_head_reg"
          element={
            <>
              <Navbar />
              <SectorHeadReg />
              <Footer />
            </>
          }
        />
        <Route
          path="/select_dept"
          element={
            <>
              <Navbar />
              <Departments />
              <Footer />
            </>
          }
        />
        <Route
          path="/submit_success"
          element={
            <>
              <Navbar />
              <DeptSelect />
              <Footer />
            </>
          }
        />
        <Route
          path="/mem_attendance"
          element={
            <>
              <Navbar />
              <Attendance />
              <Footer />
            </>
          }
        />

        <Route
          path="/eventReg"
          element={
            <>
              <Navbar />
              <EventReg />
              <Footer />
            </>
          }
        />
        <Route
          path="/event_feedbacks"
          element={
            <>
              <Navbar />
              <EventFeedback />
              <Footer />
            </>
          }
        />
      </Routes>

      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <Header />
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/galleryview"
            element={
              <ProtectedRoute>
                <Header />
                <AGallery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addgallery"
            element={
              <ProtectedRoute>
                <Header />
                <Editgallery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editgallery/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Editgallery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/eventsview"
            element={
              <ProtectedRoute>
                <Header />
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addevent"
            element={
              <ProtectedRoute>
                <Header />
                <EditEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editevents/:id"
            element={
              <ProtectedRoute>
                <Header />
                <EditEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/form_controls"
            element={
              <ProtectedRoute>
                <Header />
                <FormControls />
              </ProtectedRoute>
            }
          />

          <Route
            path="/facultyview"
            element={
              <ProtectedRoute>
                <Header />
                <Facultyview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addfaculty"
            element={
              <ProtectedRoute>
                <Header />
                <EditFaculty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editfaculty/:id"
            element={
              <ProtectedRoute>
                <Header />
                <EditFaculty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Header />
                <Atten />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mom"
            element={
              <ProtectedRoute>
                <Header />
                <Mom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addmom"
            element={
              <ProtectedRoute>
                <Header />
                <Addmom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/members_dept"
            element={
              <ProtectedRoute>
                <Header />
                <Dept />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editdept/:id"
            element={
              <ProtectedRoute>
                <Header />
                <EditDept />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sector_heads_list"
            element={
              <ProtectedRoute>
                <Header />
                <SectorHeads />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editsector_head/:id"
            element={
              <ProtectedRoute>
                <Header />
                <EditSectorHeads />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teammembers"
            element={
              <ProtectedRoute>
                <Header />
                <TeamAd />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addteam"
            element={
              <ProtectedRoute>
                <Header />
                <TeamAdE />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editteam/:id"
            element={
              <ProtectedRoute>
                <Header />
                <ApproveTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teamapprove"
            element={
              <ProtectedRoute>
                <Header />
                <TeamVerification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/eventfeedbacks"
            element={
              <ProtectedRoute>
                <Header />
                <EventFeedbacks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/regeventmembers"
            element={
              <ProtectedRoute>
                <Header />
                <RegEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/eventmemsreg/:id"
            element={
              <ProtectedRoute>
                <Header />
                <StatusMembers />
              </ProtectedRoute>
            }
          />

          {/* <Route
                path="/addteam"
                element={
                  <ProtectedRoute>
                    <Header/><TeamAdE/>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/editteam/:id"
                element={
                  <ProtectedRoute>
                    <Header/><ApproveTeam/>
                  </ProtectedRoute>
                }
              /> */}

          <Route
            path="/boardview"
            element={
              <ProtectedRoute>
                <Header />
                <ABoard />
                <br></br>
                <br></br>
              </ProtectedRoute>
            }
          />

          <Route
            path="/editboard/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Editboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/aboutusview"
            element={
              <ProtectedRoute>
                <Header />
                <AAboutUs />
                <br></br>
                <br></br>
              </ProtectedRoute>
            }
          />

          <Route
            path="/editaboutus/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Editaboutus />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Header />
                <Message />
              </ProtectedRoute>
            }
          />

          <Route
            path="/financesecuritypass"
            element={
              <ProtectedRoute>
                {" "}
                <Header />
                <p
                  style={{
                    marginTop: "14vh",
                    color: "red",
                    padding: "15px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  *This page is only for Faculty coordinator, Chairperson and
                  Finance Head
                </p>
                <div className="row">
                  <div className="col-lg-8">
                    <FinanceList getFinanceId={getFinanceIdHandler} />
                  </div>
                  <div className="col-lg-4">
                    <Finance id={financeId} setFinanceId={setFinanceId} />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users_permission"
            element={
              <ProtectedRoute>
                {" "}
                <Header />
                <p
                  style={{
                    marginTop: "14vh",
                    color: "red",
                    padding: "15px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  *This page is only for Faculty coordinator
                </p>
                <div className="row">
                  <div className="col-lg-8">
                    <UserList getUserId={getUserIdHandler} />
                  </div>
                  <div className="col-lg-4">
                    <Users id={userId} setUserId={setUserId} />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/blogview"
            element={
              <ProtectedRoute>
                <Header />
                <PBlogs />
                <Eblog />
                <br></br>
                <br></br>
              </ProtectedRoute>
            }
          />

          <Route
            path="/addblog"
            element={
              <ProtectedRoute>
                <Header />
                <AddBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editblog/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Editblog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tshirtsreg"
            element={
              <ProtectedRoute>
                <Header />
                <Tshirts />
                <br></br>
                <br></br>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edittshirts/:id"
            element={
              <ProtectedRoute>
                <Header />
                <EditTshirt />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
