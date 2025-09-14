import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert} from "react-bootstrap";
import './Style.css'
import { useUserAuth } from "../context/UserAuthContext";
import { Button, Icon } from "semantic-ui-react";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/portal");
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <>



<div className="container" id="loginbox">

<div class="account-page">
			<div class="account-center">
				<div class="account-box">
                
						<div class="account-logo">
                            <h4 style={{fontWeight: 'bold'}}>ALA-VIT Portal</h4><hr></hr>
                        </div>    
                        
                        <Form onSubmit={handleSubmit} class="form-signin">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div class="form-group">
                            <label>Registered Email</label>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control class="form-control"
                                  type="email"
                                  placeholder="Email address"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </Form.Group>
                           
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Control class="form-control"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </Form.Group>
                        </div>
                        {/* <div class="form-group text-right">
                            <Link to="/signin">Forgot your password?</Link>
                        </div> */}
                        <div class="form-group text-center">
                           
                           
                            <Button type="Submit" icon labelPosition='left' size='small' color="orange">  <Icon name='sign-in' />Login</Button>
                        </div>
          
                    </Form>
                </div>
			      </div>
        </div>

 
 </div>


    </>
  );
};

export default Login;
