import React from 'react'
import { Form } from 'react-bootstrap';
import {  useState } from "react";
import {  receivedRetailer } from "../utils/interact.js";
export const ReceivedbyRetailer = (props) => {
    const [upc, setUpc] = useState("");
    const [status, setStatus] = useState("");
    const receive = async () => {
        const { status } = await receivedRetailer(upc, props.value);
        setStatus(status);
      }



  return (
    <div>
        <h1 className='m-3 text-center'>Received Item By Retailer</h1>
        <div className='w-100'>
     <Form >
            <Form.Group>
              <Form.Label className='mb-3'>Universal Product Code</Form.Label>
              <Form.Control type="number"
                placeholder="Enter universal product code"
                onChange={(e) => setUpc(e.target.value)}
                value={upc}></Form.Control>
            </Form.Group>
           
  
          </Form>
          </div>
          <button className='m-3' onClick={receive}>Received Item By Retailer</button>
          <p className='m-3 text-center' id="status">
          {status}
        </p>
          
    </div>
  )
}
