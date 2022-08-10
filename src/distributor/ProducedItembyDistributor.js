import React from 'react'
import {  useState } from "react";
import { Form } from 'react-bootstrap';
import {  produceItemByDistributor } from "../utils/interact.js";
export const ProducedItembyDistributor = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [upc, setUpc] = useState("");
  const [name, setName] = useState("");
  const [descriptions, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [status, setStatus] = useState("");

  

  const ProduceItemByDistributor = async () => {
    const { status } = await produceItemByDistributor(upc, name, descriptions, quantity, purchasePrice, props.value);
    setStatus(status);
  }


  return (
    <div className="supplychain">
     


      <h1 className='m-3 text-center'>Produce Item By Farmer</h1>
      <div className='w-100'>
        <Form >
          <Form.Group>
            <Form.Label className='mb-3'>Universal Product Code</Form.Label>
            <Form.Control type="number"
              placeholder="Enter universal product code"
              onChange={(e) => setUpc(e.target.value)}
              value={upc}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className='mb-3'>
              Product Name
            </Form.Label>
            <Form.Control type="text"
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
              value={name}>

            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className='mb-3'>
              Discription
            </Form.Label>
            <Form.Control type="text"
              placeholder="Enter product discription"
              onChange={(e) => setDescription(e.target.value)}
              value={descriptions} />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Enter quantity
            </Form.Label>
            <Form.Control type="number"
              placeholder="Enter quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity} />
          </Form.Group>
          
          

          <Form.Group>
            <Form.Label className='mb-3'>
              Price
            </Form.Label>
            <Form.Control type="number"
              placeholder="Enter price"
              onChange={(e) => setPurchasePrice(e.target.value)}
              value={purchasePrice} />
          </Form.Group>

        </Form>
      </div>
      <button className='m-3' onClick={ProduceItemByDistributor}>Produce Item By Distributor</button>




      <p className='m-3 text-center' id="status">
        {status}
      </p>
    </div>
  );
}
