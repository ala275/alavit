import React from "react";
import { Button, Modal,} from "semantic-ui-react";


const ModalComp = ({ open, setOpen,img, name, info, date, time, ddate, dtime, users,id, handleDelete}) => {


  return (
    <Modal style={{height:'65vh', top:'15vh'}} className="container"
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
   GALLERY PHOTO VIEW
  </h4><hr></hr>
</div>





		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-6"><img
                      id="images"
                      className="img-fluid"
                      style={{
                        width: "55vh",
                        height: "30vh",
                        objectFit: "cover",
                      }}
                      src={img}
                      alt=""
                    /></div>
				<div className="col-lg-6">
				<div className="wishlist-border pt-2" style={{backgroundColor: 'orange', padding:'8px',color: 'white',}}>
				<span className="wishlist" style={{fontSize: '14px', fontWeight:'500'}}>{name}</span>
				</div>

				<div className="wishlist-border pt-4" style={{color: 'grey',}}>
					<i>Desc:</i> <span className="wishlist" style={{fontSize: '13px',color: 'black'}}>{info}</span>
				</div>


				
				<div className="wishlist-border pt-2 my-2" >
					<span className="wishlist" style={{fontSize: '13px'}}><i style={{color: 'grey',}}>Posted on:</i> <span style={{color:'orange',fontWeight: '500'}}>{date} | {time}</span></span>
				</div>


				</div>
			</div>

			<hr></hr>
		<div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Last Update Date: <span style={{color:'orange',fontWeight: '500'}}>{ddate}</span></span>
		</div>

		<div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Last Update Time: <span style={{color:'orange',fontWeight: '500'}}>{dtime}</span></span>
		</div>

    <hr></hr>

    <div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Updated By: <span style={{color:'orange',fontWeight: '500'}}>{users}</span></span>
		</div>


<hr></hr>

		<Button color="red" style={{marginTop:'2px'}} size='small' onClick={() => handleDelete(id)}>
                   <i class="fa fa-trash" aria-hidden="true"></i>
         </Button> 
<br></br>

		</div>
		
		

   
   



</div>

   

    
    </Modal>







  );
};

export default ModalComp;



{/* <Button color="grey" onClick={() => setOpen(false)}>
Cancel
</Button> */}