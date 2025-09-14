import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import GoToTop from '../GoToTop'
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";


function ALAEvents() {

    const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsub = onSnapshot(db.collection("Events").orderBy("date", "desc").limit(4), (snapshot) => {
       let list = [];
       snapshot.docs.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()})
       });
       setEvents(list);
       setLoading(false)

  },
  
  (error)=>{
       console.error(error);
  });
return() =>{
unsub();
}
}, []);




  return (
    <>
     <GoToTop />
      <section style={{marginTop: '15vh', minHeight:'55vh'}}>
          
          <div className="container-fluid" style={{maxWidth: '195vh'}}>
      <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              EVENTS
            </h2>
          </div>

      

      
    
             
             




{/* Event Card */}
<div className="row" style={{marginTop:'25px'}}>
{events.map((data) => (
<div class="col-lg-3" style={{display:`${data.approval}`}}>
<div class="ui card" style={{width:'100%'}}>
  <div class="image">
    <img class="img-fluid" alt=" " style={{width:'100%', height:'25vh',objectFit:'cover'}} src={data.img}/>
  </div>
  <div class="content">
    <a class="header" style={{textTransform:'uppercase', fontWeight:'bold', color:'orange'}}>{data.name}</a><hr></hr>
  
    <div class="blogItem-desc" style={{textAlign: 'justify', height:'60px', overflow: 'hidden', fontSize:'13px'}} dangerouslySetInnerHTML={{ __html: ` ${data.info}` }}></div>
    <Link style={{marginTop: '10px', color: 'orange'}} to={`/events/${data.id}`} class="read-more">Know more <i class="fa fa-angle-double-right" aria-hidden="true"></i></Link> 
  </div>
  <div class="extra content" style={{marginTop:'-20px'}}>
    <a>
      <i class="calendar icon"></i>
      {data.date}
    </a>
  </div>
</div>
  </div>
   ))}
</div>

</div>

        
               </section>
         
    </>
  )
}

export default ALAEvents
