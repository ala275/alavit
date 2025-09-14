import React from 'react'
import { Button, Form} from "semantic-ui-react";
import GoToTop from '../../GoToTop'



const Tshirtsuccess = () => {
    
  return (
    <>  <GoToTop />



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
  
      <div class="modal-body" style={{textAlign:'center'}}>
      <img style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/website-e921e.appspot.com/o/qr.JPG?alt=media&token=96e48219-c099-48ac-9845-d6fcba9ec87b" alt="" />
           
<br></br><br></br>
           <h4>UPI ID: <br></br><span style={{color: "black", fontWeight:'bold'}}>7086952212-1@okbizaxis</span></h4>
      </div>
      <div class="modal-footer">
        <Button type="button" size="small" data-bs-dismiss="modal">Close</Button>

      </div>
    </div>
  </div>
</div>




<div style={{height:'8vh'}}></div>




      <div
        className="container-fluid"
        id="partb"
        style={{ marginTop: "4vh", maxWidth: "200vh" }}
      >
        <div className="content">
          <div className="row">
            <div className="col-lg-6" style={{ marginTop: "2vh" }}>
              <img style={{width: "100%"}} src="https://firebasestorage.googleapis.com/v0/b/website-e921e.appspot.com/o/tshirt.JPG?alt=media&token=b3ab0d2b-00ed-4755-83c1-58465b649b34" alt="" />
            </div>

            <div
              className="col-lg-6"
              style={{
                marginTop: "2vh",
                backgroundColor: "#f5f4f2",
                padding: "15px",
              }}
            >
              <div class="container" id="formrecruit">
                <div class="row">
                  <div class="container">
                    <div class="form-content">
                      <div class="form-items">
                        <h3>T-shirt Registration</h3>
                        <p style={{color: 'orange'}}><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Complete the payment process to confirm your order</p>
                        <hr></hr>

                        <table class="ui celled table">
  <thead>
    <tr>
   
      <th>Item</th>
      <th>Charges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>T-shirt</td>
      <td style={{color:'red', fontWeight:'bold'}}>₹ 580.00</td>
    </tr>
    <tr style={{backgroundColor:'white'}}>
     
      <td>Delivery charge</td>
      <td style={{color:'red', fontWeight:'bold'}}>₹ 20.00</td>
   
    </tr>

    <tr style={{backgroundColor:'#fff8e3'}}>
    <td>Total amount</td>
      <td style={{color:'red', fontWeight:'bold'}}>₹ 600.00</td>
    </tr>
  
  </tbody>
</table>
        <br></br>


                 

                  <div className="text-center">
                  <Button type="button" style={{marginTop:'22px', minWidth:'15vh'}} color="green" size='small' data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa fa-money" aria-hidden="true"></i>  Pay Now
                  </Button>
                       
                  </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  );
};

export default Tshirtsuccess;
