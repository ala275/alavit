import React, { useState } from "react";
import { db } from "../firebase";
import GoToTop from "../GoToTop";
import "./assets/css/Contact.css";
import { Button, Icon } from 'semantic-ui-react'

function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [loader, setLoader] = useState(false);

  const [status, setStatus] = useState(undefined);

  function refreshPage() {
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("ContactUs")
      .add({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        subject: subject,
      })
      .then(() => {
        setLoader(false);
        setStatus({ type: "success" });
      })
      .catch((error) => {
        setLoader(false);
        setStatus({ type: "error", error });
      });

    setFname("");
    setLname("");
    setEmail("");
    setPhone("");
    setSubject("");
  };

  return (
    <>
      {" "}
      <GoToTop />
      <section
        id="contactus"
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "10vh" }}
      >
        <div className="container" style={{ marginBottom: "30px" }}>
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="col-xl-12 col-lg-8">
              <h1>Contact Us</h1>
              <h2>
                Want to get in touch? We'd love to hear from you. Here's how you
                can reach us.
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Contact User Support</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <label for="fname">First Name</label>
                    <input
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      name="firstname"
                      placeholder="Your first name.."
                      required
                    />
                  </div>

                  <div className="col">
                    <label for="lname">Last Name</label>
                    <input
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      type="text"
                      name="lastname"
                      placeholder="Your last name.."
                      required
                    />
                  </div>
                </div>

                <label for="email">E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Your email id.."
                  required
                />

                <label for="contact">Contact no.</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  name="contact"
                  placeholder="Your contact no.."
                  required
                />

                <label for="subject">Message</label>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  placeholder="Write something.."
                  style={{ height: "100px" }}
                  required
                ></textarea>

                <div
                  className="container"
                  style={{ textAlign: "center", fontWeight: "500" }}
                >
                  {status?.type === "success" && (
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Success!</strong> Message sent.
                      <button type="button" class="close" onClick={refreshPage}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                  {status?.type === "error" && (
                    <div
                      class="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Failed!</strong> Please try again.
                      <button type="button" class="close" onClick={refreshPage}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                </div>

                <Button icon labelPosition='left' size='small'
                  style={{
                    background: loader ? "grey" : "#2185d0",
                    fontWeight: "500", 
                    color: "white",
                  }}
                  type="submit"
                  primary
                >
                  <Icon name='send'/> Send message
                </Button>

             
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className="container" style={{ marginTop: "-55px" , }}>
        <div className="row">
          <div
            className="col-lg"
            style={{
              border: "1px solid #dbdbdb",
              backgroundColor: "white",
              height: "32vh",
       
              textAlign: "center",
            }}
          >
            <h6 style={{ marginTop: "30px" }}>
              <i
                style={{ fontSize: "48px" }}
                class="fa fa-phone"
                aria-hidden="true"
              ></i>
              <br></br> <br></br>
              <strong>Talk to Technical Team</strong>
            </h6>
            <p style={{ color: "grey" }}>
              Facing any technical issues? Just pick up the phone to chat with a
              member of technical team.
            </p>
            <Button icon labelPosition='left' size='small' 
             color="orange"
              href="tel: 7086952212"
            >
               <Icon name='phone'/> Contact Support
            </Button>
          </div>

          <div
            className="col-lg"
            style={{
              border: "1px solid #dbdbdb",
              backgroundColor: "white",
              height: "32vh",
          
              textAlign: "center",
            }}
          >
            <h6 style={{ marginTop: "30px" }}>
              <i
                style={{ fontSize: "48px" }}
                class="fa fa-comments"
                aria-hidden="true"
              ></i>
              <br></br> <br></br>
              <strong>Contact User Support</strong>
            </h6>
            <p style={{ color: "grey" }}>
              Sometimes you need a little help from your friends or ALA-VIT support.
              Don't worry.....we're here for you.
            </p>
            <Button icon labelPosition='left' size='small' 
             color="orange"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
               <Icon name='comments'/> Contact Support
            </Button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
