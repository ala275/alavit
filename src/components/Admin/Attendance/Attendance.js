import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
// import GoToTop from '../../../GoToTop'
import GoToTop from '../../../GoToTop'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";

function Attendance() {
  const [students, loading, error] = useCollectionData(
    db.collection('Team').orderBy('regno', 'desc')
  );

  const [updatedStudents, setUpdatedStudents] = useState([]);

  const handleChange = (event, student) => {
    const { value } = event.target;

    setUpdatedStudents((prevStudents) => [
      ...prevStudents.filter((s) => s.id !== student.id),
      { ...student, a6_4_23: value },
    ]);
  };



  const handleSave = () => {
    updatedStudents.forEach((student) => {
      db.collection('Team').doc(student.id).update({
        a6_4_23: student.a6_4_23,
      })
    })
  alert("Attendance posted successfully")
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

    return (

      <>  <GoToTop />
    
      <div className="container-fluid" style={{ marginTop: "15vh", maxWidth: '200vh' }}>
   
  
           <h2   style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}>ATTENDANCE</h2>
              
              
              <div className="container-fluid">
            <div className="text-right" style={{marginTop: '-35px'}}>
            <Link to="/teammembers"><Button
            floated='right'
        
            color="orange"
            size='small'
          >
            Add Member
          </Button></Link>
        
          </div></div>
          {/* Table */}
        
         
  
<br></br><br></br>


              <hr></hr>
   
        <div className="container-fluid">
   
        <Table responsive striped bordered hover size="medium">
          <thead>
            <tr>
              <th>#</th>
              <th>Reg no.</th>
              <th>Name</th>
              <th style={{textAlign: 'center'}}>Action</th>  
              <th>06/4/23<br></br><span style={{color: 'orange'}}>(Event_1)</span></th>
              <th>22/3/23</th>
              <th>21/3/23</th>
          
         
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
             
              <tr key={student.id} style={{display:`${student.status}`}}>
                   <td style={{textAlign: 'center',width:'8vh'}}>{index + 1}</td>
                   <td style={{width:'30vh'}}>{student.regno}</td>
                <td>{student.name}</td>
                <td style={{width:'19vh', minWidth:'15vh'}}>
                  <select style={{margin: '0px', height:'30px', padding:'2px'}}
                    value={
                      updatedStudents.find((s) => s.id === student.id)?.a6_4_23 ??
                      student.a6_4_23
                    }

              
                    onChange={(event) => handleChange(event, student)}
                  >
                    
                    <option disabled value="-">Select</option>
                    <option selected value=" ">ABSENT</option>
                    <option value="P">PRESENT</option>
                    
                  </select>
                  
                </td>
                <td style={{width:'6vh', textAlign:'center', fontWeight:'bold', fontSize:'13px', color:'green'}}>{student.a6_4_23}</td>
               <td style={{width:'6vh', textAlign:'center', fontWeight:'bold', fontSize:'13px', color:'green'}}>{student.a22_3_23}</td>
                <td style={{width:'6vh', textAlign:'center', fontWeight:'bold', fontSize:'13px', color:'green'}}>{student.a21_3_23}</td>
             
          
               
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br><br></br>
        <div className="text-center">
        <Button  icon labelPosition='left' size='small' color='orange' onClick={handleSave}> <Icon name='check'/> Post Attendance</Button></div>
      </div> 
    
            


<br></br><br></br><br></br>
<br></br>
             



            
       
   
      </div> 
      
  
       </>
    );
  }
  export default Attendance