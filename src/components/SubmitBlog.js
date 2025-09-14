import React, { useState, useEffect } from "react";
import { Button, Form, Loader, Icon } from "semantic-ui-react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../GoToTop";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  auth: "",
  email: "",
  contact: "",
  time: "",
  approval: "none",
  pending: "",
};

const SubmitBlog = () => {
  const [data, setData] = useState(initialState);
  const { name, auth, email, contact, time, date, approval } = data;
  const [contents, setPa] = useState(null);
  // const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  data.time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const current = new Date();
  data.date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;

  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef, "blogs");
    if (snapshot.exists()) {
      setData({ name, auth, email, contact, contents, time, date, approval });
    }
  };

  const handleChange = (e) => {
    setData({
      name,
      auth,
      email,
      contact,
      contents,
      time,
      date,
      approval,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Title is required";
    }

    if (!auth) {
      errors.auth = "Author is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!contact) {
      errors.contact = "Contact is required";
    }

    if (!contents) {
      errors.contents = "Content is required";
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
        await addDoc(collection(db, "blogs"), {
          name,
          auth,
          email,
          contact,
          contents,
          time,
          date,
          approval,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "blogs", id), {
          name,
          auth,
          email,
          contact,
          contents,
          time,
          date,
          approval,

          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/success");
  };
  return (
    <>
      {" "}
      <GoToTop />
      <div
        className="container-fluid"
        style={{ marginTop: "15vh", maxWidth: "190vh", minHeight: "85vh" }}
      >
        <div>
          {isSubmit ? (
            <Loader active inline="centered" size="huge" />
          ) : (
            <>
              <h2>SUBMIT BLOG</h2>
              <hr></hr>
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  error={errors.name ? { content: errors.name } : null}
                  label="Title"
                  name="name"
                  placeholder="Title"
                  onChange={handleChange}
                  value={name}
                />
                <Form.Input
                  error={errors.auth ? { content: errors.auth } : null}
                  label="Author"
                  name="auth"
                  placeholder="Author"
                  onChange={handleChange}
                  value={auth}
                />
                <div className="row">
                  <div className="col-lg">
                    {" "}
                    <Form.Input
                      error={errors.email ? { content: errors.email } : null}
                      label="Email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={email}
                    />{" "}
                  </div>

                  <div className="col-lg">
                    {" "}
                    <Form.Input
                      error={
                        errors.contact ? { content: errors.contact } : null
                      }
                      label="Contact"
                      name="contact"
                      placeholder="Contact"
                      onChange={handleChange}
                      value={contact}
                    />{" "}
                  </div>
                </div>
                <Form.Input name="date" readOnly hidden value={date} />
                <Form.Input name="time" readOnly hidden value={time} />
                <Form.Input name="approval" hidden value={approval} />
                <ReactQuill
                  theme="snow"
                  label="Content"
                  style={{ height: "30vh" }}
                  name="contents"
                  error={errors.contents ? { content: errors.contents } : null}
                  value={contents}
                  onChange={setPa}
                />
                <br></br> <br></br> <br></br> <br></br>
                <Button
                  color="orange"
                  icon
                  labelPosition="left"
                  size="small"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  <Icon name="upload" /> Submit
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitBlog;
