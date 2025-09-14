import React, { useState, useEffect } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import GoToTop from '../../../GoToTop'


function Board() {
     const [boards, setBoards] = useState([]);
     const [board, setBoard] = useState({});
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
          const unsub = onSnapshot(collection(db, "board"), (snapshot) => {
               let list = [];
               snapshot.docs.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
               });
               setBoards(list);
               setLoading(false)

          },
          
          (error)=>{
               console.error(error);
          });
return() =>{
     unsub();
}
     }, []);

const handleModal = (item) => {
  setOpen(true);
  setBoard(item);
};

const handleDelete = async (id) =>{
  if(window.confirm('Are you sure you want to delete?')){
    try{
      setOpen(false);
      await deleteDoc(doc(db, "board", id));
      setBoards(boards.filter((board) => board.id !== id));
    }catch(err)
    {
      console.log(err);
    }
  }
}

  return (
    <>  
  <GoToTop />
        <div className="container" style={{ maxWidth: "200vh", marginTop: "15vh" }}>

        
          <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              BOARD POSITIONS
            </h2>
          </div>




  {/* Table */}
  {boards && boards.map((item) => (
          <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell />
       
        <Table.HeaderCell >Image</Table.HeaderCell>
        <Table.HeaderCell style={{width:'40vh'}}>Position</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell style={{width:'25vh'}}></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>
      
        </Table.Cell>
        <Table.Cell id="picteam"> <p>
                <img className="img-fluid" id="picteam" src={item.img} alt="" />
              </p></Table.Cell>
        <Table.Cell><h4 style={{color: 'red',marginTop: '5px'}}>{item.position}</h4> </Table.Cell>
        <Table.Cell><p style={{fontSize:"14px"}}>{item.name}</p></Table.Cell>
        <Table.Cell style={{ textAlign: 'center'}}> 
            
             <Button color="grey" icon labelPosition='left' size='small'  onClick={() => navigate(`/editboard/${item.id}`)}>
             <Icon name='pencil'/> Update</Button>
             </Table.Cell>
      </Table.Row>
    </Table.Body>

  
  </Table>  ))}

             {/* Table */}


        </div>
 
    </>
  )
}

export default Board
