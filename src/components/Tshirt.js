import React, { useState,useEffect } from "react";
import { Button, Form, Icon} from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../GoToTop'



import {
  addDoc,
  updateDoc,
  doc,
  collection,
 

} from "firebase/firestore";

const initialState = {
  name: "",

  regno:"",
  email:"",
  contact:"",
  time:"",
  size:"",
  status:"-"



};

const Tshirt = () => {
  
  function refreshPage() {
    window.location.reload(false);
  }


  const [data, setData] = useState(initialState);
  const {name,regno,email,contact,size,time,date,status} = data;
 

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  data.time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;




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

    if (!size) {
      errors.size = "Size is required";
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
   
    navigate("/tshirtpayment");
    refreshPage()
  };


  

  const [statuss, setStatus] = useState([]);


  const ref = db.collection("FormsControl").orderBy('no').startAt('3').endAt('3')

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

<div style={{height:'8vh'}}></div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Size Chart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/website-e921e.appspot.com/o/sizechart.jpeg?alt=media&token=a63cc8ac-c046-4a1d-912b-94454241d73c" alt="" />
           
      </div>
      <div class="modal-footer">
        <Button type="button" size="small" data-bs-dismiss="modal">Close</Button>

      </div>
    </div>
  </div>
</div>






      <div
        className="container-fluid"
        id="partb"
        style={{ marginTop: "4vh", maxWidth: "200vh" }}
      >
        <div className="content">
          <div className="row">
            <div className="col-lg-6" style={{ marginTop: "2vh" }}>
              <img style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/website-e921e.appspot.com/o/tshirt.JPG?alt=media&token=b3ab0d2b-00ed-4755-83c1-58465b649b34" alt="" />
            </div>

            <div
              className="col-lg-6"
              style={{
                marginTop: "2vh",
                backgroundColor: "#f5f4f2",
                padding: "15px 0 10px 0",
              }}
            >
              <div class="container-fluid" >
                <div class="row">
               
                 
                        <h3>T-shirt Registration</h3>
                        <p>Fill in the data below.</p>
                        <hr></hr>
                        {isSubmit ? (
           <div class="ui active inverted dimmer">
           <div class="ui text loader">Please wait...</div>
         </div>
          ) : (
            <>
                        <Form onSubmit={handleSubmit}>
                       
                          <div class="col-md-12 ">
                           <div className="row"> 
                            <div className="col-lg my-2">
                            <Form.Input
                              error={errors.name ? { content: errors.name } : null}
                              label="Name"
                              name="name"
                              placeholder="Name"
                              onChange={handleChange}
                              value={name}
                            />
                            </div>

                            <div className="col-lg my-2">
                            <Form.Input
                            error={errors.regno ? { content: errors.regno } : null}
                            label="Registration No."
                            name="regno"
                           
                            placeholder="Registration No."
                            onChange={handleChange}
                            value={regno}
                          />
                            </div>
                            </div>


                          </div>


                          <div class="col-md-12 my-2">
                          <Form.Input
                          error={errors.email ? { content: errors.email } : null}
                            label="Email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={email}
                          />
                          </div>

                          <div class="col-md-12 my-2">
                          <Form.Input
                          error={errors.contact ? { content: errors.contact } : null}
                            label="Contact"
                            name="contact"
                            type="tel"
                            maxLength="11"
                            placeholder="Contact"
                            onChange={handleChange}
                            value={contact}
                          />
                          </div>

                          <div class="col-md-12 my-2">

                            <div className="row">
                              <div className="col-6">  <Form.Field  label="Size" 
                              style={{marginTop:'-1px', height:'4.8vh'}} 
                              name="size" control='select' 
                              value={size} 
                              onChange={handleChange}    
                              error={errors.size ? { content: errors.size } : null}>
                                        <option >--Select--</option>
                                      
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XXL'>XXL</option>
                              
                                      
                         
                          </Form.Field></div>
                              <div className="col-2">
                                <Button type="button" style={{marginTop:'22px', minWidth:'15vh'}} size='small' data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Size chart
                            </Button>
                            </div>
                            </div>
                        
                          </div>


                          <Form.Input name="date" readOnly hidden
                  value={date}
                />

                <Form.Input name="time" readOnly hidden
                  value={time}
                />

<Form.Input name="status" readOnly hidden
                  value={status}
                />

                     

                          <div class="text-right">
                     {statuss.map((data) => (
                          <Button  disabled={data.statuss} type="button"  color="orange" icon labelPosition='left' size='small' ><Icon name='check'/>Submit</Button>    ))}
                {/* <Button type="button" color="orange"  size='small' data-bs-toggle="modal" data-bs-target="#exampleModal1">Submit</Button> */}
              
                             {/* <h5 style={{fontWeight:'500', color:'red', textAlign: 'center'}}>Registration closed</h5> */}
                          </div>

                          <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style={{color:'green', fontWeight:'bold'}} id="exampleModalLabel"><i class="fa fa-check-circle" aria-hidden="true"></i> Confirmation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
     Are you sure you want to submit the details?
      </div>
      <div class="modal-footer">
        <Button type="button" size='small' data-bs-dismiss="modal">Cancel</Button>
        <Button color="green" size='small' type="submit">
                 Confirm <i class="fa fa-angle-double-right" aria-hidden="true"></i>
      </Button>
      </div>
    </div>
  </div>
</div>


                        </Form>   </> )}
                   
             
                </div>
              </div>

     <br></br>
              {/* <div class="container-fluid" style={{borderTop:'10px solid white', height:'15vh', padding:'20px 0 15px 15px'}}>
                <div class="row">
               
                <div className="text-center">
                        <h4 style={{color: 'red'}}>Complete your pending payment now</h4>
              
                 <Link to="/tshirtpayment">
                        <Button type="button" style={{marginTop:'10px', minWidth:'15vh'}} color="yellow" size='small' >
                              Redirect <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                  </Button></Link>
                       
                  </div>
                   
             
                </div>
              </div> */}
       
            
            </div>




         




          </div>
        </div>
      </div>




    </>
  );
};

export default Tshirt;