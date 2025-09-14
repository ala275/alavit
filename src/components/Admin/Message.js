import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, Icon} from "semantic-ui-react";
import MessageDataService from "./MsgService";

const Message = ({ getMessageId }) => {
  const [message, setMsg] = useState([]);
  useEffect(() => {
    getMsgs();
  }, []);

  const getMsgs = async () => {
    const data = await MessageDataService.getAllBooks();
    console.log(data.docs);
    setMsg(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await MessageDataService.deleteBook(id);
    getMsgs();
  };
  return (
    <>
    <div className="container-fluid">
      <div className="mb-2" style={{marginTop: '15vh'}}>
        <Button primary icon labelPosition='left' size='small'  onClick={getMsgs}>
        <Icon name='refresh' /> Refresh List
        </Button>
      </div>

      <div class="table-responsive custom-table-responsive">

          <Table striped bordered hover size="sm" class="table custom-table" >
              <thead>
                  <tr > 
                    <th scope="col" style={{width: '8vh',textAlign:'center'}}>SNo.</th> 
                      <th scope="col" style={{width: '30vh'}}>Name</th>
                      <th scope="col" style={{width: '50vh'}}>Email</th>
                   
                      <th scope="col">Message</th>
                      <th scope="col">PostedOn</th>
                      <th scope="col" style={{width: '20vh',textAlign:'center'}}>Action</th>
                    

                  </tr>
              </thead>
              <tbody id="tbody1">
            
                    {message.map((doc, index) => {
                      return (
                        <tr key={doc.id}>
                          <td style={{color: 'grey', textAlign:'center'}}>{index + 1}</td>
                          <td style={{color: 'grey'}}>{doc.fname}</td>
                          <td style={{color: 'grey'}}>{doc.email}</td>
                       
                          <td>{doc.subject}</td>
                          <td style={{color: 'grey'}}>{doc.date}</td>
                          <td style={{ textAlign: 'center'}}>
                          <Button color="red" icon labelPosition='left' size='small' onClick={(e) => deleteHandler(doc.id)}>
             <Icon name='trash' /> Delete</Button>
                          
                        
                           
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
          </Table>
      </div>


   
      </div>
    </>
  );
};

export default Message;