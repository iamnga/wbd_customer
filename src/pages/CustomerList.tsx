import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Select, Button, Space, Card, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { ServiceType, Status, Region, Branch, Handler, Customer } from '../types';

const { Title } = Typography;

const CustomerList = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  // Filter states
  const [filterCustomer, setFilterCustomer] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<Region | ''>('');
  const [filterServiceType, setFilterServiceType] = useState<ServiceType | ''>('');
  const [filterStatus, setFilterStatus] = useState<Status | ''>('');
  const [filterHandler, setFilterHandler] = useState<Handler | ''>('');
  const [filterBranch, setFilterBranch] = useState<Branch | ''>('');

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      if (filterCustomer && !customer.name.toLowerCase().includes(filterCustomer.toLowerCase())) {
        return false;
      }
      if (filterRegion && customer.region !== filterRegion) {
        return false;
      }
      if (filterServiceType && customer.serviceType !== filterServiceType) {
        return false;
      }
      if (filterStatus && customer.status !== filterStatus) {
        return false;
      }
      if (filterHandler && customer.handler !== filterHandler) {
        return false;
      }
      if (filterBranch && customer.branch !== filterBranch) {
        return false;
      }
      return true;
    });
  }, [customers, filterCustomer, filterRegion, filterServiceType, filterStatus, filterHandler, filterBranch]);

  // Table columns
  const columns: ColumnsType<Customer> = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: Status) => <StatusBadge status={status} />,
    },
    {
      title: 'Miền',
      dataIndex: 'region',
      key: 'region',
      width: '15%',
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
      width: '15%',
    },
    {
      title: 'Người xử lý',
      dataIndex: 'handler',
      key: 'handler',
      width: '15%',
    },
  ];

  const handleAddNew = () => {
    navigate('/customers/new');
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0, color: '#2b6cae' }}>
          Quản lý khách hàng
        </Title>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAddNew}>
          Thêm mới khách hàng
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Khách hàng</div>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm..."
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                allowClear
              />
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Trạng thái</div>
              <Select
                style={{ width: '100%' }}
                value={filterStatus}
                onChange={setFilterStatus}
                options={[
                  { value: '', label: 'Tất cả' },
                  { value: 'Initiation', label: 'Initiation' },
                  { value: 'Planning', label: 'Planning' },
                  { value: 'Execution', label: 'Execution' },
                  { value: 'MonitorNControl', label: 'Monitor & Control' },
                  { value: 'Closure', label: 'Closure' },
                  { value: 'Canceled', label: 'Canceled' },
                ]}
              />
            </div>

            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Người xử lý</div>
              <Select
                style={{ width: '100%' }}
                value={filterHandler}
                onChange={setFilterHandler}
                options={[
                  { value: '', label: 'Tất cả' },
                  { value: 'Hoàng Phương Nhi', label: 'Hoàng Phương Nhi' },
                  { value: 'Nguyễn Hữu Cường', label: 'Nguyễn Hữu Cường' },
                ]}
              />
            </div>

            <div>
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
            </div>
          </div>
        </Space>
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredCustomers}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} khách hàng`,
          showSizeChanger: false,
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/customers/${record.id}`),
          style: { cursor: 'pointer' },
        })}
        locale={{
          emptyText: 'Không tìm thấy khách hàng nào',
        }}
      />
    </Space>
  );
};

export default CustomerList;
