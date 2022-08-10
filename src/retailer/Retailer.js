import React from 'react'
import { Button } from 'bootstrap';
import  { useState } from 'react'
import { Form } from 'react-bootstrap';
import { addRet,checkRet,removeRet } from '../utils/interact'
export const Retailer = (props) => {
 
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState("");
    const [status1, setStatus1] = useState("");
    const[result,setResult]=useState(null);
    const check=async()=>{
       const data= await checkRet(props.value);
       setResult(data);
       console.log(data);
       
    }
    const addret=async()=>{
        const {status}= await addRet(address,props.value);
      
        setStatus(status);
        
     }
     const removret=async()=>{
      const {status}= await removeRet(props.value);
    
      setStatus1(status);
      
   }


  return (
    <>
    <div>
        <h1 className='text-center mt-3'>Retailer</h1>
        
        <button  onClick={check} >Is Retailer?</button>
        <p>{result!=null ? result ? "True": "False":""}</p>
    </div>
<div>
    <h1 className='text-center mb-3'>Add Retailer</h1>
    <Form.Group>
              <Form.Label className='mb-3'>
                Address
              </Form.Label>
              <Form.Control type="text"
                placeholder="Enter new Retailer address"
                onChange={(e) => setAddress(e.target.value)}
                value={address} />
            </Form.Group>
            <button className='m-3' onClick={addret}>Add Retailer</button>
            <p>{status}</p>
</div>

<div>
    <h1 className='text-center mb-3'>Remove Retailer</h1>
            <button className='m-3' onClick={removret}>Remove Retailer</button>
            <p>{status1}</p>
</div>


    </>

  )
}
