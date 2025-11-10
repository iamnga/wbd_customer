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
  const canceledCustomers = customers.filter(c => c.status === 'Canceled').length;

  // Calculate success rate
  const successRate = totalCustomers > 0
    ? Math.round((deployedCustomers / (totalCustomers - canceledCustomers)) * 100)
    : 0;

  // Get status distribution
  const statusCounts = {
    Initiation: customers.filter(c => c.status === 'Initiation').length,
    Planning: customers.filter(c => c.status === 'Planning').length,
    Execution: customers.filter(c => c.status === 'Execution').length,
    MonitorNControl: customers.filter(c => c.status === 'MonitorNControl').length,
  };

  const handleCardClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={() => navigate('/customers/new')}>
            + Thêm khách hàng
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/reports')}>
            📊 Xem báo cáo
          </button>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card-enhanced" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
        }}>
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Tổng khách hàng</h3>
            <div className="stat-value">{totalCustomers}</div>
            <div className="stat-trend">
              <span style={{ color: '#4caf50' }}>↑ 12%</span> so với tháng trước
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          boxShadow: '0 8px 20px rgba(240, 147, 251, 0.3)'
        }}>
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Đã triển khai</h3>
            <div className="stat-value">{deployedCustomers}</div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${successRate}%` }}></div>
              </div>
              <span className="progress-label">{successRate}% tỷ lệ thành công</span>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced" style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          boxShadow: '0 8px 20px rgba(79, 172, 254, 0.3)'
        }}>
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>Đang triển khai</h3>
            <div className="stat-value">{deployingCustomers}</div>
            <div className="stat-trend">
              <span style={{ color: '#ff9800' }}>⚡</span> {deployingCustomers} dự án đang chạy
            </div>
          </div>
        </div>
      </div>

      {/* Project Status Overview */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 className="card-header" style={{ marginBottom: '20px' }}>Tổng quan trạng thái dự án</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="status-overview-item">
            <div className="status-overview-icon" style={{ background: '#e3f2fd' }}>📝</div>
            <div className="status-overview-content">
              <div className="status-overview-label">Initiation</div>
              <div className="status-overview-value">{statusCounts.Initiation}</div>
            </div>
          </div>
          <div className="status-overview-item">
            <div className="status-overview-icon" style={{ background: '#fff3e0' }}>📋</div>
            <div className="status-overview-content">
              <div className="status-overview-label">Planning</div>
              <div className="status-overview-value">{statusCounts.Planning}</div>
            </div>
          </div>
          <div className="status-overview-item">
            <div className="status-overview-icon" style={{ background: '#f3e5f5' }}>⚙️</div>
            <div className="status-overview-content">
              <div className="status-overview-label">Execution</div>
              <div className="status-overview-value">{statusCounts.Execution}</div>
            </div>
          </div>
          <div className="status-overview-item">
            <div className="status-overview-icon" style={{ background: '#e0f2f1' }}>📊</div>
            <div className="status-overview-content">
              <div className="status-overview-label">Monitor & Control</div>
              <div className="status-overview-value">{statusCounts.MonitorNControl}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks/Active Customers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--primary-color)' }}>
          Dự án đang hoạt động ({activeCustomers.length})
        </h2>
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
