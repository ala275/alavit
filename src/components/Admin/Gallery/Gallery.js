import React, { useState, useEffect } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import ModalComp from "./ModalComp";

import GoToTop from "../../../GoToTop";

function Gallery() {
  const [photo, setPhoto] = useState({});
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //  const ref = db.collection("gallery").orderBy("date", "desc");

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("gallery").orderBy("date", "desc"),
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


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(db, "gallery", id));
        setPhotos(photos.filter((photo) => photo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleModal = (item) => {
    setOpen(true);
    setPhoto(item);
  };

  return (
    <>
      <GoToTop />
      <div
        className="container"
        style={{ maxWidth: "200vh", marginTop: "15vh" }}
      >
        <div className="section-title" data-aos="fade-left">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            GALLERY
          </h2>
        </div>

        <div className="container-fluid">
          <div className="text-right" style={{ marginTop: "-30px" }}>
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={() => navigate(`/addgallery`)}
            >
              <Icon name="photo" /> Add Image
            </Button>
            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="container-fluid">
          <div className="row">
            {/* Table */}
            {photos &&
              photos.map((item) => (
                <div className="col-lg-3 my-4" key={item.id}>
                  <Card style={{ textAlign: "center", width: "100%" }}>
                    <img
                      id="images"
                      className="img-fluid"
                      style={{
                        width: "55vh",
                        height: "33vh",
                        objectFit: "cover",
                      }}
                      src={item.img}
                      alt=""
                    />
                    <Card.Content>
                      <Card.Header style={{ marginBottom: "8px" }}>
                        {item.name}
                      </Card.Header>
                      <Card.Meta>
                        <span className="position" style={{fontSize: "12px" }}>Posted on: <span style={{fontSize: "14px",fontWeight:"bold"}}> {item.date} | {item.time}</span></span>
                      </Card.Meta>
                      <Card.Description>
                        <Button
                          color="green"
                          icon
                          labelPosition="left"
                          size="small"
                          onClick={() => handleModal(item)}
                        >
                          <Icon name="eye" /> View
                        </Button>
                        {open && (
                          <ModalComp
                            open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...photo}
                          />
                        )}

                        <Button
                          color="grey"
                          icon
                          labelPosition="left"
                          size="small"
                          onClick={() => navigate(`/editgallery/${item.id}`)}
                        >
                          <Icon name="pencil" /> Update
                        </Button>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </div>

        
              ))}
          </div>
        </div>

        {/* Table */}

        <br></br>
      </div>
    </>
  );
}

export default Gallery;
