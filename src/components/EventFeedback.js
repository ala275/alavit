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
  feedback:"",
  suggestion:"",
  time:"",
  rating:"",
  snacks:"",
  status:"none "



};

const EventFeedback = () => {
  
  function refreshPage() {
    window.location.reload(false);
  }


  const [data, setData] = useState(initialState);
  const {name,regno,feedback,suggestion,snacks,rating,time,date,status} = data;
 

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



    if (!feedback) {
      errors.feedback = "Feedback is required";
    }


    if (!suggestion) {
      errors.suggestion = "Suggestion is required";
    }

    if (!snacks) {
      errors.snacks = "Snacks rating is required";
    }
    if (!rating) {
      errors.rating = "Overall rating is required";
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
        await addDoc(collection(db, "EventFeedbacks"), {
          ...data,

        
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "EventFeedbacks", id), {
          ...data,

         
        });
      } catch (error) {
        console.log(error);
      }
    }
   
    navigate("/submit_success");
    refreshPage()
  };


  

  const [statuss, setStatus] = useState([]);


  const ref = db.collection("FormsControl").orderBy('no').startAt('5').endAt('5')

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



      <div
        className="container-fluid"
        id="partb"
        style={{ marginTop: "4vh", maxWidth: "200vh" }}
      >
        <div className="content">
          <div className="row">
            <div className="col-lg-6" style={{ marginTop: "2vh" }}>
              <img style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/website-e921e.appspot.com/o/gallery%2Fevent1a.jpeg?alt=media&token=68aa80d4-b24b-4cb2-9ca4-d1d260ec20db" alt="" />
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
               
                 
                        <h2 style={{fontWeight: 'bold', color:'orange'}}>ব’হাগী উৎসৱ  | Bohagi Utsav</h2><br></br><br></br>
                        <p style={{fontSize:"15px"}}><i style={{color: 'grey'}}></i>Feedback Form</p>
                       

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
                          <Form.TextArea
                          error={errors.feedback ? { content: errors.feedback } : null}
                            label="Feedback"
                            name="feedback"
                            placeholder="Feedback on today's event"
                            onChange={handleChange}
                            value={feedback}
                          />
                          </div>

                          <div class="col-md-12 my-2">
                          <Form.TextArea
                          error={errors.suggestion ? { content: errors.suggestion } : null}
                            label="Suggestion"
                            name="suggestion"
                          
                            placeholder="Suggestion for the upcoming events"
                            onChange={handleChange}
                            value={suggestion}
                          />
                          </div>




                          <div class="col-md-12 ">
                           <div className="row"> 
                            <div className="col-lg my-2">
                            <Form.Field  label="Rate the tea(snacks)" 
                              style={{marginTop:'-1px', height:'4.8vh'}} 
                              name="snacks" control='select' 
                              value={snacks} 
                              onChange={handleChange}    
                              error={errors.snacks ? { content: errors.snacks } : null}>
                                        <option disabled>--Select--</option>
                                      
                                        <option value='10'>10</option>
                                        <option value='9'>9</option>
                                        <option value='8'>8</option>
                                        <option value='7'>7</option>
                                        <option value='6'>6</option>
                                        <option value='5'>5</option>
                                        <option value='4'>4</option>
                                        <option value='3'>3</option>
                                        <option value='2'>2</option>
                                        <option value='1'>1</option>
                                      
                         
                          </Form.Field>
                            </div>

                            <div className="col-lg my-2">
                            <Form.Field  label="Overall event rating" 
                              style={{marginTop:'-1px', height:'4.8vh'}} 
                              name="rating" control='select' 
                              value={rating} 
                              onChange={handleChange}    
                              error={errors.rating ? { content: errors.rating } : null}>
                                        <option disabled>--Select--</option>
                                        <option value='10'>10</option>
                                        <option value='9'>9</option>
                                        <option value='8'>8</option>
                                        <option value='7'>7</option>
                                        <option value='6'>6</option>
                                        <option value='5'>5</option>
                                        <option value='4'>4</option>
                                        <option value='3'>3</option>
                                        <option value='2'>2</option>
                                        <option value='1'>1</option>
                                   
                                       
                                     
                                       
                                      
                                    
                                    
                                     
                                      
                                      
                         
                          </Form.Field>
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
                          <Button  disabled={data.statuss} type="submit" color="orange" icon labelPosition='left' size='small' ><Icon name='check'/>Submit</Button>    ))}
                {/* <Button type="button" color="orange"  size='small' data-bs-toggle="modal" data-bs-target="#exampleModal1">Submit</Button> */}
              
                             {/* <h5 style={{fontWeight:'500', color:'red', textAlign: 'center'}}>Registration closed</h5> */}
                          </div>

                          <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

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

export default EventFeedback;