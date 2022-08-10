import React from 'react'
import { Route, Routes ,Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";
import {ProducedItembyDistributor} from "./distributor/ProducedItembyDistributor.js";

import { Distributor } from './distributor/Distributor.js';
import { Retailer } from './retailer/Retailer.js';

import { SellbyDistributor } from './distributor/SellbyDistributor.js';
import { ShippedbyDistributor } from './distributor/ShippedbyDistributor.js';

import { BufferOne } from './history/BufferOne.js';
import { BufferTwo } from './history/BufferTwo.js';
import { PurchasedbyRetailer } from './retailer/PurchasedbyRetailer.js';
import { ReceivedbyRetailer } from './retailer/ReceivedbyRetailer.js';


export const SupplyChain = (props) => {
  const navigate = useNavigate();
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    async function fetchdata() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }
    fetchdata();
  }, []);
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Wallet conected");
        }
        else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    }
    else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  return (
    <div className="supplychain">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Supply Chain</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <NavDropdown title="Distributor" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/produceitemByDistributor")} >
                  ProduceItemByDistributor
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ForSaleByDistributor")} >
                  ForSaleByDistributor
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ShippedByDistributor")} >
                  ShippedByDistributor
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => navigate("/distributor")}>Distributor</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Retailer" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/PurchasedByRetailer")} >PurchasedByRetailer</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => navigate("/ReceivedByRetailer")}>
                  ReceivedByRetailer
                </NavDropdown.Item>
                
                <NavDropdown.Item onClick={() => navigate("/retailer")}>Retailer</NavDropdown.Item>
              </NavDropdown>
              
             
              <Nav.Link onClick={() => navigate("/buffer")} >BufferOne</Nav.Link>
              <Nav.Link onClick={() => navigate("/buffertwo")} >BufferTwo</Nav.Link>
              <Nav.Link className='display-flex justify-content-end'>
                <button id="walletButton" onClick={connectWalletPressed}>
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
      <Route exect path="/produceitemByDistributor" element={<ProducedItembyDistributor value={walletAddress} />} />
      <Route exect path="/ReceivedByRetailer" element={<ReceivedbyRetailer value={walletAddress} />} />
      <Route exect path="/PurchasedByRetailer" element={<PurchasedbyRetailer value={walletAddress} />} />
      <Route exect path="/buffertwo" element={<BufferTwo value={walletAddress} />} />
      <Route exect path="/buffer" element={<BufferOne value={walletAddress} />} />
     
      <Route exect path="/ShippedByDistributor" element={<ShippedbyDistributor value={walletAddress} />} />
      <Route exect path="/ForSaleByDistributor" element={<SellbyDistributor value={walletAddress} />} />   
        <Route exect path="/retailer" element={<Retailer value={walletAddress} />} />
        <Route exect path="/distributor" element={<Distributor value={walletAddress} />} />
   
      </Routes>
    </div>
  );
}
