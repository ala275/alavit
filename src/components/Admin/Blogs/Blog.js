import React, { useState, useEffect } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

import GoToTop from '../../../GoToTop'

function Blog() {
     const [blogs, setBlogs] = useState([]);
     const [blog, setBlog] = useState({});
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
    
     useEffect(() => {

      const unsub = onSnapshot(db.collection("blogs").orderBy("date", "desc"), (snapshot) => {
        
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
  setBlog(item);
};

const handleDelete = async (id) =>{
  if(window.confirm('Are you sure you want to delete?')){
    try{
      setOpen(false);
      await deleteDoc(doc(db, "blogs", id));
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
        <div className="container" style={{ maxWidth: "200vh", marginTop: "10vh" }}>

        
          <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              BLOGS
            </h2>
          </div>

   

<br></br><br></br>

<div className="container-fluid my-2">


<div class="ui link cards">
{blogs && blogs.map((item) => (

  <div class="card" style={{display: `${item.approval}`}}>
    <div class="image">
      <img style={{width:'100%', height:'20vh',objectFit:'cover'}}  src={item.img}/>
    </div>
    <div class="content">
      <div class="header" style={{textTransform:'uppercase'}}>{item.name}</div>
    
      {/* <div class="description">
      <div contentEditable='true' dangerouslySetInnerHTML={{ __html: `${item.pa}` }}></div>
      </div>  */}
    </div>
    <div class="extra content">
  
      <span>
        <i class="user icon"></i>
        {item.auth}<br></br><br></br>
        <i class="fa fa-calendar" aria-hidden="true"></i> <span style={{fontSize: '12px'}}>
       {item.date} 
      <span class="right floated" style={{fontSize: '12px'}}>
      <i class="time icon"></i>
      {item.time} 

      </span>
  
      </span>
      </span>
    </div>
    <div class="extra content text-center">
    <Button color="red" icon labelPosition='left' size='small' onClick={() => handleDelete(item.id)}>
         <Icon name='trash' /> Delete</Button>
         
    <Button color="green" icon labelPosition='left' size='small'  onClick={() => navigate(`/editblog/${item.id}`)}>
          <Icon name='eye' /> View</Button>

       

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

export default Blog
