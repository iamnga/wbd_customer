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
        <h1 className="page-title">Dashboard Báo Cáo Tổng Quan</h1>
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

      {/* Key Metrics */}
      <div className="metric-grid">
        <div className="metric-card primary">
          <div className="metric-label">Khách hàng đã triển khai</div>
          <div className="metric-value">{reportData.deployedCustomers}</div>
          <div className="metric-subtext">Trong {timePeriod.toLowerCase()}</div>
        </div>

        <div className="metric-card secondary">
          <div className="metric-label">Tổng số giao dịch</div>
          <div className="metric-value">{formatNumber(reportData.totalTransactions)}</div>
          <div className="metric-subtext">Trong {timePeriod.toLowerCase()}</div>
        </div>

        <div className="metric-card accent">
          <div className="metric-label">Giá trị giao dịch</div>
          <div className="metric-value" style={{ fontSize: '28px' }}>
            {formatCurrency(reportData.transactionValue)}
          </div>
          <div className="metric-subtext">Trong {timePeriod.toLowerCase()}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Casa bình quân</div>
          <div className="metric-value" style={{ fontSize: '28px' }}>
            {formatCurrency(reportData.avgCasa)}
          </div>
          <div className="metric-subtext">Trong {timePeriod.toLowerCase()}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="report-chart-container">
        <h2 className="report-chart-header">Biểu đồ phân tích chi tiết</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {/* Chart 1: Customer Distribution */}
          <div style={{
            backgroundColor: 'var(--background-color)',
            borderRadius: '10px',
            padding: '20px',
            border: '2px solid var(--accent-color)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '15px' }}>
              Phân bố khách hàng theo trạng thái
            </h3>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📈</div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>
              Biểu đồ tròn hiển thị tỷ lệ<br />khách hàng ở từng giai đoạn
            </p>
          </div>

          {/* Chart 2: Transaction Trend */}
          <div style={{
            backgroundColor: 'var(--background-color)',
            borderRadius: '10px',
            padding: '20px',
            border: '2px solid var(--accent-color)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '15px' }}>
              Xu hướng giao dịch theo thời gian
            </h3>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>
              Biểu đồ đường theo dõi<br />số lượng và giá trị giao dịch
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px'
        }}>
          {/* Chart 3: Service Type Distribution */}
          <div style={{
            backgroundColor: 'var(--background-color)',
            borderRadius: '10px',
            padding: '20px',
            border: '2px solid var(--accent-color)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '15px' }}>
              Phân loại theo dịch vụ
            </h3>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>
              Biểu đồ cột so sánh<br />Chi hộ, Thu hộ, Thu & Chi
            </p>
          </div>

          {/* Chart 4: Regional Performance */}
          <div style={{
            backgroundColor: 'var(--background-color)',
            borderRadius: '10px',
            padding: '20px',
            border: '2px solid var(--accent-color)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '15px' }}>
              Hiệu suất theo khu vực
            </h3>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🗺️</div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>
              So sánh thành tích<br />Miền Bắc và Miền Nam
            </p>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="report-chart-container">
        <h2 className="report-chart-header">Thống kê chi tiết theo khách hàng</h2>
        <div className="table-container" style={{ boxShadow: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Loại dịch vụ</th>
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
                      <td>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: customer.status === 'Closure' ? '#e8f5e9' : '#fff3e0',
                          color: customer.status === 'Closure' ? '#2e7d32' : '#f57c00'
                        }}>
                          {customer.status === 'Closure' ? 'Đã triển khai' : 'Đang triển khai'}
                        </span>
                      </td>
                      <td>{customer.serviceType}</td>
                      <td>{formatNumber(transactions)}</td>
                      <td style={{ fontWeight: '600', color: 'var(--secondary-color)' }}>
                        {formatCurrency(value)}
                      </td>
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
