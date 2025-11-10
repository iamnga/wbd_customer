import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { Handler } from '../types';

const Home = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();
  const [selectedHandler, setSelectedHandler] = useState<Handler>('Hoàng Phương Nhi');

  // Filter customers excluding Closure and Canceled AND by selected handler
  const activeCustomers = customers.filter(
    customer =>
      customer.status !== 'Closure' &&
      customer.status !== 'Canceled' &&
      customer.handler === selectedHandler
  );

  // Calculate statistics
  const totalCustomers = customers.length;
  const deployedCustomers = customers.filter(c => c.status === 'Closure').length;
  const deployingCustomers = customers.filter(
    c => c.status !== 'Closure' && c.status !== 'Canceled'
  ).length;

  const handleCardClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const getServiceTagClass = (serviceType: string) => {
    switch (serviceType) {
      case 'Chi hộ':
        return 'service-tag service-tag-chi';
      case 'Thu hộ':
        return 'service-tag service-tag-thu';
      case 'Thu & Chi':
        return 'service-tag service-tag-both';
      default:
        return 'service-tag';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trang chủ</h1>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng số khách hàng</h3>
          <div className="stat-value">{totalCustomers}</div>
        </div>
        <div className="stat-card">
          <h3>KH đã triển khai</h3>
          <div className="stat-value">{deployedCustomers}</div>
        </div>
        <div className="stat-card">
          <h3>KH đang triển khai</h3>
          <div className="stat-value">{deployingCustomers}</div>
        </div>
      </div>

      {/* Tasks/Active Customers */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="card-header" style={{ marginBottom: 0 }}>Tác vụ của tôi</h2>
          <div className="form-group" style={{ marginBottom: 0, minWidth: '250px' }}>
            <select
              className="form-select"
              value={selectedHandler}
              onChange={(e) => setSelectedHandler(e.target.value as Handler)}
            >
              <option value="Hoàng Phương Nhi">Hoàng Phương Nhi</option>
              <option value="Nguyễn Hữu Cường">Nguyễn Hữu Cường</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {activeCustomers.map((customer) => (
          <div
            key={customer.id}
            className="card card-clickable"
            onClick={() => handleCardClick(customer.id)}
          >
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: 'var(--primary-color)' }}>
              {customer.name}
            </h3>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Trạng thái</div>
              <StatusBadge status={customer.status} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Người xử lý</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{customer.handler}</div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Dịch vụ</div>
              <span className={getServiceTagClass(customer.serviceType)}>
                {customer.serviceType}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Ngày golive dự kiến</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--secondary-color)' }}>
                {new Date(customer.expectedEndDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCustomers.length === 0 && (
        <div className="card text-center">
          <p>Không có tác vụ nào đang hoạt động cho {selectedHandler}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
