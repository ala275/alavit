import React from "react";
import { Modal,} from "semantic-ui-react";


const ModalComp = ({ open, setOpen,img, name, info, date, time, ddate, dtime, users,id, handleDelete}) => {


  
  return (
    <Modal style={{height:'80vh',width:'120vh', top:'10vh'}} className="container"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >


<div className="container" style={{ maxWidth: "200vh", marginTop: "3vh", padding:'2px' }}>

        
<div className="section-title" data-aos="fade-left">
  <h4
    style={{
      fontWeight: "bold",
      fontFamily: "Montserrat, sans-serif",
    }}
  >
 VALIDATION CERTIFICATE
  </h4><hr></hr>
</div>





		

   
   



</div>

   

    
    </Modal>







  );
};

export default ModalComp;



{/* <Button color="grey" onClick={() => setOpen(false)}>
Cancel
</Button> */}