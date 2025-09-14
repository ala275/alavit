import React, { useState, useEffect } from "react";
import { Button,Icon} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import {  deleteDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import GoToTop from '../../../GoToTop'
import ModalComp from "./ModalComp";

function Tshirts() {

  const [photo, setPhoto] = useState({});
     const [photos, setPhotos] = useState([]);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
      
          const unsub = onSnapshot(db.collection("Team").orderBy("regno"), (snapshot) => {
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
      await deleteDoc(doc(db, "Team", id));
      setPhotos(photos.filter((photo) => photo.id !== id));
    }catch(err)
    {
      console.log(err);
    }
  }
}

const handleModal = (item) => {
  setOpen(true);
  setPhoto(item);
};

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
             TEAM MEMBERS VALIDATIONS
            </h2>
          </div>


  
<br></br>
       

         <Table responsive striped bordered hover size="sm">
         <thead>
           <tr>
           <th style={{textAlign: 'center'}}>#</th>
             <th style={{textAlign: 'left'}}>Reg No.</th>
             <th style={{textAlign: 'left'}}>Name</th>
             <th style={{textAlign: 'center'}}>Status</th>

             <th style={{textAlign: 'center'}}>Action</th>
            
           </tr>
         </thead>
         <tbody>
         {photos && photos.map((item, index) => (
               
               <tr>
                  <td style={{textAlign: 'center'}}>{index + 1}</td>
                 <td style={{textAlign: 'left', textTransform:'uppercase'}}>{item.regno}</td>
                 <td style={{textAlign: 'left',textTransform:'uppercase'}}>{item.name}</td>
                 <td style={{textAlign: 'center', fontWeight:'bold', width:'20vh'}}>
                 <div style={{display:`${item.status}`, backgroundColor:'green',color:'white',}} class="ui label">
                    <i class="check"></i> {item.status}
                  </div>
                  </td> 
                 <td style={{textAlign: 'center', width:'15vh'}}>
           
                 
                 <Button color="blue" style={{marginTop:'2px'}} size='small'  onClick={() => handleModal(item)}>
                   <i class="fa fa-eye" aria-hidden="true"></i>
                  </Button>
                  {open && (
                          <ModalComp
                            open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...photo}
                          />
                        )}
 
 {/* <Button color="grey" style={{marginTop:'2px'}} size='small' onClick={() => navigate(`/editteam/${item.id}`)}>
                   <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </Button> */}


                  <Button color="red" style={{marginTop:'2px'}} size='small'  onClick={() => handleDelete(item.id)}>
                   <i class="fa fa-trash" aria-hidden="true"></i>
         </Button> 
                 
                 </td>
                
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

export default Tshirts
