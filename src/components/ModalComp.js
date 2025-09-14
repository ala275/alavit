import React from "react";
import { Button, Modal,} from "semantic-ui-react";


const ModalComp = ({ open, setOpen,img, name, date, time, id,}) => {


  return (
    <Modal style={{background:'none', width:"80%", height:'96vh', position: 'absolute'}} className="container"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >




			<img
                 
                      className="img-fluid"
                      src={img} style={{width:"100%"}}
                      alt=""
                    />
			

		
		

   
   


   

    
    </Modal>







  );
};

export default ModalComp;



{/* <Button color="grey" onClick={() => setOpen(false)}>
Cancel
</Button> */}