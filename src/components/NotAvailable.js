import {React} from "react";
import "../App.css";



function NotAvailable() {

  return (
    <>
<div className="container" style={{margin: '20% auto 0 auto', width: '50%',border: '3px solid green', padding: '10px',textAlign:'center'}}>
  <h3 style={{textTransform: 'uppercase'}}>Website waiting for approval</h3>
</div>
    </>
  );
}

export default NotAvailable;
