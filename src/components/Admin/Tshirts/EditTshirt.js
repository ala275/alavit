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
  email:"",
  contact:"",
  size:"",
  ddate:"",
  dtime:"",
  

};

const EditTshirt = () => {
  const [data, setData] = useState(initialState);
  const { name,regno, email, contact, size, status, ddate, dtime, users} = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useUserAuth();
  data.users = user.email;

  const today = new Date();
  data.dtime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.ddate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "Tshirts", id);
    const snapshot = await getDoc(docRef, "photo");
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

    if (!email) {
      errors.email = "Email is required";
    }

    if (!contact) {
      errors.name = "Contact is required";
    }
    if (!size) {
      errors.size = "Size is required";
    }
    if (!status) {
      errors.status = "Contact is required";
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
        await addDoc(collection(db, "Tshirts"), {
          ...data,

    
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "Tshirts", id), {
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
  
           <h2>{id ? "UPDATE" : "ADD"} DETAILS</h2><hr></hr>
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
                  readOnly
                  placeholder="Registration number"
                  onChange={handleChange}
                  value={regno}
                />

<Form.Input
                  error={errors.email ? { content: errors.email } : null}
                  label="Email"
                  name="email"
                  readOnly
                  placeholder="Email id"
                  onChange={handleChange}
                  value={email}
                />

                <Form.Input
                  error={errors.contact ? { content: errors.contact } : null}
                  label="Contact"
                  name="contact"
                  readOnly
                  placeholder="Contact no."
                  onChange={handleChange}
                  value={contact}
                />

                      <Form.Field  label="T-shirt size" style={{marginTop:'-1px', height:'4.8vh'}} 
                      name="size" control='select' 
                      value={size} 
                       onChange={handleChange}    
                       error={errors.size ? { content: errors.size } : null}>
                              <option >--Select--</option>
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XL'>XL</option>
                                        <option value='XXL'>XXL</option>
                         
                     </Form.Field>


                     <Form.Field  label="Status" style={{marginTop:'-1px', height:'4.8vh',}} 
                      name="status" control='select' 
                      value={status} 
                       onChange={handleChange}    
                       error={errors.status ? { content: errors.status } : null}>
                              <option >--Select--</option>
                                        <option value='Pending' style={{color:'red'}}>Pending</option>
                                        <option value='Paid' style={{color:'orange'}}>Paid</option>
                                        <option value='Delivered' style={{color:'green'}}>Delivered</option>
                                       
                         
                     </Form.Field>

                     <Form.Input name="dtime" readOnly hidden
                  value={dtime}
                />
                    <Form.Input name="ddate" readOnly hidden
                  value={ddate}
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
                   <Icon name='check'/> Save
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

export default EditTshirt;
