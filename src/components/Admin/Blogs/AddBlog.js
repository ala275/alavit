import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon, Card, Image} from "semantic-ui-react";
import { db } from "../../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../../../GoToTop'
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
  auth:"",
  img:"",
  time:"",
  approval:"none",
  pending:""

};

const AddBlog = () => {


    

  const [data, setData] = useState(initialState);
  const { name,img,auth, time,date,approval } = data;
  const [contents, setPa] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  data.time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;;

  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef, "blogs");
    if (snapshot.exists()) {
      setData({ name,img,auth,contents,time,date,approval, });
    }
  };


  const handleChange = (e) => {
    setData({ name,img,auth,contents,time,date,approval, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Title is required";
    }

    if (!auth) {
      errors.auth = "Author is required";
    }

    if (!contents) {
      errors.contents = "Content is required";
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
          name,img,auth,contents,time,date,approval,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "blogs", id), {
          name,img,auth,contents,time,date,approval,

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
              <h2>SUBMIT BLOG</h2><hr></hr>
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
           
                  placeholder="Author"
                  onChange={handleChange}
                  value={auth}
                />


                <Form.Input name="date" readonly hidden
                  value={date}
                />

                 <Form.Input name="time" readonly hidden
                  value={time}
                />

<Form.Input name="approval" hidden
                  value={approval}
                />

                </div>

                <div className="col-lg-8 my-2"> 
  
                <ReactQuill theme="snow"  label="Content" style={{height: '30vh'}} name="contents" error={errors.contents ? { content: errors.contents } : null} value={contents}  onChange={setPa} />



  



<br></br><br></br><br></br><br></br>
             

                 <Button
                  color="orange" icon labelPosition='left' size='small' 
                  type="submit"
                
                >
                   <Icon name='upload'/> Submit
                </Button>

             
               
              
              </div>


              </div>
           
         
              </Form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBlog;
