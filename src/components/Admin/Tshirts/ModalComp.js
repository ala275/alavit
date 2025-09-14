import React from "react";
import { Button, Modal,Icon} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const ModalComp = ({ open, setOpen, name, regno, email, contact, size, status,date, time, ddate, dtime, users,id, handleDelete,}) => {
	const navigate = useNavigate();

  return (
    <Modal style={{height:'72vh', top:'13vh'}} className="container"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >


<div className="container" style={{ maxWidth: "200vh", marginTop: "3vh", padding:'15px' }}>

        
<div className="section-title" data-aos="fade-left">
  <h4
    style={{
      fontWeight: "bold",
      fontFamily: "Montserrat, sans-serif",
    }}
  >
    T-SHIRT REGISTRATION DETAILS
  </h4><hr></hr>
</div>
<br></br>



	<div className="card" style={{backgroundColor:'white'}}>
		
		<div className="container">
			<div className="row">
        <div className="col-lg-2">	<img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="" style={{borderRadius: '10px', border: '2px solid #5957f9'}} className="img-fluid profile-image" width="70"/>
			</div>
        <div className="col-lg-8">
    
				<h5 className="name" style={{fontSize: '13px', fontWeight: 'bold', color: '#272727',  marginTop: '8px'}}>{name} | {regno}</h5>
				<p className="mail" style={{fontSize: '12px', color: 'grey', }}><i class="fa fa-envelope" aria-hidden="true"></i> {email}<br></br>
        <i class="fa fa-phone-square" aria-hidden="true"></i> {contact}</p>
		
        </div>
      </div>
		
		
		</div>


		<div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2" style={{backgroundColor: '#eee',borderRadius: '12px'}}>
				<div className="dollar-div px-3" style={{backgroundColor: 'white', padding: '10px',borderRadius: '10px', border:'1px solid orange'}}>
					
					<div className="round-div" style={{borderRadius: '50%', fontSize: '25px',color: 'black',fontWeight: '800',
width: '35px',height: '35px',backgroundColor: '#fff',display: 'flex',justifyContent: 'center',alignItems: 'center',textAlign: 'center'}}>{size}</div>

				</div>
				<div className="d-flex flex-column text-right mr-2">
					<span className="current-balance" style={{fontSize: '15px', color: '#272727',fontWeight: 'bold'}}>Current Status</span>
					<span className="amount" style={{color: 'red',fontSize: '16px',fontWeight: 'bold', marginTop:'5px'}}>{status}</span>
				</div>

		</div>

		<div className="recent-border mt-4" style={{borderLeft: '2px solid orange',display: 'flex',alignItems: 'center'}}>
			<span className="recent-orders" style={{fontSize: '16px',fontWeight: '500',color: 'orange',marginLeft: '2px'}}>More Details:</span>
		</div>
		<div className="wishlist-border pt-2 my-2">
			<span className="wishlist" style={{fontSize: '13px'}}>Registration Date: <span style={{color:'orange',fontWeight: '500'}}>{date}</span></span>
		</div>
		<div className="fashion-studio-border pt-2">
		<span className="wishlist" style={{fontSize: '13px'}}>Registration Time: <span style={{color:'orange',fontWeight: '500'}}>{time}</span></span>
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
	</div>
	

   
   

  <Button color="red" style={{marginTop:'2px'}} size='small' onClick={() => handleDelete(id)}>
                   <i class="fa fa-trash" aria-hidden="true"></i>
         </Button> 

	    <Button color="orange" style={{marginTop:'2px'}} icon labelPosition='left' size='small' onClick={() => navigate(`/edittshirts/${id}`)}>
                   <Icon name='pencil' /> Update
                   </Button>
</div>

   

    
    </Modal>







  );
};

export default ModalComp;



{/* <Button color="grey" onClick={() => setOpen(false)}>
Cancel
</Button> */}