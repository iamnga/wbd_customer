import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Select, Typography, Space, Statistic, Tag, Empty } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { Handler } from '../types';

const { Title, Text } = Typography;

const Home = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();
  const [selectedHandler, setSelectedHandler] = useState<Handler>('Hoàng Phương Nhi');

  // Filter customers excluding Closure and Canceled AND by selected handler
  const activeCustomers = customers.filter(
    (customer) =>
      customer.status !== 'Closure' &&
      customer.status !== 'Canceled' &&
      customer.handler === selectedHandler
  );

  // Calculate statistics
  const totalCustomers = customers.length;
  const deployedCustomers = customers.filter((c) => c.status === 'Closure').length;
  const deployingCustomers = customers.filter(
    (c) => c.status !== 'Closure' && c.status !== 'Canceled'
  ).length;

  const handleCardClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const getServiceTagColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Chi hộ':
        return 'orange';
      case 'Thu hộ':
        return 'blue';
      case 'Thu & Chi':
        return 'cyan';
      default:
        return 'default';
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Header */}
      <Title level={2} style={{ margin: 0, color: '#2b6cae' }}>
        Trang chủ
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card style={{
            background: 'linear-gradient(135deg, #2b6cae 0%, #92b5d7 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>Tổng số khách hàng</span>}
              value={totalCustomers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{
            background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>KH đã triển khai</span>}
              value={deployedCustomers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{
            background: 'linear-gradient(135deg, #f19b38 0%, #ffb74d 100%)',
            border: 'none'
          }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>KH đang triển khai</span>}
              value={deployingCustomers}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tasks Section */}
      <Card
        title={<Title level={4} style={{ margin: 0 }}>Tác vụ của tôi</Title>}
        extra={
          <Select
            value={selectedHandler}
            onChange={setSelectedHandler}
            style={{ width: 250 }}
            options={[
              { value: 'Hoàng Phương Nhi', label: 'Hoàng Phương Nhi' },
              { value: 'Nguyễn Hữu Cường', label: 'Nguyễn Hữu Cường' },
            ]}
          />
        }
      >
        {activeCustomers.length > 0 ? (
          <Row gutter={[16, 16]}>
            {activeCustomers.map((customer) => (
              <Col xs={24} sm={12} lg={8} key={customer.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(customer.id)}
                  style={{ height: '100%' }}
                >
                  <Title level={5} style={{ margin: '0 0 16px 0', color: '#2b6cae' }}>
                    {customer.name}
                  </Title>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px 16px'
                  }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                        Trạng thái
                      </Text>
                      <StatusBadge status={customer.status} />
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                        Dịch vụ
                      </Text>
                      <Tag color={getServiceTagColor(customer.serviceType)}>
                        {customer.serviceType}
                      </Tag>
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                        Người xử lý
                      </Text>
                      <div>
                        <UserOutlined style={{ marginRight: 6 }} />
                        <Text strong>{customer.handler}</Text>
                      </div>
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                        Ngày golive
                      </Text>
                      <div>
                        <CalendarOutlined style={{ marginRight: 6 }} />
                        <Text strong style={{ color: '#f19b38' }}>
                          {dayjs(customer.expectedEndDate).format('DD/MM/YYYY')}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description={`Không có tác vụ nào đang hoạt động cho ${selectedHandler}`}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </Space>
  );
};

export default Home;
