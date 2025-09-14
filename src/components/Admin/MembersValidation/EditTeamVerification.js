import React, { useState, useEffect } from "react";
import { Button, Form,Loader, Icon } from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../../../GoToTop'

import {
  addDoc,
  upadateDoc,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";

const initialState = {
  name: "",
  regno: "",
  status:"",

  

};

const ApproveTeam = () => {
  const [data, setData] = useState(initialState);
  const { name,regno,status} = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "Team", id);
    const snapshot = await getDoc(docRef, "Team");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const valiadate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }

    if (!regno) {
      errors.regno = "Regno. is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = valiadate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "Team"), {
          ...data, 

    
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await upadateDoc(doc(db, "Team", id), {
          ...data, id
      
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };

  return (
    <>  <GoToTop />
    
      <div className="container" style={{ marginTop: "15vh", maxWidth: '120vh' }}>
      <div className="card" style={{backgroundColor:'white'}}>
  
           <h2>EDIT DETAILS</h2><hr></hr>
          <div className="row">
    

        <div className="col-lg my-2">
     
     
        {isSubmit ? (
                   <Loader active inline="centered" size="huge" />
          ) : (  <>  
              <Form onSubmit={handleSubmit}>
              <Form.Input
                  error={errors.ename ? { content: errors.name } : null}
                  label="Name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={name}
                />



                <Form.Input
                  error={errors.regno ? { content: errors.regno } : null}
                  label="Reg no."
                  name="regno"
              
                  placeholder="Registration number"
                  onChange={handleChange}
                  value={regno}
                />


<Form.Field  label="Status" style={{ height:'4.8vh'}} name="status" control='select' value={status} 
                       onChange={handleChange}  >
                       <option value="">--Select--</option>
                          <option value='Approved'>Approve</option>
                        
                         
      </Form.Field>

                  



<br></br>


<Button style={{float:'right'}}
                color="green"
                  type="submit"  icon labelPosition='left' size='small' 
             
                >
                   <Icon name='check'/> Approve
                </Button>         




           
              </Form>
              </>
          
          )}
         </div>

         
      
        </div>   
      </div> </div>
    </>
  );
};

export default ApproveTeam;
