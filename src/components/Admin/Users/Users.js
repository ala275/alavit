import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Button, Icon,  Form } from "semantic-ui-react";
import UsersDataService from "./Userservice";
import GoToTop from "../../../GoToTop";

const Users = ({ id, setUserId }) => {
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [pass, setPass] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });


  const [show, setShow] = useState(false)


  const handleShow=()=>{
    setShow(!show)
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" ||  role === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newUser = {
      name,
      regno,
      pass,
      position,
      role,
    };
    console.log(newUser);

    try {
      if (id !== "" && id !== undefined) {
        await UsersDataService.updateUser(id, newUser);
        setUserId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await UsersDataService.addUsers(newUser);
        setMessage({ error: false, msg: "Added successfully!" }, 3000);
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setRegno("");
    setPass("");
    setPosition("");
    setRole("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await UsersDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setRegno(docSnap.data().regno);
      setPass(docSnap.data().pass);
      setPosition(docSnap.data().position);
      setRole(docSnap.data().role);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <>
      <GoToTop />
      <div
        className="p-4 box container"
        style={{ maxWidth: "150vh", marginTop: "7vh" }}
      >
        <h4 style={{ textAlign: "left", fontWeight: "bold" }}>
          USER DETAILS UPDATE
        </h4>
        <hr></hr>

        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            onClose={() => setMessage(" ")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Input
            fluid
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <div className="row">
            <div className="col-lg">
            <Form.Input
            fluid
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
           label="Registration No."
            placeholder="Registration no."
          />
            </div>
            <div className="col-lg">
              <b>Password</b> <i onClick={handleShow} style={{color: 'red', cursor: 'pointer'}} class="eye icon"></i><br></br>
            <p  style={{ height:'36px',border:'1px solid grey', padding:'7px', borderRadius:'5px', marginTop:'2px'}}>
           {show? `${pass}`: "-----"} 
            </p>

            </div>
          </div>

        
<br></br>


<Form.Field
            style={{ marginTop: "-1px", height: "4.8vh" }}
            control="select"
            label="Board Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value=" ">--Select--</option>
           
            <option value="Chairperson">Chairperson</option>
            <option value="Vice-Chairperson">Vice-Chairperson</option>
            <option value="Secratary">Secratary</option>
            <option value="Co-Secratary">Co-Secratary</option>
            <option value="Management Head">Management Head</option>
            <option value="Finance Head">Finance Head</option>
            <option value="Editorial Head">Editorial Head</option>
            <option value="Publicity Head">Publicity Head</option>
            <option value="Events Head">Events Head</option>
            <option value="Design Head">Design Head</option>
          </Form.Field>


      

          <Form.Field
            style={{ marginTop: "-1px", height: "4.8vh" }}
            control="select"
            label="Portal Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value=" ">--Select--</option>
            <option value="advisor">Advisor</option>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="manager">Management</option>
            <option value="finance">Finance</option>
            <option value="editorial">Editorial</option>
            <option value="board">Board</option>
        

          </Form.Field>

  
        

          {/* <Button
            icon
            labelPosition="left"
            size="small"
            primary
            onClick={() => window.location.reload(false)}
          >
            <Icon name="refresh" /> Refresh
          </Button> */}

          <Button
            icon
            labelPosition="left"
            size="small"
            color="green"
            type="Submit"
          >
            <Icon name="save" /> Save
          </Button>


        </Form>

    
      </div>
    </>
  );
};

export default Users;
