import { useState, useMemo } from 'react';
import { useCustomers } from '../contexts/CustomerContext';

type TimePeriod = 'Tuần' | 'Tháng' | 'Quý' | 'Năm';

interface ReportData {
  deployedCustomers: number;
  totalTransactions: number;
  transactionValue: number;
  avgCasa: number;
}

const Reports = () => {
  const { customers } = useCustomers();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('Tháng');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');

  // Get unique customer names
  const customerNames = useMemo(() => {
    return ['all', ...customers.map(c => c.name)];
  }, [customers]);

  // Calculate report data based on filters
  const reportData = useMemo((): ReportData => {
    let filteredCustomers = customers;

    if (selectedCustomer !== 'all') {
      filteredCustomers = customers.filter(c => c.name === selectedCustomer);
    }

    // Mock calculations - in real app, this would be based on actual transaction data
    const deployedCustomers = filteredCustomers.filter(c => c.status === 'Closure').length;

    // Mock transaction data with multipliers based on time period
    const periodMultiplier = {
      'Tuần': 1,
      'Tháng': 4,
      'Quý': 12,
      'Năm': 52
    };

    const multiplier = periodMultiplier[timePeriod];
    const baseTransactions = filteredCustomers.length * 150;
    const totalTransactions = baseTransactions * multiplier;
    const transactionValue = totalTransactions * 2500000; // 2.5M VND per transaction
    const avgCasa = filteredCustomers.length > 0 ? 150000000000 / filteredCustomers.length : 0;

    return {
      deployedCustomers,
      totalTransactions,
      transactionValue,
      avgCasa
    };
  }, [customers, selectedCustomer, timePeriod]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Báo cáo</h1>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mốc thời gian</label>
            <select
              className="form-select"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
            >
              <option value="Tuần">Tuần</option>
              <option value="Tháng">Tháng</option>
              <option value="Quý">Quý</option>
              <option value="Năm">Năm</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Khách hàng</label>
            <select
              className="form-select"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="all">Tất cả khách hàng</option>
              {customerNames.slice(1).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div style={{ marginBottom: '30px' }}>
        <div className="card">
          <h2 className="card-header">Dashboard Power BI</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Báo cáo tổng quan cho {timePeriod.toLowerCase()} {selectedCustomer !== 'all' ? `- ${selectedCustomer}` : ''}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {/* Deployed Customers */}
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--accent-color)',
              borderRadius: '8px',
              border: '2px solid var(--primary-color)'
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--primary-color)' }}>
                Khách hàng đã triển khai
              </h3>
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-color)' }}>
                {reportData.deployedCustomers}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Trong {timePeriod.toLowerCase()}
              </div>
            </div>

            {/* Total Transactions */}
            <div style={{
              padding: '20px',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              border: '2px solid var(--success-color)'
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--success-color)' }}>
                Tổng số giao dịch
              </h3>
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-color)' }}>
                {formatNumber(reportData.totalTransactions)}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Trong {timePeriod.toLowerCase()}
              </div>
            </div>

            {/* Transaction Value */}
            <div style={{
              padding: '20px',
              backgroundColor: '#fff3e0',
              borderRadius: '8px',
              border: '2px solid var(--secondary-color)'
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--secondary-color)' }}>
                Giá trị giao dịch
              </h3>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary-color)' }}>
                {formatCurrency(reportData.transactionValue)}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Trong {timePeriod.toLowerCase()}
              </div>
            </div>

            {/* Average Casa */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f3e5f5',
              borderRadius: '8px',
              border: '2px solid #7b1fa2'
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#7b1fa2' }}>
                Casa bình quân
              </h3>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#7b1fa2' }}>
                {formatCurrency(reportData.avgCasa)}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Trong {timePeriod.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual placeholder for Power BI embed */}
      <div className="card">
        <h2 className="card-header">Biểu đồ & Phân tích</h2>
        <div style={{
          backgroundColor: 'var(--accent-color)',
          borderRadius: '8px',
          padding: '60px',
          textAlign: 'center',
          color: 'var(--primary-color)',
          border: '2px dashed var(--primary-color)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
          <h3 style={{ marginBottom: '10px' }}>Dashboard Power BI</h3>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            Vùng này sẽ nhúng dashboard Power BI thực tế<br />
            với các biểu đồ, báo cáo chi tiết và phân tích dữ liệu
          </p>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h2 className="card-header">Thống kê chi tiết theo khách hàng</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Số GD (ước tính)</th>
                <th>Giá trị GD (ước tính)</th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter(c => selectedCustomer === 'all' || c.name === selectedCustomer)
                .map((customer) => {
                  const periodMultiplier = {
                    'Tuần': 1,
                    'Tháng': 4,
                    'Quý': 12,
                    'Năm': 52
                  };
                  const multiplier = periodMultiplier[timePeriod];
                  const transactions = 150 * multiplier;
                  const value = transactions * 2500000;

                  return (
                    <tr key={customer.id}>
                      <td style={{ fontWeight: '500' }}>{customer.name}</td>
                      <td>{customer.status === 'Closure' ? 'Đã triển khai' : 'Đang triển khai'}</td>
                      <td>{formatNumber(transactions)}</td>
                      <td>{formatCurrency(value)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
