import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "../App.css";
import image from "./assets/image/image1.png";
import enajori from "./assets/image/enajori.svg";
import { Link } from "react-router-dom";
import ImageViewer from "./ImageViewer";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import GoToTop from "../GoToTop";
import { Button, Icon, Card, Image } from "semantic-ui-react";
import Team from "./Team";
import { useNavigate } from "react-router-dom";

function Home() {
  const [photo, setPhoto] = useState({});
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [aboutus, setAboutUs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  function getAboutUs() {
    db.collection("about").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAboutUs(items);
    });
  }

  useEffect(() => {
    getAboutUs();
    // eslint-disable-next-line
  }, []);

  const ref = db.collection("gallery");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(list);
        setLoading(false);
      },

      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Events").orderBy("date", "desc").limit(4),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setEvents(list);
        setLoading(false);
      },

      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <GoToTop />
      <section id="cover">
        <div className="container-fluid" style={{ maxWidth: "190vh" }}>
          <div className="row">
            <div className="col-lg-6 order-2 order-lg-1">
              <img className="img-fluid" id="coverimage" src={image} alt="" />
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <img src={enajori} className="img-fluid" id="covertext" alt="" />
              <div style={{ marginLeft: "40px" }}>
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  THE ASSAMESE <br></br>LITERARY ASSOCIATION
                </h1>
                <p style={{ color: "white" }}>
                  VELLORE INSTITUTE OF TECHNOLOGY, VELLORE
                </p>

                {/* <h5 style={{color: '#FFBB0C'}}>Write the slogan here....</h5> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "140px" }}></div>

      <section id="about" className="about">
        <div className="container-fluid" style={{ maxWidth: "195vh" }}>
          <div className="row">
            <div className="col-lg-2" style={{ width: "2vh" }}></div>

            <div
              className="col-lg-10 pt-4 pt-lg-0 content"
              id="con"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2
                style={{
                  fontWeight: "bold",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                WHO WE ARE
              </h2>

              {aboutus.map((data) => (
                <>
                  <p style={{ textAlign: "justify", fontSize: "14px" }}>
                    {data.pa}
                  </p>
                  <p style={{ textAlign: "justify", fontSize: "14px" }}>
                    {data.pb}
                  </p>
                  <p style={{ textAlign: "justify", fontSize: "14px" }}>
                    {data.pc}
                  </p>
                </>
              ))}

              <br></br>
              <Link to="/about">
                <Button icon labelPosition="left" size="small" color="orange">
                  <Icon name="info" /> Know more{" "}
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "100px" }}></div>

      <section
        id="gallery"
        style={{
          background: "linear-gradient(90deg, #000000 0%, #242424 100%)",
          padding: "30px 0 30px 0",
        }}
      >
        <div className="container-fluid" style={{ maxWidth: "190vh" }}>
          <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                color: "white",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              GALLERY
            </h2>
          </div>

          <div className="row" style={{ marginTop: "25px" }}>
            {photos &&
              photos.map((item) => (
                <div
                  className="col-xl-3 col-lg-3 col-md-6 col-sm-6 m-b-20"
                  style={{ marginBottom: "20px", display: `${item.visibilty}` }}
                  id="imggg"
                  key={item.id}
                >
                  <Card id="images">
                    <Image
                      id="images"
                      className="img-fluid"
                      src={item.img}
                      alt=""
                    />
                  </Card>

                  {open && (
                    <ImageViewer open={open} setOpen={setOpen} {...photo} />
                  )}
                </div>
              ))}

            <div className="container-fluid">
              <br></br>
              <div className="text-right">
                <Link to="/gallery">
                  <Button icon labelPosition="left" size="small" color="orange">
                    <Icon name="picture" /> See more{" "}
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "110px" }}></div>

      <section id="about" className="about">
        <div className="container-fluid" style={{ maxWidth: "190vh" }}>
          <div className="row">
            <div
              className="col-lg-4 order-1 order-lg-2"
              style={{ float: "right" }}
            >
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/fQ3qjjF7UTM"
                title="AWESOME ASSAM: NEW PROMOTIONAL VIDEO"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>

            <div
              className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content"
              id="con"
            >
              <h2
                style={{
                  fontWeight: "bold",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                AWESOME ASSAM
              </h2>
              <p style={{ textAlign: "justify", fontSize: "14px" }}>
                Assam is a state in India with abundant natural and cultural
                resources that can create a thriving tourism industry, providing
                employment and generating income in both urban and rural areas.
                However, factors such as insurgency issues, remoteness,
                perceived insecurity, and negative publicity have hindered
                tourism growth. To overcome these challenges, Assam needs to be
                aggressively marketed to refurbish its image and increase its
                visibility in the national and international markets, utilizing
                the latest technological interventions. With its exotic
                wildlife, breathtaking scenic beauty, vibrant fairs and
                festivals, historic monuments, tea gardens, golf courses, the
                mighty Brahmaputra river and its tributaries, tranquil
                countryside, and friendly locals, Assam has the potential to
                become one of the most sought-after destinations in the country.{" "}
              </p>

              <br></br>
              <Link to="/aboutassam">
                <Button icon labelPosition="left" size="small" color="orange">
                  <Icon name="info" /> Know more{" "}
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "110px" }}></div>

      <section
        id="gallery"
        style={{
          background: "linear-gradient(90deg, #000000 0%, #242424 100%)",
          padding: "30px 0 30px 0",
        }}
      >
        <div className="container-fluid" style={{ maxWidth: "190vh" }}>
          <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                color: "white",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              EVENTS
            </h2>
          </div>

          <div className="row" style={{ marginTop: "25px" }}>
            {events.map((data) => (
              <div class="col-lg-3" style={{ display: `${data.approval}` }}>
                <div class="ui card" style={{ width: "100%" }}>
                  <div class="image">
                    <img
                      class="img-fluid"
                      alt=" "
                      style={{
                        width: "100%",
                        height: "25vh",
                        objectFit: "cover",
                      }}
                      src={data.img}
                    />
                  </div>
                  <div class="content">
                    <a
                      class="header"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        color: "orange",
                      }}
                    >
                      {data.name}
                    </a>
                    <hr></hr>

                    <div
                      class="blogItem-desc"
                      style={{
                        textAlign: "justify",
                        height: "60px",
                        overflow: "hidden",
                        fontSize: "13px",
                      }}
                      dangerouslySetInnerHTML={{ __html: ` ${data.info}` }}
                    ></div>

                    <Link
                      style={{ marginTop: "10px", color: "orange" }}
                      to={`/events/${data.id}`}
                      class="read-more"
                    >
                      Know more{" "}
                      <i
                        class="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                  <div class="extra content" style={{ marginTop: "-20px" }}>
                    <a>
                      <i class="calendar icon"></i>
                      {data.date}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container-fluid">
            <br></br>
            <div className="text-right">
              <Link to="/ala_events">
                <Button icon labelPosition="left" size="small" color="orange">
                  <Icon name="picture" /> See more{" "}
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Team />
    </>
  );
}

export default Home;
