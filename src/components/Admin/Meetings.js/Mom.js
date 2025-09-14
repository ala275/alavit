import React, { useState, useEffect } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import ModalComp from "./ModalComp";
import GoToTop from '../../../GoToTop'

function Mom() {
     const [blogs, setBlogs] = useState([]);
     const [mom, setMom] = useState({});
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
    
     useEffect(() => {
          const unsub = onSnapshot(collection(db, "moms"), (snapshot) => {
               let list = [];
               snapshot.docs.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
               });
               setBlogs(list);
               setLoading(false)

          },
          
          (error)=>{
               console.error(error);
          });
return() =>{
     unsub();
}
     }, []);

const handleModal = (item) => {
  setOpen(true);
  setMom(item);
};

const handleDelete = async (id) =>{
  if(window.confirm('Are you sure you want to delete?')){
    try{
      setOpen(false);
      await deleteDoc(doc(db, "moms", id));
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }catch(err)
    {
      console.log(err);
    }
  }
}


// const date = new Date(1676870686 * 1000);
  return (
    <>  
  <GoToTop />
        <div className="container" style={{ maxWidth: "190vh", marginTop: "17vh" }}>

        
        <div className="section-title" data-aos="fade-left">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            MINUTES OF MEETING
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
              onClick={() => navigate(`/addmom`)}
            >
              <Icon name="plus" /> Add MOM
            </Button>     {open && (
                          <ModalComp
                            open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...mom}
                          />
                        )}
            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>

   

        <br></br>
        <br></br>

<div className="container-fluid my-2">


<div className="ui link cards">
{blogs && blogs.map((item) => (

  <div className="card" >

    <div className="content">
      <div className="header" style={{color:'#20891F'}}>{item.name}</div>

  
        <div className="row">
          <div className="col">
          <p style={{marginTop:'5px', fontSize:'12px', backgroundColor:'#bad5ff', padding:'5px', width:'100%', borderRadius:'5px'}}><i class="fa fa-calendar" aria-hidden="true"></i>  {item.ddate}
      </p>
          </div>
          <div className="col">
          <p style={{marginTop:'5px', fontSize:'12px', backgroundColor:'#CCEECA', padding:'5px', width:'100%', borderRadius:'5px'}}>{item.type}
      </p>
          </div>
        </div>

     
      {/* <div class="description">
      <div contentEditable='true' dangerouslySetInnerHTML={{ __html: `${item.pa}` }}></div>
      </div>  */}


    </div>
    <div className="extra content">
  
      <span>
    
        <i className="fa fa-calendar" aria-hidden="true"></i> <span style={{fontSize: '12px'}}>
       {item.date} 
      <span className="right floated" style={{fontSize: '12px'}}>
      <i className="time icon"></i>
      {item.time} 

      </span>
  
      </span><br></br>

      <i className="user icon"></i>
        <span style={{fontSize:'10px', color:'red'}}>{item.users}</span><br></br>


      </span>
    </div>
    <div className="extra content text-center">

    <Button color="green"    icon
              labelPosition="left" size='small' onClick={() => handleModal(item)}>
    <Icon name="eye" /> View</Button>

       

    </div>

  </div>

))} 
</div>


</div>



<br></br>


        </div>
 
    </>
  )
}

export default Mom
