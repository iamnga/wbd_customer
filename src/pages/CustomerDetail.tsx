import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { Customer, Status } from '../types';
import { PHASE_CHECKLISTS, STATUS_LABELS } from '../types';

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCustomer, updateCustomer, getCustomerById } = useCustomers();

  const isNew = id === 'new';
  const isEdit = new URLSearchParams(window.location.search).get('mode') === 'edit';

  const [mode, setMode] = useState<'view' | 'edit' | 'new'>(
    isNew ? 'new' : isEdit ? 'edit' : 'view'
  );

  // Form state
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    serviceType: 'Chi hộ',
    status: 'Initiation',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Hoàng Phương Nhi',
    startDate: '',
    expectedEndDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      const customer = getCustomerById(id);
      if (customer) {
        setFormData(customer);
      } else {
        setErrorMessage('Không tìm thấy khách hàng');
      }
    }
  }, [id, isNew, getCustomerById]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Tên khách hàng là bắt buộc';
    }
    if (!formData.serviceType) {
      newErrors.serviceType = 'Loại dịch vụ là bắt buộc';
    }
    if (!formData.region) {
      newErrors.region = 'Miền là bắt buộc';
    }
    if (!formData.branch) {
      newErrors.branch = 'Chi nhánh là bắt buộc';
    }
    if (!formData.handler) {
      newErrors.handler = 'Người xử lý là bắt buộc';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    }
    if (!formData.expectedEndDate) {
      newErrors.expectedEndDate = 'Ngày kết thúc dự kiến là bắt buộc';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const errorFields = Object.keys(newErrors).join(', ');
      setErrorMessage(`Vui lòng kiểm tra các trường: ${errorFields}`);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    if (mode === 'new') {
      addCustomer(formData as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>);
      setSuccessMessage('Thêm mới khách hàng thành công');
      setTimeout(() => navigate('/customers'), 1500);
    } else if (mode === 'edit' && id) {
      updateCustomer(id, formData);
      setSuccessMessage('Cập nhật khách hàng thành công');
      setTimeout(() => {
        setMode('view');
        setSuccessMessage('');
      }, 1500);
    }
  };

  const handleCancelCustomer = () => {
    if (!cancelReason.trim()) {
      alert('Vui lòng nhập lý do dừng triển khai');
      return;
    }

    if (id) {
      updateCustomer(id, {
        status: 'Canceled',
        cancelReason: cancelReason
      });
      setShowCancelModal(false);
      setSuccessMessage('Cập nhật trạng thái khách hàng thành công');
      setTimeout(() => {
        setMode('view');
        setSuccessMessage('');
      }, 1500);
    }
  };

  const getStatusIndex = (status: Status): number => {
    const statuses: Status[] = ['Initiation', 'Planning', 'Execution', 'MonitorNControl', 'Closure'];
    return statuses.indexOf(status);
  };

  const renderPipeline = () => {
    if (mode !== 'view' || !formData.status || formData.status === 'Canceled') {
      return null;
    }

    const currentStatusIndex = getStatusIndex(formData.status);
    const statuses: Status[] = ['Initiation', 'Planning', 'Execution', 'MonitorNControl', 'Closure'];

    return (
      <div className="pipeline">
        <h3 className="pipeline-header">Tiến độ dự án</h3>
        <div className="pipeline-steps">
          {statuses.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isActive = index === currentStatusIndex;
            const stepClass = `pipeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

            // Get checklist for this phase
            const phaseChecklist = PHASE_CHECKLISTS.find(phase => phase.phase === status);

            return (
              <div key={status} className={stepClass}>
                <div className="tooltip-wrapper">
                  <div className="pipeline-step-circle">
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  {phaseChecklist && (
                    <div className="tooltip-content">
                      <h4>{STATUS_LABELS[status]} Phase</h4>
                      <ul>
                        {phaseChecklist.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="pipeline-step-label">{STATUS_LABELS[status]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isNew && !getCustomerById(id!)) {
    return (
      <div>
        <div className="alert alert-error">
          Không tìm thấy khách hàng
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/customers')}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          {mode === 'new' ? 'Tạo mới khách hàng' : mode === 'edit' ? 'Chỉnh sửa khách hàng' : 'Chi tiết khách hàng'}
        </h1>
        <div className="flex-gap-10">
          {mode === 'view' && (
            <button className="btn btn-primary" onClick={() => setMode('edit')}>
              Chỉnh sửa
            </button>
          )}
          <button className="btn btn-outline" onClick={() => navigate('/customers')}>
            Quay lại
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      {renderPipeline()}

      <div className="card">
        <h2 className="card-header">Thông tin khách hàng</h2>

        {mode === 'view' ? (
          <div className="customer-detail-info">
            <div className="info-item">
              <div className="info-label">Tên khách hàng</div>
              <div className="info-value">{formData.name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Loại dịch vụ</div>
              <div className="info-value">{formData.serviceType}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Trạng thái</div>
              <div className="info-value">
                <StatusBadge status={formData.status as Status} />
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Miền</div>
              <div className="info-value">{formData.region}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Chi nhánh</div>
              <div className="info-value">{formData.branch}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Người xử lý</div>
              <div className="info-value">{formData.handler}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Ngày bắt đầu</div>
              <div className="info-value">
                {formData.startDate ? new Date(formData.startDate).toLocaleDateString('vi-VN') : ''}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Ngày kết thúc dự kiến</div>
              <div className="info-value">
                {formData.expectedEndDate ? new Date(formData.expectedEndDate).toLocaleDateString('vi-VN') : ''}
              </div>
            </div>
            <div className="info-item" style={{ gridColumn: '1 / -1' }}>
              <div className="info-label">Ghi chú</div>
              <div className="info-value">{formData.notes || 'Không có ghi chú'}</div>
            </div>
            {formData.cancelReason && (
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <div className="info-label">Lý do dừng triển khai</div>
                <div className="info-value" style={{ color: 'var(--error-color)' }}>
                  {formData.cancelReason}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label required">Tên khách hàng</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Loại dịch vụ</label>
                <select
                  name="serviceType"
                  className="form-select"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                >
                  <option value="Chi hộ">Chi hộ</option>
                  <option value="Thu hộ">Thu hộ</option>
                  <option value="Thu & Chi">Thu & Chi</option>
                </select>
                {errors.serviceType && <div className="form-error">{errors.serviceType}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Miền</label>
                <select
                  name="region"
                  className="form-select"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  <option value="Miền Nam">Miền Nam</option>
                  <option value="Miền Bắc">Miền Bắc</option>
                </select>
                {errors.region && <div className="form-error">{errors.region}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Chi nhánh</label>
                <select
                  name="branch"
                  className="form-select"
                  value={formData.branch}
                  onChange={handleInputChange}
                >
                  <option value="Hội Sở">Hội Sở</option>
                  <option value="Đô Thành">Đô Thành</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hoàn Kiếm">Hoàn Kiếm</option>
                </select>
                {errors.branch && <div className="form-error">{errors.branch}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Người xử lý</label>
                <select
                  name="handler"
                  className="form-select"
                  value={formData.handler}
                  onChange={handleInputChange}
                >
                  <option value="Hoàng Phương Nhi">Hoàng Phương Nhi</option>
                  <option value="Nguyễn Hữu Cường">Nguyễn Hữu Cường</option>
                </select>
                {errors.handler && <div className="form-error">{errors.handler}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Trạng thái</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={mode === 'new'}
                >
                  <option value="Initiation">Initiation</option>
                  <option value="Planning">Planning</option>
                  <option value="Execution">Execution</option>
                  <option value="MonitorNControl">Monitor & Control</option>
                  <option value="Closure">Closure</option>
                  <option value="Canceled">Canceled</option>
                </select>
                {mode === 'new' && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    Trạng thái mặc định là "Initiation" khi tạo mới
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label required">Ngày bắt đầu</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-input"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
                {errors.startDate && <div className="form-error">{errors.startDate}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">Ngày kết thúc dự kiến</label>
                <input
                  type="date"
                  name="expectedEndDate"
                  className="form-input"
                  value={formData.expectedEndDate}
                  onChange={handleInputChange}
                />
                {errors.expectedEndDate && <div className="form-error">{errors.expectedEndDate}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ghi chú</label>
              <textarea
                name="notes"
                className="form-textarea"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-gap-10" style={{ marginTop: '30px' }}>
              {mode === 'edit' && formData.status !== 'Canceled' && (
                <button
                  className="btn btn-danger"
                  onClick={() => setShowCancelModal(true)}
                >
                  Dừng triển khai
                </button>
              )}
              <button className="btn btn-primary" onClick={handleSubmit}>
                {mode === 'new' ? 'Tạo mới' : 'Xác nhận'}
              </button>
              {mode === 'edit' && (
                <button className="btn btn-outline" onClick={() => setMode('view')}>
                  Hủy
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-header">Dừng triển khai khách hàng</h2>
            <div className="form-group">
              <label className="form-label required">Lý do dừng triển khai</label>
              <textarea
                className="form-textarea"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Vui lòng nêu rõ lý do..."
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={handleCancelCustomer}>
                Xác nhận
              </button>
              <button className="btn btn-outline" onClick={() => setShowCancelModal(false)}>
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
