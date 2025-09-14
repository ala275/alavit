import React from "react";
import { Button, Modal,} from "semantic-ui-react";


const ModalComp = ({ open, setOpen, name, date, contents, time, ddate, users,id, handleDelete}) => {


  return (
    <Modal style={{height:'80vh', top:'10vh'}} className="container"
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
   MINUTES OF MEETING
  </h4><hr></hr>
</div>





		<div className="container-fluid">
			<div className="row">
	
				<div className="col-lg-8">
				<div className="wishlist-border pt-2" >
				<span className="wishlist" style={{fontSize: '14px', fontWeight:'500'}}><i style={{color: 'grey'}}>Agenda: </i><strong style={{color:'orange',fontWeight: '500'}}>{name}</strong></span>
				</div>

        </div>

        <div className="col-lg-4">
		      <div className="wishlist-border pt-2" >
					<span className="wishlist" style={{fontSize: '13px'}}><i style={{color: 'grey'}}>Meeting Date:</i> <span style={{color:'orange',fontWeight: '500'}}>{ddate}</span></span>
				</div>
        </div>


        </div>


				<div className="wishlist-border pt-4" style={{color: 'grey',}}>
					<i> </i> <span className="wishlist" ><i style={{color: 'grey'}}>Meeting Details:</i>
          <div style={{fontSize: '12px',color: 'black', margin:'10px 0 0 10px'}} contentEditable='true' dangerouslySetInnerHTML={{ __html: ` ${contents}` }}></div>
            </span>
				</div>



			


			<hr></hr>
		<div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Posted on: <span style={{color:'black',fontWeight: '700'}}>{date}</span></span>
		</div>



    <div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Posted By: <span style={{color:'black',fontWeight: '700'}}>{users}</span></span>
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