import React, { useState } from "react";
import { Button, Icon, Form } from "semantic-ui-react";
// import GoToTop from '../../../GoToTop'
import GoToTop from '../../../GoToTop'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import { Table } from "react-bootstrap";

import { useUserAuth } from "../context/UserAuthContext";


const initialState = {
  ddate:"",
  dtime:"",

};

function FormControls() {

  const [data, setData] = useState(initialState);
  const {ddate, dtime, users} = data;

  const { user } = useUserAuth();
  data.users = user.email;

  const today = new Date();
  data.dtime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  data.ddate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const [students, loading, error] = useCollectionData(
    db.collection('FormsControl').orderBy('no')
  );

  const [updatedStudents, setUpdatedStudents] = useState([]);

  
  const handleChange = (event, student) => {
    const { value } = event.target;

    setUpdatedStudents((prevStudents) => [
      ...prevStudents.filter((s) => s.id !== student.id),
      { ...student, statuss: value },
    ]);
  };



  const handleSave = () => {
    updatedStudents.forEach((student) => {
      db.collection('FormsControl').doc(student.id).update({
        
        ...data,
        statuss: student.statuss,
      })
    })

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }




    return (

      <>  <GoToTop />
    
      <div className="container-fluid" style={{ marginTop: "15vh", maxWidth: '190vh' }}>
   
  
           <h2   style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>FORMS CONTROL</h2>
              
              
    


              <hr></hr>
        
        <div className="container-fluid">
   
        <Table responsive striped bordered hover size="medium">
          <thead>
            <tr>
              <th>#</th>
        
              <th>Name</th>
              <th style={{textAlign: 'center'}}>UpdatedBy</th>
              <th style={{textAlign: 'center'}}>UpdatedOn</th>
              <th style={{textAlign: 'center'}}>Status</th>
              <th style={{textAlign: 'center'}}>Action</th>  
   
          
         
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
             
              <tr key={student.id} style={{display:`${student.statuss}`}}>
                   <td style={{textAlign: 'center',width:'8vh'}}>{index + 1}</td>
                
                <td><b>{student.name}</b></td>
                <td style={{textAlign: 'center', fontSize:'12px'}}>{student.users}</td>
                <td style={{textAlign: 'center'}}>{student.ddate}|{student.dtime}</td>
                <td style={{textAlign: 'center', color: 'red', fontWeight:'bold'}}>{student.statuss}</td>
                
                <td style={{width:'19vh', minWidth:'15vh'}}>
                  <select style={{margin: '0px', height:'30px', padding:'2px'}}
                    value={
                      updatedStudents.find((s) => s.id === student.id)?.statuss ??
                      student.statuss
                    }

              
                  onChange={(event) => handleChange(event, student)}>
                    <option disabled value="-">--Select--</option>
                    <option selected value="">Open</option>
                    <option value="disabled">Closed</option> 
                  </select>
                  
                </td>
              
        
               
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br><br></br>
        <div className="text-center">
          <Form onSubmit={handleSave}>
        <Form.Input name="dtime" readOnly hidden
                  value={dtime}
                />
                    <Form.Input name="ddate" readOnly hidden
                  value={ddate}
                />

<Form.Input name="users" readOnly hidden
                  value={users}
                />
        <Button icon labelPosition='left' size='small' color='green' onClick={handleSave}> <Icon name='check'/> Save</Button>
        
        </Form>
        
        </div>
      </div> 
    
            


<br></br><br></br><br></br>
<br></br>
             



            
       
   
      </div> 
      
  
       </>
    );
  }
  export default FormControls