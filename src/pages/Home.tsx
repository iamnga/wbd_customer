import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';

const Home = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  // Filter customers excluding Closure and Canceled
  const activeCustomers = customers.filter(
    customer => customer.status !== 'Closure' && customer.status !== 'Canceled'
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
        <h2 className="card-header">Tác vụ của tôi</h2>
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
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Người xử lý (PIC)</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{customer.handler}</div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Dịch vụ</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{customer.serviceType}</div>
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
          <p>Không có tác vụ nào đang hoạt động</p>
        </div>
      )}
    </div>
  );
};

export default Home;
