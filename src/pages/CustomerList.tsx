import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { ServiceType, Status, Region, Branch, Handler } from '../types';

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

  const handleRowClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handleAddNew = () => {
    navigate('/customers/new');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý khách hàng</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Thêm mới khách hàng
        </button>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Khách hàng</label>
            <input
              type="text"
              className="form-input"
              placeholder="Tìm kiếm..."
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Miền</label>
            <select
              className="form-select"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value as Region | '')}
            >
              <option value="">Tất cả</option>
              <option value="Miền Nam">Miền Nam</option>
              <option value="Miền Bắc">Miền Bắc</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Loại dịch vụ</label>
            <select
              className="form-select"
              value={filterServiceType}
              onChange={(e) => setFilterServiceType(e.target.value as ServiceType | '')}
            >
              <option value="">Tất cả</option>
              <option value="Chi hộ">Chi hộ</option>
              <option value="Thu hộ">Thu hộ</option>
              <option value="Thu & Chi">Thu & Chi</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Trạng thái</label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Status | '')}
            >
              <option value="">Tất cả</option>
              <option value="Initiation">Initiation</option>
              <option value="Planning">Planning</option>
              <option value="Execution">Execution</option>
              <option value="MonitorNControl">Monitor & Control</option>
              <option value="Closure">Closure</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Người xử lý</label>
            <select
              className="form-select"
              value={filterHandler}
              onChange={(e) => setFilterHandler(e.target.value as Handler | '')}
            >
              <option value="">Tất cả</option>
              <option value="Hoàng Phương Nhi">Hoàng Phương Nhi</option>
              <option value="Nguyễn Hữu Cường">Nguyễn Hữu Cường</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Chi nhánh</label>
            <select
              className="form-select"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value as Branch | '')}
            >
              <option value="">Tất cả</option>
              <option value="Hội Sở">Hội Sở</option>
              <option value="Đô Thành">Đô Thành</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hoàn Kiếm">Hoàn Kiếm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Tên khách hàng</th>
              <th>Loại dịch vụ</th>
              <th>Trạng thái</th>
              <th>Miền</th>
              <th>Chi nhánh</th>
              <th>Người xử lý</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} onClick={() => handleRowClick(customer.id)}>
                <td style={{ fontWeight: '500' }}>{customer.name}</td>
                <td>{customer.serviceType}</td>
                <td>
                  <StatusBadge status={customer.status} />
                </td>
                <td>{customer.region}</td>
                <td>{customer.branch}</td>
                <td>{customer.handler}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            Không tìm thấy khách hàng nào
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Hiển thị {filteredCustomers.length} / {customers.length} khách hàng
      </div>
    </div>
  );
};

export default CustomerList;
