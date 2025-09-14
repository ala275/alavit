import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon,Image,Card } from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import GoToTop from '../../../GoToTop'



import {
  addDoc,
  updateDoc,
  doc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

const initialState = {
  name: "",
  img: "",
  auth:"",
  approval:"",
  pending:"none"


};

const EditBlog = () => {

  const [data, setData] = useState(initialState);
  const { name, img, auth,email, contact, approval, pending,contents} = data;

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef, "blogs");
    if (snapshot.exists()) {
      setData({ ...snapshot.data()});
    }
  };



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Title is required";
    }

    if (!auth) {
      errors.auth = "Author is required";
    }

    if (!img) {
      errors.img = "Image is required";
    }

     if (!approval) {
      errors.approval = "Status is required";
    }


    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...data,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "blogs", id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };
  return (
    <>  <GoToTop />
      <div className="container-fluid" style={{ marginTop: "15vh", maxWidth: '190vh'}}>
        <div>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
              <h2>{id ? "UPDATE" : "ADD"} BLOG</h2>
              <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4">
      
              <Card id="images">
                <Image id="images" className="img-fluid" src={img} alt="" />
              </Card>
              <Form.Input
                  error={errors.img ? { content: errors.img } : null}
                  label="Image link (Copy an image link from anywhere - not from google drive)"
                  name="img"
                  placeholder="Paste image link here"
                  onChange={handleChange}
                  value={img}
                />

                <Form.Input
                  error={errors.name ? { content: errors.name } : null}
                  label="Title"
                  name="name"
                  placeholder="Title"
                  onChange={handleChange}
                  value={name}
                />

                <Form.Input
                  error={errors.auth ? { content: errors.auth } : null}
                  label="Author"
                  name="auth"
                  readOnly
                  placeholder="Author"
                  onChange={handleChange}
                  value={auth}
                />


       
          <div className="row ">
          <div className="col-lg-8 my-2">
          <Form.Input label="Email" name="email" readonly 
                  value={email}
                />
          </div>
          <div className="col-lg-4 my-2">
          <Form.Input label="Contact" name="contact" readonly 
                  value={contact}
                />
          </div></div>

                </div>

                <div className="col-lg-8 my-2"> 
                <label>Content:</label>
                <div style={{padding:'10px', border:'1px solid #cfd1d0', borderRadius:'5px'}} dangerouslySetInnerHTML={{ __html: `${contents}` }}></div>
      


<div className="row my-4">
  <div className="col"><Form.Field  label="Status" style={{marginTop:'-1px', height:'4.8vh'}} name="pending" control='select' value={pending} 
                       onChange={handleChange}    error={errors.pending ? { content: errors.pending } : null}>
                          <option selected disabled value=' '>--Select--</option>
                     
                           <option value='visible'>Reject</option>
                           <option value=' none '>Approve</option>
      </Form.Field></div>

      
  <div className="col">    <Form.Field  label="Confirm Status" style={{marginTop:'-1px', height:'4.8vh'}} name="approval" control='select' value={approval} 
                       onChange={handleChange}    error={errors.approval ? { content: errors.approval } : null}>
                          <option selected disabled  value='none '>--Select--</option>
                          <option value='none'>Reject</option>
                           <option value='visible'>Approve</option>
                         
      </Form.Field></div>
</div>



  




             <div className="text-right">

                 <Button 
                  color="green" icon labelPosition='left' size='small' 
                  type="submit"
                
                >
                   <Icon name='check'/> Update
                </Button>

                </div>
               
              
              </div>


              </div>
              </Form>


              
            </>
          )}
        </div>
      </div>

      <br></br><br></br><br></br>
    </>
  );
};

export default EditBlog;
