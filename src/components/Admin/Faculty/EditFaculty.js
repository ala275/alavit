import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon } from "semantic-ui-react";
import { db, storage } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import GoToTop from '../../../GoToTop'



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
  designation: "",
  order: "5",
};

const EditFaculty = () => {
  const [data, setData] = useState(initialState);
  const { name, designation,school,img,position,order } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleBoard();
  }, [id]);

  const getSingleBoard = async () => {
    const docRef = doc(db, "faculty", id);
    const snapshot = await getDoc(docRef, "faculty");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = (e) => {

      
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, `faculty/${file.name}`);

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

    if (!img) {
      errors.img = "Image is required";
    }


    if (!name) {
      errors.name = "Name is required";
    }

    if (!designation) {
      errors.designation = "Designation is required";
    }

    if (!school) {
      errors.school = "School is required";
    }

    if (!position) {
      errors.position = "Position is required";
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
        await addDoc(collection(db, "faculty"), {
          ...data,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "faculty", id), {
          ...data,

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
      <div className="container" style={{ marginTop: "15vh"}}>
        <div>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
              <h2>{id ? "UPDATE" : "ADD"} ADVISOR</h2>

              <div className="row">
                <div className="col-lg-4">
                <p>
                <img id="images" className="img-fluid" style={{width: "100%", height: "100%",  objectFit: 'cover',border: '1px solid grey'}} src={img} alt="Please wait..." />
              </p>
                </div>

                <div className="col-lg-8 my-2"> 
                <Form onSubmit={handleSubmit}>

                <Form.Input
                  label="Image upload"
                  type="file"
          
                  onChange={(e) => setFile(e.target.files[0])}
                ></Form.Input>


                <Form.Input
                 
                  label="Name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={name}
                />

                <Form.Input
                  error={errors.designation ? { content: errors.designation } : null}
                  label="Designation"
                  name="designation"
                  placeholder="Designation"
                  onChange={handleChange}
                  value={designation}
                />

<Form.Input
               hidden
           
                  name="order"
         
                  onChange={handleChange}
                  value={order}
                />

<Form.Field  label="Position" style={{marginTop:'-1px', height:'4.8vh'}} name="position" control='select' value={position} 
                       onChange={handleChange}    error={errors.visibilty ? { content: errors.visibilty } : null}>
                          <option value='none '>--Select--</option>
                          <option value='none'>Student Advisor</option>
                           <option value='0'>Faculty Coordinator</option>
                         
      </Form.Field>


<Form.Input
                 
                  label="School/Batch"
                  name="school"
                  placeholder="School"
                  onChange={handleChange}
                  value={school}
                />

             
               

                <Button
                  color="green" icon labelPosition='left' size='small' 
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                   <Icon name='save'/> Save
                </Button>


                
              </Form>
              </div>
              </div>
             
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditFaculty;
