import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, Icon } from "semantic-ui-react";
import UsersDataService from "./Userservice";

const UserList = ({ getUserId }) => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UsersDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  return (
    <>
      <div className="container"></div>

      <div
        className="container"
        style={{ fontSize: "13px", maxWidth: "150vh" }}
      >
        <h4 style={{ textAlign: "left", fontWeight: "bold" }}>USERS</h4>
        <hr></hr>
        <div className="mb-2">
          <Button
            primary
            icon
            labelPosition="left"
            size="small"
            onClick={getUsers}
          >
            <Icon name="refresh" /> Refresh List
          </Button>
        </div>

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Reg no.</th>
              <th style={{ textAlign: "left" }}>Position</th>

              <th style={{ textAlign: "left" }}>Role</th>
              <th style={{ textAlign: "center" }}>Password </th>
              <th style={{ textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((doc, index) => {
              return (
                <tr key={doc.id} >
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "left" }}>{doc.name}</td>
                  <td style={{ textAlign: "left" }}>{doc.regno}</td>
                  <td style={{ textAlign: "left" }}>{doc.position}</td>
                  <td style={{ textAlign: "left", color:'red' }}>{doc.role}</td>
                  <td style={{ textAlign: "center" }}><p>----</p></td>
                  <td style={{ textAlign: "center", width: "10vh", height:'40px' }}>
 
                    <Button color="grey"  style={{marginTop:'2px',display: `${doc.pass}`}} size='small'   onClick={(e) => getUserId(doc.id)}>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </Button>
           
                

                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserList;
