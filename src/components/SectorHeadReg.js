import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon} from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../GoToTop'


import {
  addDoc,
  updateDoc,
  doc,
  collection,

  getDoc,
} from "firebase/firestore";

const initialState = {
  name: "",
  lname:"",
  regno:"",
  email:"",
  contact:"",
  dept:"",
  time:"",
  approval:" ",


};

const SectorHeadReg = () => {


    

  const [data, setData] = useState(initialState);
  const { name,lname,regno,email,contact,dept,time,date,approval } = data;
  // const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  data.time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "SectorHeads",  id);
    const snapshot = await getDoc(docRef, "SectorHeads");
    if (snapshot.exists()) {
      setData({ name,lname,regno,email,contact,dept,time,date,approval, });
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "First name is required";
    }

    if (!lname) {
      errors.lname = "Last name is required";
    }


    if (!regno) {
      errors.regno = "Regno. is required";
    } else if (regno.length !== 9){
      errors.regno = "Registration no. should be 9 characters"
    }

    if (!email) {
      errors.email = "Email is required";
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address'
    }


    if (!contact) {
      errors.contact = "Contact is required";
    }


    if (!dept) {
      errors.dept = "Department is required";
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
         ...data
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "SectorHeads", id), {
          ...data
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/submit_success");
  };



  const [statuss, setStatus] = useState([]);


  const ref = db.collection("FormsControl").orderBy('no').startAt('2').endAt('2')

  //REALTIME GET FUNCTION
  function getAdmins() {
 
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setStatus(items);
  
    });
  }

  useEffect(() => {
    getAdmins();
    // eslint-disable-next-line
  }, []);




  return (
    <>  <GoToTop />
      <div className="container" style={{ marginTop: "17vh", minHeight:'60vh'}}>
        <div>
        <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
             SECTOR HEAD REGISTRATION
            </h2><br></br><br></br>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
      
              <Form onSubmit={handleSubmit}>
          
    
         

<div className="row">
                  <div className="col-lg my-2"> 
                  <Form.Input
                  error={errors.name ? { content: errors.name } : null}
                  label="FirstName"
                  name="name"
                  placeholder="FirstName"
                  onChange={handleChange}
                  value={name}
                />
                 </div>

                  <div className="col-lg my-2"> <Form.Input
                  error={errors.lname ? { content: errors.lname } : null}
                  label="LastName"
                  name="lname"
                  placeholder="LastName"
                  onChange={handleChange}
                  value={lname}
                /> </div>
                </div>



   
                <div className="row">
                  <div className="col-lg my-2"> 
                  <Form.Input
                  error={errors.regno ? { content: errors.regno } : null}
                  label="Registration Number"
                  name="regno"
                  placeholder="Registration Number"
                  onChange={handleChange}
                  value={regno}
                />
                  
                 </div>

                  <div className="col-lg my-2"> 
                  <Form.Input
                  error={errors.email ? { content: errors.email } : null}
                  label="Email"
                  name="email"
                  placeholder="VIT Email"
                  onChange={handleChange}
                  value={email}
                />
                </div>
                </div>




                <div className="row">
                  <div className="col-lg my-2"> 
                  <Form.Input
                  error={errors.contact ? { content: errors.contact } : null}
                  label="Contact"
                  name="contact"
                  placeholder="Contact"
                  onChange={handleChange}
                  value={contact}
                /> 

                  </div>

                  <div className="col-lg my-2"> 
        
                </div>  </div>




                <div className="row">
                  <div className="col-lg my-2"> 
       

                 <Form.Field  label="Department" style={{height:'4.8vh'}} name="dept" control='select' value={dept} 
                       onChange={handleChange}    error={errors.dept ? { content: errors.dept } : null}>
                          <option value=' '>--Select--</option>
                          <option value='Editorial Department'>Editorial Department</option>
                           <option value='Events Department'>Events Department</option>
                           <option value='Design Department'>Design Department</option>
                           <option value='Publicity Department'>Publicity Department</option>
                           <option value='Management Department'>Management Department</option>
                         
                 </Form.Field>
              
                  </div>

                  <div className="col-lg my-2"> 
           
                  </div>
                </div>






                


                <Form.Input name="date" readOnly hidden
                  value={date}
                />

                <Form.Input name="time" readOnly hidden
                  value={time}
                />

                <Form.Input name="approval" hidden
                  value={approval}
                />


  
             <br></br> 

             {statuss.map((data) => (
             
<Button disabled={data.statuss}
                  color="orange" icon labelPosition='left' size='small' 
                  type="submit"
                  
                >
                   <Icon name='check'/> Submit
                </Button>
           

           ))}
                
              
          


         
              </Form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SectorHeadReg;
