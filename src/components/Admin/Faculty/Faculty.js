import React, { useState, useEffect } from "react";
import { Button, Icon, Table} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";

import GoToTop from '../../../GoToTop'

function Faculty() {
     const [photos, setPhotos] = useState([]);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
         
            const unsub = onSnapshot(db.collection("faculty").orderBy("position"), (snapshot) => {
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

// const handleModal = (item) => {
//   setOpen(true);
//   setPhoto(item);
// };

const handleDelete = async (id) =>{
  if(window.confirm('Are you sure you want to delete?')){
    try{
      setOpen(false);
      await deleteDoc(doc(db, "faculty", id));
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

        
          <div className="section-title" data-aos="fade-left">
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
            <div className="text-right" style={{marginTop: '-30px'}}>
            <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'  onClick={() => navigate(`/addfaculty`)}
          >
            <Icon name='user' /> Add Advisor
          </Button>
          {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div></div>

<br></br><br></br>

          {/* Table */}
          {photos && photos.map((item) => (
          <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell />
       
        <Table.HeaderCell >Image</Table.HeaderCell>
   
        <Table.HeaderCell style={{width:'35vh',textTransform:'uppercase'}}>Name</Table.HeaderCell>
        <Table.HeaderCell style={{width:'50vh'}}>Designation</Table.HeaderCell>
        <Table.HeaderCell>School</Table.HeaderCell>
        <Table.HeaderCell style={{width:'35vh'}}></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
      <Table.Cell collapsing>
      
      </Table.Cell>
      <Table.Cell id="picteam"> <p>
              <img className="img-fluid" id="picteam" src={item.img} alt="" />
            </p></Table.Cell>
             
        <Table.Cell><h4>{item.name}</h4> </Table.Cell>
        <Table.Cell><p style={{fontSize:"12px"}}>{item.designation}</p></Table.Cell>
        <Table.Cell><p style={{fontSize:"12px"}}>{item.school}</p></Table.Cell>
     
        <Table.Cell style={{ textAlign: 'center'}}> 
        
        
        <Button color="red" icon labelPosition='left' size='small' onClick={() => handleDelete(item.id)}>
             <Icon name='trash' /> Delete</Button>


             <Button color="grey" icon labelPosition='left' size='small'  onClick={() => navigate(`/editfaculty/${item.id}`)}>
             <Icon name='pencil' /> Update</Button>
             
           
             </Table.Cell>
      </Table.Row>
    </Table.Body>

  
  </Table>  ))}

             {/* Table */}


<br></br>


        </div>
 
    </>
  )
}

export default Faculty
