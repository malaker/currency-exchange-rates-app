import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrenciesTable } from './features/currency-exchange/CurrenciesTable';
import { CurrencyHistory } from './features/currency-exchange/CurrencyHistory';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col><CurrenciesTable /></Col>
          <Col><CurrencyHistory /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
