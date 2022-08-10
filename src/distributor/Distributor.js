import React from 'react'
import { Button } from 'bootstrap';
import  { useState } from 'react'
import { Form } from 'react-bootstrap';
import { addDist,checkDist,removeDist } from '../utils/interact'

export const Distributor = (props) => {

   const [status, setStatus] = useState("");
    const [address, setAddress] = useState("");
    const [status1, setStatus1] = useState("");
    const[result,setResult]=useState(null);
    const check=async()=>{
       const data= await checkDist(props.value);
       setResult(data);
       console.log(data);
       
    }
    const adddist=async()=>{
        const {status}= await addDist(address,props.value);
      
        setStatus(status);
        
     }
     const removedist=async()=>{
      const {status}= await removeDist(props.value);
    
      setStatus1(status);
      
   }


  return (
    <>
    <div>
        <h1 className='text-center mt-3'>Distributor</h1>
        
        <button  onClick={check} >Is Distributor?</button>
        <p>{result!=null ? result ? "True": "False":""}</p>
    </div>
<div>
    <h1 className='text-center mb-3'>Add Distributor</h1>
    <Form.Group>
              <Form.Label className='mb-3'>
                Address
              </Form.Label>
              <Form.Control type="text"
                placeholder="Enter new Distributor address"
                onChange={(e) => setAddress(e.target.value)}
                value={address} />
            </Form.Group>
            <button className='m-3' onClick={adddist}>Add Distributor</button>
            <p>{status}</p>
</div>

<div>
    <h1 className='text-center mb-3'>Remove Distributor</h1>
            <button className='m-3' onClick={removedist}>Remove distributor</button>
            <p>{status1}</p>
</div>


    </>

  )
}
