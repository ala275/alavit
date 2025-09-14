import React, { useState, useEffect } from "react";
import { Alert} from "react-bootstrap";
import { Button, Icon,  Label, Form} from "semantic-ui-react";
import FinanceDataService from "./Financeservice";
import GoToTop from '../../GoToTop'
import { useUserAuth } from "./context/UserAuthContext";


const Finance = ({ id, setFinanceId }) => {
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [ddates, setDDate] = useState("");
  const [times, setTime] = useState("");
  const [type, setType] = useState("");
  const [users, setUser] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });


  const today = new Date();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const current = new Date();
  const ddate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;




  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (purpose === "" || date === "" || amount === "" ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newFinance = {
      purpose,
      amount,
      date,
      ddate,
      time,
      type,
      users : user.email
     
    
    };
    console.log(newFinance);

    try {
      if (id !== "" && id !== undefined) {
        await FinanceDataService.updateFinance(id, newFinance);
        setFinanceId("");
        setMessage({ error: false, msg: "Updated successfully!" });

      
      } else {
        await FinanceDataService.addFinances(newFinance);
        setMessage({ error: false, msg: "Added successfully!" }, 3000);
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setPurpose("");
    setAmount("");
    setDate("");
    setDDate("");
    setTime("");
    setType("");
    setUser("");

 
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await FinanceDataService.getFinance(id);
      console.log("the record is :", docSnap.data());
      setPurpose(docSnap.data().purpose);
      setAmount(docSnap.data().amount);
      setDate(docSnap.data().date);
      setDDate(docSnap.data().ddate);
      setTime(docSnap.data().time);
      setType(docSnap.data().type);
      setUser(docSnap.data().users);
      
    
  
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);




  return (
    <>
 <GoToTop />
      <div className="p-4 box container" style={{maxWidth: '150vh', marginTop:'7vh'}}>
      <h4 style={{textAlign: "left", fontWeight: 'bold'}}>FINANCE UPDATE</h4><hr></hr>
      
      {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
          
            onClose={() => setMessage(" ")}
          >
            {message?.msg}
          </Alert>
        )}
      <Form onSubmit={handleSubmit}>
      
          <Form.Input fluid  value={purpose}
                onChange={(e) => setPurpose(e.target.value)} label="Purpose" placeholder='Purpose' />
         
         <Form.Input name="ddate" readonly hidden
                  value={ddate}
                />

<Form.Input name="time" readonly hidden
                  value={time}
                />
          <Form.Input fluid  value={date} label="Date"
                onChange={(e) => setDate(e.target.value)} type="date" placeholder='Date' /> 
          
          <Form.Input labelPosition='right' type='text' style={{ height:'4.8vh'}} label="Amount"  placeholder='Amount'>
            <Label basic>₹</Label>
            <input  value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
            <Label>.00</Label>
          </Form.Input>

          <Form.Field style={{marginTop:'-1px', height:'4.8vh'}} control='select' value={type} label="Type"
                        onChange={(e) => setType(e.target.value)}>
                           <option value=' '>--Select--</option>
        <option value='↓ Deposit'>↓  Deposit</option>
        <option value='↑ Withdrawal'>↑ Withdrawal</option>
      </Form.Field>
      

      <Form.Input fluid  value={user.email}
                 onChange={(e) => setUser(e.target.value)} type="text"  hidden readOnly/>


        <Button icon labelPosition='left' size='small' color="green" type="Submit">
            <Icon name='save' />  Save
            </Button>

            {/* <Button icon labelPosition='left' size='small' primary onClick={() => window.location.reload(false)}>
            <Icon name='refresh' /> Refresh
            </Button> */}
      </Form>

       
      </div>
    </>
  );
};

export default Finance;
