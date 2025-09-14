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
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

const initialState = {
  name: "",
  info: "",
  visibilty:"",
  ddate:"",
  dtime:"",
};

const EditGallery = () => {
  const [data, setData] = useState(initialState);
  const { name, info, img,date,time, visibilty, ddate, dtime, users} = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useUserAuth();
  data.users = user.email;






  const today = new Date();
  data.time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  data.dtime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
  data.ddate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "gallery", id);
    const snapshot = await getDoc(docRef, "photo");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, `gallery/${file.name}`);

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
        await addDoc(collection(db, "gallery"), {
          ...data,

   
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "gallery", id), {
          name, info, img, visibilty, ddate, dtime, users,

       
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
    
           <h2>{id ? "UPDATE" : "ADD"} PHOTO TO GALLERY</h2>
          <div className="row">
    

        <div className="col-lg-4 my-2"> 
        <Card id="images">
                <Image id="images" className="img-fluid" src={img} alt="" />
              </Card>
        
        </div>
        <div className="col-lg my-2">
     
        {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (  <>
             
              <Form onSubmit={handleSubmit}>
              <Form.Input
                  label="Image upload"
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

<Form.Field  label="Mainpage visibilty" style={{marginTop:'-1px', height:'4.8vh'}} name="visibilty" control='select' value={visibilty} 
                       onChange={handleChange}    error={errors.visibilty ? { content: errors.visibilty } : null}>
                          <option value='None '>--Select--</option>
                          <option value='None'>Hidden</option>
                           <option value='Visible'>Show</option>
                         
      </Form.Field>

                <Form.TextArea
                  error={errors.info ? { content: errors.info } : null}
                  label="Photo description"
                  name="info"
                 style={{height: '15vh'}}
                  maxLength="250"
                  placeholder="Photo Description"
                  onChange={handleChange}
                  value={info}
                />

<Form.Input name="date" readonly hidden
                  value={date}
                />

                 <Form.Input name="time" readonly hidden
                  value={time}
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
      </div>
    </>
  );
};

export default EditGallery;
