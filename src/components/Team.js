import React, { useState, useEffect, Fragment } from "react";
import { db } from '../firebase.js';
import GoToTop from "../GoToTop";
import "../App.css";
import { Card } from 'semantic-ui-react'


function Team() {
  const [admins, setAdmins] = useState([]);


  const ref = db.collection("board");

  //REALTIME GET FUNCTION
  function getAdmins() {
 
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAdmins(items);
  
    });
  }

  useEffect(() => {
    getAdmins();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <>
        <GoToTop />
        <div
          className="container-fluid"
          style={{ marginTop: "20vh", maxWidth: "190vh" }}
        >
          <section id="team" className="team">
            <div className="section-title">
            <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            BOARD MEMBERS
          </h2>
            </div>
            <div className="container-fluid">
              <div className="row">
              
                {admins.map((data) => (


                  <div className="col-lg-2 my-4" key={data.id}>

<Card style={{textAlign:'center', width: '100%'}}>
<img className="img-fluid" id="picteam" src={data.img} alt="" />
<Card.Content>
  <Card.Header style={{textTransform:'uppercase',marginBottom:'8px', fontSize:'15px'}}>{data.name}</Card.Header>
  <Card.Meta>
    <span className='position' style={{fontSize:'13px'}}>{data.position}</span>
  </Card.Meta>
  {/* <Card.Description>
    Matthew is a musician living in Nashville.
  </Card.Description> */}
</Card.Content>

</Card>


                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    </Fragment>
  );
}

export default Team;
