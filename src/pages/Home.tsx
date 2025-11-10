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
          <Card>
            <Statistic
              title="Tổng số khách hàng"
              value={totalCustomers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#2b6cae' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="KH đã triển khai"
              value={deployedCustomers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#4caf50' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="KH đang triển khai"
              value={deployingCustomers}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: '#f19b38' }}
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
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={5} style={{ margin: 0, color: '#2b6cae' }}>
                      {customer.name}
                    </Title>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Trạng thái
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <StatusBadge status={customer.status} />
                      </div>
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Người xử lý
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <UserOutlined style={{ marginRight: 6 }} />
                        <Text strong>{customer.handler}</Text>
                      </div>
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Dịch vụ
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <Tag color={getServiceTagColor(customer.serviceType)}>
                          {customer.serviceType}
                        </Tag>
                      </div>
                    </div>

                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Ngày golive dự kiến
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <CalendarOutlined style={{ marginRight: 6 }} />
                        <Text strong style={{ color: '#f19b38' }}>
                          {dayjs(customer.expectedEndDate).format('DD/MM/YYYY')}
                        </Text>
                      </div>
                    </div>
                  </Space>
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
