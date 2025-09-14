import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import {  deleteDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import GoToTop from '../../GoToTop'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function RegEvent() {

  const [photo, setPhoto] = useState({});
     const [photos, setPhotos] = useState([]);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
      
          const unsub = onSnapshot(db.collection("EventFeedbacks").orderBy("regno", "desc"), (snapshot) => {
               let list = [];
               snapshot.docs.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
               });
               setPhotos(list);
               setLoading(false)

          },
          
          (error)=>{
               console.error(error);
          });
return() =>{
     unsub();
}
     }, []);



const handleDelete = async (id) =>{
  if(window.confirm('Are you sure you want to delete?')){
    try{
      setOpen(false);
      await deleteDoc(doc(db, "EventFeedbacks", id));
      setPhotos(photos.filter((photo) => photo.id !== id));
    }catch(err)
    {
      console.log(err);
    }
  }
}



  return (
    <>  
  <GoToTop />
        <div className="container" style={{ maxWidth: "200vh", marginTop: "15vh" }}>

        
          <div className="section-title">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
            BOHAGI UTSAV FEEDBACKS
            </h2>
          </div>

          <div className="container-fluid">
          <div className="text-right" style={{ marginTop: "-30px" }}>
          <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-success"
                    table="table-to-xls"
                    filename="Feedbacks"
                    sheet="Feedbacks"
                    buttonText="Export to Excel"
                    />

                  
           
            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>
   
         
  
<br></br>

         <Table responsive striped bordered hover size="sm" id="table-to-xls">
         <thead>
           <tr>
           <th style={{textAlign: 'center'}}>#</th>
             <th style={{textAlign: 'left'}}>Reg No.</th>
             <th style={{textAlign: 'left'}}>Name</th>

             <th style={{textAlign: 'center'}}>Feedback</th>
             <th style={{textAlign: 'center'}}>Suggestion</th>
             <th style={{textAlign: 'center'}}>Snacks</th>
             <th style={{textAlign: 'center'}}>Overall</th>
             <th style={{textAlign: 'center'}}>Posted On</th>
            
           </tr>
         </thead>
         <tbody>
         {photos && photos.map((item, index) => (
               
               <tr>
                  <td style={{textAlign: 'center'}}>{index + 1}</td>
                 <td style={{textAlign: 'left', textTransform:'uppercase'}}>{item.regno}</td>
                 <td style={{textAlign: 'left',textTransform:'uppercase', fontWeight:'bold',width:'50vh'}}>{item.name}</td>

                 <td style={{textAlign: 'left',color:'grey',width:'60vh'}}>{item.feedback}</td>
                
                 <td style={{textAlign: 'left',color:'grey',width:'60vh'}}>{item.suggestion}</td>
                 <td style={{textAlign: 'center',color:'grey',width:'10vh', fontWeight:'bold'}}>{item.snacks}</td>
                 <td style={{textAlign: 'center',color:'red',width:'10vh', fontWeight:'bold'}}>{item.rating}</td>
                 <td style={{textAlign: 'center',color:'grey',width:'20vh'}}>{item.date} | {item.time}</td>
         
              
          
        
                
               </tr>
           ))}
         </tbody>
       </Table>
         
         
         
         
         
         
         
         
      

             {/* Table */}


<br></br>


        </div>
 
    </>
  )
}

export default RegEvent
