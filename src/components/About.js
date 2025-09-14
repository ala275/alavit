import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import GoToTop from '../GoToTop'


function About() {

  const [aboutus, setAboutUs] = useState([]);
  
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
  return (

    <>
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
              <h1>About Us</h1>
            <h2>
                Enajori- The Assamese Literary Association
              </h2> 
            </div>
          </div>
        </div>
      </section>


      <div className="container-fluid" style={{ marginTop: "-55px", maxWidth:'170vh'}}>

       <div className="row">
     


       <div
              className="col-lg"
              id="con"
              style={{
                border: "1px solid #dbdbdb",
                backgroundColor: "white",
                height: "100%",
                padding: "15px",
              }}
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
               
               <><p style={{ textAlign: "justify", fontSize: "14px" }}>{data.pa}</p>
               <p style={{ textAlign: "justify", fontSize: "14px" }}>{data.pb}</p>
               <p style={{ textAlign: "justify", fontSize: "14px" }}>{data.pc}</p></>
                   
                ))}
             

        
            </div>
            

     
        </div> 
      </div>
       




  
  </>
  )
}

export default About
