import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/Footer.css";
import { db } from "../firebase";
import { Button, Icon } from "semantic-ui-react";

function Footer() {
  const [subject, setSubject] = useState("");
  const [loader, setLoader] = useState(false);

  const [status, setStatus] = useState(undefined);

  function refreshPage() {
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Suggestions")
      .add({
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

    setSubject("");
  };

  return (
    <>
      <div className="mt-5">
        <div className="card">
          <div className="row mb-4 ">
            <div className="col-md-6 col-sm-11 col-xs-11 my-3">
              <div className="footer-text pull-left">
                <div className="d-flex">
                  <h4 style={{ color: "white", fontWeight: "700" }}>
                    Enajori - Assamese Literary Association
                  </h4>
                </div>
                <p style={{ marginTop: "7px" }}>
                  VIT VELLORE, TAMIL NADU<br></br>
                  <br></br>
                  <strong>Phone:</strong>
                  <a href="tel: 6001426729"> +91-6001426729</a> <br></br>
                  <strong>Email: </strong>
                  <a style={{ fontWeight: "normal" }} href="ala@vit.ac.in">
                    {" "}
                    ala@vit.ac.in
                  </a>{" "}
                  <br></br>
                </p>
                <div className="social mt-2 mb-3 ">
                  <i
                    className="fa fa-instagram fa-lg"
                    href="https://instagram.com/enajori_vit?igshid=YmMyMTA2M2Y="
                  ></i>
                  <i
                    className="fa fa-facebook-official fa-lg"
                    href="https://www.facebook.com/profile.php?id=100089903246257&mibextid=ZbWKwL"
                  ></i>
                  <i
                    className="fa fa-twitter fa-lg"
                    href="https://twitter.com/enajori_vit?t=1kg3t03GVSFiUCHYXZAqYA&s=09"
                  ></i>
                  <i
                    className="fa fa-linkedin-square fa-lg"
                    href="https://www.linkedin.com/in/enajori-the-assamese-literary-association-81bb39265"
                  ></i>
                </div>
              </div>
            </div>

            <div className="col-md-2 col-sm-4 col-xs-4 my-3"></div>

            <div className="col col-sm-4 col-xs-4 my-3">
              <form onSubmit={handleSubmit}>
                <label for="subject">Suggestions</label>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  placeholder="Write something..."
                  style={{
                    height: "90px",
                    backgroundColor: "#16151a",
                    color: "white",
                  }}
                  required
                ></textarea>

                <div
                  className="container"
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    marginTop: "-10px",
                  }}
                >
                  {status?.type === "success" && (
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Success!</strong> Suggestion sent.
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

                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  style={{
                    background: loader ? "grey" : "orange",
                    fontWeight: "500",
                    color: "white",
                    marginTop: "-8px",
                  }}
                  type="submit"
                  primary
                >
                  <Icon name="send" /> Send
                </Button>
              </form>
            </div>
          </div>

          <div className="divider mb-4"></div>

          <div className="row" style={{ fontSize: "10px" }}>
            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="pull-left">
                <p>
                  <i className="fa fa-copyright"></i> 2023 enajori_vit
                </p>
                <a
                  href="https://wedigtech.netlify.app/"
                  target="_blank"
                  style={{ color: "white" }}
                >
                  <span style={{ color: "grey" }}>Developed by:</span> weDig
                  <span style={{ color: "#ffab04" }}>Tech</span>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="pull-right mr-4 d-flex policy">
                <div>Terms of Use</div>
                <div>Copyright Policy</div>
                <div>
                  <Link to="/privacypolicy">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
