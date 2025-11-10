import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CustomerProvider } from './contexts/CustomerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';
import Reports from './pages/Reports';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2b6cae',
          colorSuccess: '#4caf50',
          colorWarning: '#f19b38',
          colorError: '#f44336',
          colorInfo: '#92b5d7',
          colorBgContainer: '#fefefe',
          borderRadius: 6,
          fontSize: 14,
        },
        components: {
          Button: {
            controlHeight: 38,
            paddingContentHorizontal: 20,
          },
          Input: {
            controlHeight: 38,
          },
          Select: {
            controlHeight: 38,
          },
        },
      }}
    >
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
    </ConfigProvider>
  );
}

export default App;
