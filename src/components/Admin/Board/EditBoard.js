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
  position: "",
};

const EditBoard = () => {
  const [data, setData] = useState(initialState);
  const { name, position,img } = data;
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
    const docRef = doc(db, "board", id);
    const snapshot = await getDoc(docRef, "board");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, `board/${file.name}`);

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
        await addDoc(collection(db, "board"), {
          ...data,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "board", id), {
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
      <div className="container" style={{ marginTop: "16vh"}}>
        <div>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
              <h2>{id ? "UPDATE" : "ADD"} BOARD POSITION</h2>

              <div className="row">
                <div className="col-lg-4">
                <p>
                <img id="images" className="img-fluid" style={{width: "100%", height: "100%",  objectFit: 'cover',border: '1px solid grey'}} src={img} alt="Please wait..." />
              </p>
                </div>

                <div className="col-lg-8 my-2"> 
                <Form onSubmit={handleSubmit}>
                <Form.Input
                 
                  label="Name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={name}
                />

                <Form.Input
                  error={errors.position ? { content: errors.position } : null}
                  label="Designation"
                  name="position"
               readOnly={true}
                  maxLength="250"
                  placeholder=""
                  onChange={handleChange}
                  value={position}
                />

             
                <Form.Input
                  label="Image upload"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></Form.Input>

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

export default EditBoard;
