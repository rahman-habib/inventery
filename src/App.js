
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter } from 'react-router-dom';
import { SupplyChain } from './SupplyChain';

function App() {
  return (
    
    <Container>
      <BrowserRouter>
    <SupplyChain/>
    </BrowserRouter>
    </Container>

    
  );
}

export default App;
