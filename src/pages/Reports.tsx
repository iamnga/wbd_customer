import { useState, useMemo } from 'react';
import { Card, Row, Col, Select, Typography, Space, Statistic, Table, Tag } from 'antd';
import {
  TeamOutlined,
  TransactionOutlined,
  DollarOutlined,
  BankOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useCustomers } from '../contexts/CustomerContext';
import type { Customer, ServiceType, Region, Branch } from '../types';

const { Title, Text } = Typography;

type TimePeriod = 'Tuần' | 'Tháng' | 'Quý' | 'Năm';

interface ReportData {
  deployedCustomers: number;
  totalTransactions: number;
  transactionValue: number;
  avgCasa: number;
}

interface CustomerReport extends Customer {
  transactions: number;
  value: number;
}

const Reports = () => {
  const { customers } = useCustomers();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('Tháng');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [filterServiceType, setFilterServiceType] = useState<ServiceType | ''>('');
  const [filterRegion, setFilterRegion] = useState<Region | ''>('');
  const [filterBranch, setFilterBranch] = useState<Branch | ''>('');

  // Get unique customer names
  const customerNames = useMemo(() => {
    return ['all', ...customers.map((c) => c.name)];
  }, [customers]);

  // Calculate report data based on filters
  const reportData = useMemo((): ReportData => {
    let filteredCustomers = customers;

    if (selectedCustomer !== 'all') {
      filteredCustomers = filteredCustomers.filter((c) => c.name === selectedCustomer);
    }
    if (filterServiceType) {
      filteredCustomers = filteredCustomers.filter((c) => c.serviceType === filterServiceType);
    }
    if (filterRegion) {
      filteredCustomers = filteredCustomers.filter((c) => c.region === filterRegion);
    }
    if (filterBranch) {
      filteredCustomers = filteredCustomers.filter((c) => c.branch === filterBranch);
    }

    // Mock calculations - in real app, this would be based on actual transaction data
    const deployedCustomers = filteredCustomers.filter((c) => c.status === 'Closure').length;

    // Mock transaction data with multipliers based on time period
    const periodMultiplier = {
      Tuần: 1,
      Tháng: 4,
      Quý: 12,
      Năm: 52,
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
      avgCasa,
    };
  }, [customers, selectedCustomer, timePeriod, filterServiceType, filterRegion, filterBranch]);

  // Table data
  const tableData = useMemo((): CustomerReport[] => {
    const periodMultiplier = {
      Tuần: 1,
      Tháng: 4,
      Quý: 12,
      Năm: 52,
    };
    const multiplier = periodMultiplier[timePeriod];

    let filtered = customers;
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter((c) => c.name === selectedCustomer);
    }
    if (filterServiceType) {
      filtered = filtered.filter((c) => c.serviceType === filterServiceType);
    }
    if (filterRegion) {
      filtered = filtered.filter((c) => c.region === filterRegion);
    }
    if (filterBranch) {
      filtered = filtered.filter((c) => c.branch === filterBranch);
    }

    return filtered.map((customer) => {
      const transactions = 150 * multiplier;
      const value = transactions * 2500000;
      return {
        ...customer,
        transactions,
        value,
      };
    });
  }, [customers, selectedCustomer, timePeriod, filterServiceType, filterRegion, filterBranch]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const columns: ColumnsType<CustomerReport> = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Closure' ? 'success' : 'warning'}>
          {status === 'Closure' ? 'Đã triển khai' : 'Đang triển khai'}
        </Tag>
      ),
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'serviceType',
      key: 'serviceType',
    },
    {
      title: 'Số GD (ước tính)',
      dataIndex: 'transactions',
      key: 'transactions',
      align: 'right',
      render: (value: number) => formatNumber(value),
    },
    {
      title: 'Giá trị GD (ước tính)',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: (value: number) => (
        <Text strong style={{ color: '#f19b38' }}>
          {formatCurrency(value)}
        </Text>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Header */}
      <Title level={2} style={{ margin: 0, color: '#2b6cae' }}>
        Dashboard Báo Cáo Tổng Quan
      </Title>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Mốc thời gian</div>
            <Select
              style={{ width: '100%' }}
              value={timePeriod}
              onChange={setTimePeriod}
              options={[
                { value: 'Tuần', label: 'Tuần' },
                { value: 'Tháng', label: 'Tháng' },
                { value: 'Quý', label: 'Quý' },
                { value: 'Năm', label: 'Năm' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Khách hàng</div>
            <Select
              style={{ width: '100%' }}
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              options={[
                { value: 'all', label: 'Tất cả khách hàng' },
                ...customerNames.slice(1).map((name) => ({ value: name, label: name })),
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Loại dịch vụ</div>
            <Select
              style={{ width: '100%' }}
              value={filterServiceType}
              onChange={setFilterServiceType}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'Chi hộ', label: 'Chi hộ' },
                { value: 'Thu hộ', label: 'Thu hộ' },
                { value: 'Thu & Chi', label: 'Thu & Chi' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Miền</div>
            <Select
              style={{ width: '100%' }}
              value={filterRegion}
              onChange={setFilterRegion}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'Miền Nam', label: 'Miền Nam' },
                { value: 'Miền Bắc', label: 'Miền Bắc' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Chi nhánh</div>
            <Select
              style={{ width: '100%' }}
              value={filterBranch}
              onChange={setFilterBranch}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'Hội Sở', label: 'Hội Sở' },
                { value: 'Đô Thành', label: 'Đô Thành' },
                { value: 'Hà Nội', label: 'Hà Nội' },
                { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{
            background: 'linear-gradient(135deg, #2b6cae 0%, #92b5d7 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>Khách hàng đã triển khai</span>}
              value={reportData.deployedCustomers}
              prefix={<TeamOutlined />}
              suffix={<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>/ {timePeriod.toLowerCase()}</span>}
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{
            background: 'linear-gradient(135deg, #f19b38 0%, #ffb74d 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>Tổng số giao dịch</span>}
              value={reportData.totalTransactions}
              prefix={<TransactionOutlined />}
              suffix={<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>/ {timePeriod.toLowerCase()}</span>}
              valueStyle={{ color: 'white' }}
              formatter={(value) => formatNumber(Number(value))}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{
            background: 'linear-gradient(135deg, #92b5d7 0%, #d4e7f7 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(43,108,174,0.9)' }}>Giá trị giao dịch</span>}
              value={reportData.transactionValue}
              prefix={<DollarOutlined />}
              suffix={<span style={{ fontSize: 12, color: 'rgba(43,108,174,0.8)' }}>/ {timePeriod.toLowerCase()}</span>}
              valueStyle={{ color: '#2b6cae', fontSize: 20 }}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{
            background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>Casa bình quân</span>}
              value={reportData.avgCasa}
              prefix={<BankOutlined />}
              suffix={<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>/ {timePeriod.toLowerCase()}</span>}
              valueStyle={{ color: 'white', fontSize: 20 }}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Card title={<Title level={4} style={{ margin: 0 }}>Biểu đồ phân tích chi tiết</Title>}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #92b5d7',
              }}
            >
              <PieChartOutlined style={{ fontSize: 48, color: '#2b6cae', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#2b6cae' }}>
                Phân bố khách hàng theo trạng thái
              </Title>
              <Text type="secondary">
                Biểu đồ tròn hiển thị tỷ lệ
                <br />
                khách hàng ở từng giai đoạn
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #92b5d7',
              }}
            >
              <LineChartOutlined style={{ fontSize: 48, color: '#2b6cae', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#2b6cae' }}>
                Xu hướng giao dịch theo thời gian
              </Title>
              <Text type="secondary">
                Biểu đồ đường theo dõi
                <br />
                số lượng và giá trị giao dịch
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #92b5d7',
              }}
            >
              <BarChartOutlined style={{ fontSize: 48, color: '#2b6cae', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#2b6cae' }}>
                Phân loại theo dịch vụ
              </Title>
              <Text type="secondary">
                Biểu đồ cột so sánh
                <br />
                Chi hộ, Thu hộ, Thu & Chi
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid #92b5d7',
              }}
            >
              <EnvironmentOutlined style={{ fontSize: 48, color: '#2b6cae', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#2b6cae' }}>
                Hiệu suất theo khu vực
              </Title>
              <Text type="secondary">
                So sánh thành tích
                <br />
                Miền Bắc và Miền Nam
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Summary Table */}
      <Card title={<Title level={4} style={{ margin: 0 }}>Thống kê chi tiết theo khách hàng</Title>}>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{ pageSize: 10, showTotal: (total) => `Tổng số ${total} khách hàng` }}
        />
      </Card>
    </Space>
  );
};

export default Reports;
