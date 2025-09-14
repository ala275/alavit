import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon} from "semantic-ui-react";
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
  getDoc,
} from "firebase/firestore";

import { useUserAuth } from "../context/UserAuthContext";


const initialState = {
  name:"",
  time:"",
  date:"",


};

const Addmom = () => {


    

  const [data, setData] = useState(initialState);
  const {name,ddate,time,date,type,users} = data;
  const [contents, setPa] = useState(null);
  // const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useUserAuth();
  data.users = user.email;


  const today = new Date();
  data.time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "moms", id);
    const snapshot = await getDoc(docRef, "moms");
    if (snapshot.exists()) {
      setData({   ...data,contents });
    }
  };


  const handleChange = (e) => {
    setData({   ...data,contents, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};


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
        await addDoc(collection(db, "moms"), {
          ...data,contents

         
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "moms", id), {
       ...data,contents

        
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };
  return (
    <>  <GoToTop />
      <div className="container-fluid" style={{ marginTop: "15vh", maxWidth: '190vh', minHeight:'85vh'}}>
        <div>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
              <h2>MINUTES OF MEETING</h2><hr></hr>
              <Form onSubmit={handleSubmit}>
          
              <Form.Input
                 
                 label="Agenda"
                 name="name"
                 placeholder="Name"
                 onChange={handleChange}
                 value={name}
               />

<div className="row">
  <div className="col-lg">
    <Form.Input name="ddate" onChange={handleChange} label="Date" type="date"
                  value={ddate}/>
    </div>
  <div className="col-lg">
  <Form.Field  label="Meeting Type" style={{marginTop:'-1px', height:'4.8vh'}} name="type" control='select' value={type} 
                       onChange={handleChange}    error={errors.visibilty ? { content: errors.visibilty } : null}>
                          <option value='None '>--Select--</option>
                          <option value='Board Meeting'>Board Meeting</option>
                           <option value='General Meeting'>General Meeting</option>
                         
      </Form.Field>
  </div>
</div>
          
             

                <Form.Input name="date" readOnly hidden
                  value={date}
                />

                <Form.Input name="time" readOnly hidden
                  value={time}
                />

<Form.Input name="users" readOnly hidden
                  value={users}
                />
               
                <ReactQuill theme="snow"  label="Content" style={{height: '50vh'}} name="contents" error={errors.contents ? { content: errors.contents } : null} value={contents}  onChange={setPa} />
         
             <br></br>  <br></br> <br></br> <br></br>
             
<Button
                  color="green" icon labelPosition='left' size='small' 
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                   <Icon name='upload'/> Post
                </Button>
           


                
              
          


         
              </Form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Addmom;
