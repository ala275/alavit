import React, { useState, useEffect } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import ModalComp from "./ModalComp";

import GoToTop from "../../../GoToTop";

function Events() {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //  const ref = db.collection("gallery").orderBy("date", "desc");

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Events").orderBy("date", "desc"),
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


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(db, "Events", id));
        setEvents(events.filter((photo) => photo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleModal = (item) => {
    setOpen(true);
    setEvent(item);
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
            EVENTS (ONLINE/OFFLINE)
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
              onClick={() => navigate(`/addevent`)}
            >
              <Icon name="photo" /> Add Image
            </Button>
            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="container-fluid">

        <div className="row" style={{marginTop:'25px'}}>
{events.map((data) => (
<div class="col-lg-3" style={{display:`${data.approval}`}}>
<div class="ui card" style={{width:'100%'}}>
  <div class="image">
    <img class="img-fluid" alt=" " style={{width:'100%', height:'25vh',objectFit:'cover'}} src={data.img}/>
  </div>
  <div class="content">
    <a class="header" style={{textTransform:'uppercase', fontWeight:'bold', color:'orange'}}>{data.name}</a>
    <div class="meta" style={{marginTop:'5px'}}>
      <span class="date" style={{fontSize:'11px'}}><i style={{color: 'grey'}}>Event Date:</i> <b style={{color: 'black'}}>{data.date}</b></span>
    </div>
    <div class="blogItem-desc" style={{textAlign: 'justify', height:'60px', overflow: 'hidden', fontSize:'13px'}} dangerouslySetInnerHTML={{ __html: ` ${data.info}` }}></div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      {data.users}
    </a>
  </div>

  <div class="extra content">
  <Button
                          color="green"
                          icon
                          labelPosition="left"
                          size="small"
                          onClick={() => handleModal(data)}
                        >
                          <Icon name="eye" /> View
                        </Button>
                        {open && (
                          <ModalComp
                            open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...event}
                          />
                        )}



<Button
                          color="grey"
                          icon
                          labelPosition="left"
                          size="small"
                          onClick={() => navigate(`/editevents/${data.id}`)}
                        >
                          <Icon name="pencil" /> Update
                        </Button>
  </div>
</div>
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

export default Events;
