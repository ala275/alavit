import React, { useState, useEffect } from "react";
import { Button, Form,Loader, Icon } from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../../../GoToTop'
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";


const initialState = {
  name: "",
  regno: "",
  dept:"",
  date:"",
  time:"",
  approval:"",
  

};

const EditSectorHeads = () => {
  const [data, setData] = useState(initialState);
  const { name,regno,dept, approval,date, time, users} = data;
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
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "SectorHeads", id);
    const snapshot = await getDoc(docRef, "SectorHeads");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }

    if (!regno) {
      errors.regno = "Regno. is required";
    }

    if (!dept) {
      errors.dept = "Department. is required";
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
        await addDoc(collection(db, "SectorHeads"), {
          ...data,

    
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "SectorHeads", id), {
          ...data,
      
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
  
           <h2>UPDATE DETAILS</h2><hr></hr>
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
                  readOnly
                  placeholder="Name"
                  onChange={handleChange}
                  value={name}
                />



                <Form.Input
                  error={errors.regno ? { content: errors.regno } : null}
                  label="Reg no."
                  name="regno"
              readOnly
                  placeholder="Registration number"
                  onChange={handleChange}
                  value={regno}
                />

<Form.Field  label="Department" style={{height:'4.8vh'}} name="dept" control='select' value={dept} 
                       onChange={handleChange}    error={errors.dept ? { content: errors.dept } : null}>
                          <option value=' '>--Select--</option>
                          <option value='Editorial Department'>Editorial Department</option>
                           <option value='Events Department'>Events Department</option>
                           <option value='Design Department'>Design Department</option>
                           <option value='Publicity Department'>Publicity Department</option>
                           <option value='Management Department'>Management Department</option>
                         
                 </Form.Field>


          




                 <Form.Field  label="Status" style={{height:'4.8vh'}} name="approval" control='select' value={approval} 
                       onChange={handleChange} >
                          <option value=' '>--Select--</option>
                          <option value='Approved'>Approve</option>
                           <option value='Rejected'>Reject</option>
                          
                         
                 </Form.Field>






          

                     <Form.Input name="dtime" readOnly hidden
                  value={time}
                />
                    <Form.Input name="ddate" readOnly hidden
                  value={date}
                />

<Form.Input name="users" readOnly hidden
                  value={users}
                />

<br></br>


             


                <Button style={{float:'right'}}
                color="green"
                  type="submit"  icon labelPosition='left' size='small' 
                  disabled={progress !== null && progress < 100}
                >
                   <Icon name='save'/> Save
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

export default EditSectorHeads;
