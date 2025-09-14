import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ImageViewer = ({ open, setOpen, img, name, info, id }) => {
  return (
    <Modal style={{height: "auto"}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >


<div className="container" style={{ maxWidth: "200vh", marginTop: "3vh" }}>

        
<div className="section-title" data-aos="fade-left">
  <h2
    style={{
      fontWeight: "bold",
      fontFamily: "Montserrat, sans-serif",
    }}
  >
    IMAGE VIEW
  </h2>
</div>



        <div style={{ marginTop: "8px" }}
        id="imggg">

    <p>
      <img id="images" className="img-fluid" style={{width: "120vh", height: "auto",  objectFit: 'cover'}} src={img} alt="" />
    </p>
   <h2>{name}</h2>
   <p style={{fontSize: '12px'}}>{info}</p>  
        </div>
</div>
<br></br>
   
        <Modal.Actions>
          <Button color="grey" onClick={() => setOpen(false)}>
            Close
          </Button>
         
        </Modal.Actions>
    
    </Modal>
  );
};

export default ImageViewer;
