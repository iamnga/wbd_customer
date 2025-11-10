import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomerProvider } from './contexts/CustomerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';
import Reports from './pages/Reports';

function App() {
  return (
    <CustomerProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </Router>
    </CustomerProvider>
  );
}

export default App;
