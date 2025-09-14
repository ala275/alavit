import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from "../firebase";
import GoToTop from '../GoToTop'
import {
    doc,
    getDoc,
  } from "firebase/firestore";
  const initialState = {
    name: "",
    info: "",
    info2: "",
    info3: "",
    type:""

  };

function EventDetails() {
    const [data, setData] = useState(initialState);
    const { name, info,info2, info3, type, img, date } = data;
    const { id } = useParams();

    useEffect(() => {
      id && getSingleBoard();
    }, [id]);
  
    const getSingleBoard = async () => {
      const docRef = doc(db, "Events", id);
      const snapshot = await getDoc(docRef, "Events");
      if (snapshot.exists()) {
        setData({ ...snapshot.data() });
      }
    };


  return (
    <>
      
      

      <GoToTop />
      <section style={{marginTop: '10vh', minHeight:'60vh'}}>

   
<div className="content" style={{position: 'relative'}}>
  <img src={img} alt=" " id="blogimagecover" style={{width: '100%', objectFit:'cover'}}/>
  <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.538)',position: 'absolute',top: '0',left: '0',width: '100%',height: '100%'}}></div>

  <div className="centered" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    <h2 style={{fontWeight:'800', color: 'white', textAlign:'center'}}>{name}</h2>
  </div>
</div>


<div className='blog-wrap'>

  <div className="container-fluid my-5" style={{maxWidth: '190vh'}}>
<div className="content">
 <div className="row" >
    
 </div>
 <div className="row">
     <div className="col-md-8">
         <div className="blog-view">
             <article className="blog blog-single-post">
                
                 <div className="blog-info clearfix">
                     <div className="post-left">
                         <ul>
                             <li><p><i style={{color:'orange'}} className="fa fa-calendar"></i> <span>{date}</span></p></li>
                             <li><p style={{color:'white', backgroundColor:'orange', padding:'2px 6px 2px 6px', borderRadius:'5px'}}> <span>{type}</span></p></li>
                         </ul>
                     </div>
                    
                 </div>
                 <div className="blog-image">
                    
                 </div>
                 <div className="blog-content" style={{border:'1px solid #ededed', padding:'15px'}}>
                 <div className="blog-desc" style={{textAlign: 'justify'}}>
                  <p>{info}</p>

                  <div className="row">
                    <div className="col-lg my-2"> <img className="img-fluid" alt=" " id="images" src={data.img1}/></div>
                    <div className="col-lg my-2"><img className="img-fluid" alt=" " id="images" src={data.img2}/></div>
                  </div>
                 
                  <p>{info2}</p>
                  
                  <p>{info3}</p>
                 </div>
    
                 </div>
             </article>




            
         </div>
     </div>
     <aside className="col-md-4 my-4">
         
         <img className="img-fluid" alt=" " style={{width:'100%', height:'35vh',objectFit:'cover'}} src={data.img}/>
       
     </aside>
 </div>
</div>

</div>



</div>
</section>
    </>
  )
}

export default EventDetails
