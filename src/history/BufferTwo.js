import React from 'react';
import { Form } from 'react-bootstrap';
import { useState } from "react";
import {  Bufftwo } from "../utils/interact.js";
export const BufferTwo = () => {
    const [upc, setUpc] = useState("");
    const [status, setStatus] = useState("");
    const buffer = async () => {
        const { status } = await Bufftwo(upc);
        setStatus(status);
      }
  return (
    <div>
        <h1 className='m-3 text-center'>Fetch Sold two</h1>
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
          <button className='m-3' onClick={buffer}>Buffer two</button>
          <p className='m-3 text-center' id="status">
          {status}
        </p>
          
    </div>
  )
}
