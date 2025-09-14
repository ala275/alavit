import React, { useState, useEffect } from "react";
import { Button, Form, Loader,Card, Image, Icon } from "semantic-ui-react";
import { db, storage } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from '../../../GoToTop'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
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
  info: "",
  info2:"",
  info3:"",
  type:"",
  ddate:"",
  dtime:"",
};

const EditEvents = () => {
  const [data, setData] = useState(initialState);
  const {name, info,info2,info3,type, img,img1,img2, date,time, ddate, dtime, users} = data;
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
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
  data.ddate = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;



  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "Events", id);
    const snapshot = await getDoc(docRef, "photo");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, `events/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;

            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);




  useEffect(() => {
    const uploadFile1 = () => {
      const name = new Date().getTime + file1.name;
      const storageRef = ref(storage, `events/${file1.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file1);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;

            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img1: downloadURL }));
          });
        }
      );
    };
    file1 && uploadFile1();
  }, [file1]);




  useEffect(() => {
    const uploadFile2 = () => {
      const name = new Date().getTime + file2.name;
      const storageRef = ref(storage, `events/${file2.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file2);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;

            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img2: downloadURL }));
          });
        }
      );
    };
    file2 && uploadFile2();
  }, [file2]);









  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Event name is required";
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
        await addDoc(collection(db, "Events"), {
          ...data,

   
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "Events", id), {
          name, info, info2, info3, img,img1,img2, type,date, ddate, dtime, users,

       
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };

  return (
    <>  <GoToTop />
      <div className="container-fluid" style={{ marginTop: "15vh", maxWidth: '190vh' }}>
    
           <h2 style={{fontWeight: 'bold'}}>{id ? "UPDATE" : "ADD"} EVENT DETAILS</h2>
          <div className="row">
    

        <div className="col-lg-4 my-2"> 
        <Card id="images">
                <Image id="images" className="img-fluid" src={img} alt="" />
              </Card>
<hr></hr>

              <Form.Input
                  label="Image_1 : "
                  type="file"
                  onChange={(e) => setFile1(e.target.files[0])}
                ></Form.Input> 
                  
                  
                   <Form.Input
                   style={{width: '100%'}}
                   readOnly
                  value={img1}
                />
        <Card id="images">
                <Image id="images" className="img-fluid" src={img1} alt="" />
              </Card>
       


<Form.Input
                  label="Image_2 : "
                  type="file"
                  onChange={(e) => setFile2(e.target.files[0])}
                ></Form.Input>
                   <Form.Input
                   style={{width: '100%'}}
                   readOnly
                  value={img2}
                />
<Card id="images">
                <Image id="images" className="img-fluid" src={img2} alt="" />
              </Card>
        
      
     
        </div>

    
        <div className="col-lg my-2">
     
        {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (  <>
             
              <Form onSubmit={handleSubmit}>

              
              <Form.Input
                  label="Cover image upload"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></Form.Input>
                <small style={{color: 'red'}}>Max. file size: 2 MB</small>
                
                
                
                <Form.Input
                  error={errors.ename ? { content: errors.name } : null}
                  label="Title"
                  name="name"
                  placeholder="Title"
                  maxLength="42"
                  onChange={handleChange}
                  value={name}
                />


<Form.Input
                  error={errors.ename ? { content: errors.name } : null}
                  label="Event Date"
                  name="date"
                  placeholder="Date"
                type="date"
                  onChange={handleChange}
                  value={date}
                />

<Form.Field  label="Event Type" style={{marginTop:'-1px', height:'4.8vh'}} name="type" control='select' value={type} 
                       onChange={handleChange}    error={errors.visibilty ? { content: errors.visibilty } : null}>
                          <option value='None '>--Select--</option>
                          <option value='Offline'>Offline</option>
                           <option value='Online'>Online</option>
                         
      </Form.Field>

                <Form.TextArea
                  error={errors.info ? { content: errors.info } : null}
                  label="Paragraph-1"
                  name="info"
                 style={{height: '15vh'}}
               
                  placeholder="Paragraph 1"
                  onChange={handleChange}
                  value={info}
                />

<Form.TextArea
                  error={errors.info ? { content: errors.info } : null}
                  label="Paragraph-2"
                  name="info2"
                 style={{height: '15vh'}}
             
                  placeholder="Paragraph 2"
                  onChange={handleChange}
                  value={info2}
                />


<Form.TextArea
                  error={errors.info ? { content: errors.info } : null}
                  label="Paragraph-3"
                  name="info3"
                 style={{height: '15vh'}}
               
                  placeholder="Paragraph 3"
                  onChange={handleChange}
                  value={info3}
                />


                
<Form.Input name="dtime" readOnly hidden
                  value={dtime}
                />
                    <Form.Input name="ddate" readOnly hidden
                  value={ddate}
                />

<Form.Input name="users" readOnly hidden
                  value={users}
                />
             

                <Button
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

            <br></br> <br></br> <br></br> 
      </div>
    </>
  );
};

export default EditEvents;
