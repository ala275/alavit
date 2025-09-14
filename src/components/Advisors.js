import React, { useState, useEffect, Fragment } from "react";
import { db } from "../firebase";
import GoToTop from "../GoToTop";
import "../App.css";
import { Card} from 'semantic-ui-react'
function Advisors() {
  const [admins, setAdmins] = useState([]);


  const ref = db.collection("faculty").orderBy("order");

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
          style={{ marginTop: "10vh", maxWidth: "190vh" }}
        >
          <section id="team" className="team">
            <div className="section-title">
            <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            ADVISORS
          </h2>
            </div>
            <div className="container-fluid">
              <div className="row">
              
                {admins.map((data) => (


                  <div className="col-lg-2 my-4" key={data.id}>

<Card style={{textAlign:'center', width: '100%'}}>

  <img className="img-fluid" id="picteam" src={data.img} alt="" />

  <a class="ui orange right ribbon label" style={{marginTop:'-26px',marginLeft:'-14px',  maxWidth:'20vh', display:`${data.position}`}}>Faculty Coordinator</a>

  

<Card.Content>
  <Card.Header style={{textTransform:'uppercase',marginBottom:'8px',fontSize:'15px'}}>{data.name}</Card.Header>
  <Card.Meta>
    <span style={{fontSize:'12px'}} className='position'>{data.designation}<br></br>({data.school})</span>
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

export default Advisors;
