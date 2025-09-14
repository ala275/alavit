import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import GoToTop from '../GoToTop'
import ModalComp from "./ModalComp";
import { Card, Image} from 'semantic-ui-react'

function Gallery() {
  // const [open, setOpen] = React.useState(false)
  const [photo, setPhoto] = useState({});

  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const ref = db.collection("gallery").orderBy("date", "desc");

  //REALTIME GET FUNCTION
  function getPhotos() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPhotos(items);
    });
  }

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, []);

  const handleModal = (item) => {
    setOpen(true);
    setPhoto(item);
  };

  return (
    <>
         <GoToTop />
     
         <section
        id="gallery"
        style={{
         
          minHeight:'75vh',padding: '30px 0 30px 0',marginTop: "15vh",marginBottom: "5vh"
        }}
      >
        <div className="container-fluid" style={{ maxWidth: "200vh" }}>
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

          <div className="row" style={{marginTop:'25px'}}>


          {photos.map((data) => (
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 m-b-20"  style={{ marginBottom: "20px" }}
                  id="imggg" key={data.id}>
  
              {/* <Card id="images">
                <Image id="images" className="img-fluid" src={data.img} alt="" />
                
              </Card> */}
              
              <div class="ui one cards">
  <div class="card"  onClick={() => handleModal(data)}>
    <div class="image"  >
    <Card id="images">
                <Image id="images" className="img-fluid" src={data.img} alt="" />
                
              </Card>
    </div>
    <div class="extra">
    <p style={{fontSize:'13px'}}><strong>{data.name}</strong><br></br><span style={{fontSize:'10px'}}>Posted on: <b>{data.date} | {data.time}</b></span></p>
    </div>
  </div>
  {open && (
                          <ModalComp
                            open={open}
                            setOpen={setOpen}
                           
                            {...photo}
                          />
                        )}
  </div>     
                   
                  
                  </div>
                ))}


          </div>
        </div>
      </section>
       
    </>
  )
}

export default Gallery
