import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Card,
  Typography,
  Alert,
  Modal,
  Steps,
  Descriptions,
  Tooltip,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  StopOutlined,
  CheckOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCustomers } from '../contexts/CustomerContext';
import StatusBadge from '../components/StatusBadge';
import type { Customer, Status } from '../types';
import { PHASE_CHECKLISTS, STATUS_LABELS } from '../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCustomer, updateCustomer, getCustomerById } = useCustomers();
  const [form] = Form.useForm();

  const isNew = id === 'new';
  const isEdit = new URLSearchParams(window.location.search).get('mode') === 'edit';

  const [mode, setMode] = useState<'view' | 'edit' | 'new'>(
    isNew ? 'new' : isEdit ? 'edit' : 'view'
  );

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      const fetchedCustomer = getCustomerById(id);
      if (fetchedCustomer) {
        setCustomer(fetchedCustomer);
        form.setFieldsValue({
          ...fetchedCustomer,
          startDate: fetchedCustomer.startDate ? dayjs(fetchedCustomer.startDate) : undefined,
          expectedEndDate: fetchedCustomer.expectedEndDate
            ? dayjs(fetchedCustomer.expectedEndDate)
            : undefined,
        });
      } else {
        setErrorMessage('Không tìm thấy khách hàng');
      }
    }
  }, [id, isNew, getCustomerById, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSuccessMessage('');
        setErrorMessage('');

        const formattedValues = {
          ...values,
          startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : '',
          expectedEndDate: values.expectedEndDate
            ? values.expectedEndDate.format('YYYY-MM-DD')
            : '',
        };

        if (mode === 'new') {
          addCustomer(formattedValues);
          setSuccessMessage('Thêm mới khách hàng thành công');
          setTimeout(() => navigate('/customers'), 1500);
        } else if (mode === 'edit' && id) {
          updateCustomer(id, formattedValues);
          setSuccessMessage('Cập nhật khách hàng thành công');
          const updatedCustomer = getCustomerById(id);
          if (updatedCustomer) {
            setCustomer(updatedCustomer);
          }
          setTimeout(() => {
            setMode('view');
            setSuccessMessage('');
          }, 1500);
        }
      })
      .catch(() => {
        setErrorMessage('Vui lòng kiểm tra và điền đầy đủ thông tin');
      });
  };

  const handleCancelCustomer = () => {
    if (!cancelReason.trim()) {
      Modal.warning({
        title: 'Thiếu thông tin',
        content: 'Vui lòng nhập lý do dừng triển khai',
      });
      return;
    }

    if (id) {
      updateCustomer(id, {
        status: 'Canceled',
        cancelReason: cancelReason,
      });
      setShowCancelModal(false);
      setSuccessMessage('Cập nhật trạng thái khách hàng thành công');
      const updatedCustomer = getCustomerById(id);
      if (updatedCustomer) {
        setCustomer(updatedCustomer);
      }
      setTimeout(() => {
        setMode('view');
        setSuccessMessage('');
      }, 1500);
    }
  };

  const getStatusIndex = (status: Status): number => {
    const statuses: Status[] = [
      'Initiation',
      'Planning',
      'Execution',
      'MonitorNControl',
      'Closure',
    ];
    return statuses.indexOf(status);
  };

  const renderPipeline = () => {
    if (mode !== 'view' || !customer?.status || customer.status === 'Canceled') {
      return null;
    }

    const currentStatusIndex = getStatusIndex(customer.status);
    const statuses: Status[] = [
      'Initiation',
      'Planning',
      'Execution',
      'MonitorNControl',
      'Closure',
    ];

    const items = statuses.map((status, index) => {
      const phaseChecklist = PHASE_CHECKLISTS.find((phase) => phase.phase === status);
      const isCompleted = index < currentStatusIndex;
      const isCurrent = index === currentStatusIndex;

      return {
        title: STATUS_LABELS[status],
        status: (isCompleted ? 'finish' : isCurrent ? 'process' : 'wait') as 'wait' | 'process' | 'finish' | 'error',
        icon:
          phaseChecklist && isCurrent ? (
            <Tooltip
              title={
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    {STATUS_LABELS[status]} Phase
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {phaseChecklist.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              }
              overlayStyle={{ maxWidth: 400 }}
            >
              <div>{isCompleted ? <CheckOutlined /> : index + 1}</div>
            </Tooltip>
          ) : undefined,
      };
    });

    return (
      <Card style={{ marginBottom: 30 }}>
        <Title level={4} style={{ marginBottom: 24, color: '#2b6cae' }}>
          Tiến độ dự án
        </Title>
        <Steps current={currentStatusIndex} items={items} />
      </Card>
    );
  };

  if (!isNew && !customer && errorMessage) {
    return (
      <Space direction="vertical" size="middle">
        <Alert message="Lỗi" description={errorMessage} type="error" showIcon />
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate('/customers')}>
          Quay lại danh sách
        </Button>
      </Space>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0, color: '#2b6cae' }}>
          {mode === 'new'
            ? 'Tạo mới khách hàng'
            : mode === 'edit'
            ? 'Chỉnh sửa khách hàng'
            : 'Chi tiết khách hàng'}
        </Title>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/customers')}>
            Quay lại
          </Button>
          {mode === 'view' && (
            <Button type="primary" icon={<EditOutlined />} onClick={() => setMode('edit')}>
              Chỉnh sửa
            </Button>
          )}
        </Space>
      </div>

      {/* Success/Error Messages */}
      {successMessage && <Alert message={successMessage} type="success" showIcon closable />}
      {errorMessage && <Alert message={errorMessage} type="error" showIcon closable />}

      {/* Pipeline */}
      {renderPipeline()}

      {/* Customer Information */}
      <Card title="Thông tin khách hàng">
        {mode === 'view' ? (
          customer ? (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Tên khách hàng">{customer.name}</Descriptions.Item>
              <Descriptions.Item label="Loại dịch vụ">{customer.serviceType}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <StatusBadge status={customer.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Miền">{customer.region}</Descriptions.Item>
              <Descriptions.Item label="Chi nhánh">{customer.branch}</Descriptions.Item>
              <Descriptions.Item label="Người xử lý">{customer.handler}</Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {customer.startDate
                  ? dayjs(customer.startDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc dự kiến">
                {customer.expectedEndDate
                  ? dayjs(customer.expectedEndDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú" span={2}>
                {customer.notes || 'Không có ghi chú'}
              </Descriptions.Item>
              {customer.cancelReason && (
                <Descriptions.Item label="Lý do dừng triển khai" span={2}>
                  <Text type="danger">{customer.cancelReason}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          ) : (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <Text type="secondary">Đang tải thông tin khách hàng...</Text>
            </div>
          )
        ) : (
          <Form form={form} layout="vertical" initialValues={{ status: 'Initiation' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Form.Item
                label="Tên khách hàng"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>

              <Form.Item
                label="Loại dịch vụ"
                name="serviceType"
                rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
              >
                <Select
                  options={[
                    { value: 'Chi hộ', label: 'Chi hộ' },
                    { value: 'Thu hộ', label: 'Thu hộ' },
                    { value: 'Thu & Chi', label: 'Thu & Chi' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Miền"
                name="region"
                rules={[{ required: true, message: 'Vui lòng chọn miền' }]}
              >
                <Select
                  options={[
                    { value: 'Miền Nam', label: 'Miền Nam' },
                    { value: 'Miền Bắc', label: 'Miền Bắc' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Chi nhánh"
                name="branch"
                rules={[{ required: true, message: 'Vui lòng chọn chi nhánh' }]}
              >
                <Select
                  options={[
                    { value: 'Hội Sở', label: 'Hội Sở' },
                    { value: 'Đô Thành', label: 'Đô Thành' },
                    { value: 'Hà Nội', label: 'Hà Nội' },
                    { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Người xử lý"
                name="handler"
                rules={[{ required: true, message: 'Vui lòng chọn người xử lý' }]}
              >
                <Select
                  options={[
                    { value: 'Hoàng Phương Nhi', label: 'Hoàng Phương Nhi' },
                    { value: 'Nguyễn Hữu Cường', label: 'Nguyễn Hữu Cường' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Trạng thái" name="status">
                <Select
                  disabled={mode === 'new'}
                  options={[
                    { value: 'Initiation', label: 'Initiation' },
                    { value: 'Planning', label: 'Planning' },
                    { value: 'Execution', label: 'Execution' },
                    { value: 'MonitorNControl', label: 'Monitor & Control' },
                    { value: 'Closure', label: 'Closure' },
                    { value: 'Canceled', label: 'Canceled' },
                  ]}
                />
                {mode === 'new' && (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Trạng thái mặc định là "Initiation" khi tạo mới
                  </Text>
                )}
              </Form.Item>

              <Form.Item
                label="Ngày bắt đầu"
                name="startDate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item
                label="Ngày kết thúc dự kiến"
                name="expectedEndDate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc dự kiến' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </div>

            <Form.Item label="Ghi chú" name="notes">
              <TextArea rows={4} placeholder="Nhập ghi chú (không bắt buộc)" />
            </Form.Item>

            {/* Destructive Action - Separated */}
            {mode === 'edit' && customer?.status !== 'Canceled' && (
              <>
                <Divider />
                <div>
                  <Button
                    danger
                    icon={<StopOutlined />}
                    onClick={() => setShowCancelModal(true)}
                  >
                    Dừng triển khai
                  </Button>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                    Lưu ý: Hành động này sẽ đánh dấu khách hàng là đã hủy triển khai
                  </div>
                </div>
                <Divider />
              </>
            )}

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              {mode === 'edit' && (
                <Button icon={<CloseOutlined />} onClick={() => setMode('view')}>
                  Hủy
                </Button>
              )}
              {mode === 'new' && <div />}
              <Button
                type="primary"
                icon={mode === 'new' ? <PlusOutlined /> : <SaveOutlined />}
                onClick={handleSubmit}
              >
                {mode === 'new' ? 'Tạo mới' : 'Lưu thay đổi'}
              </Button>
            </div>
          </Form>
        )}
      </Card>

      {/* Cancel Modal */}
      <Modal
        title="Dừng triển khai khách hàng"
        open={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        footer={[
          <Button key="back" icon={<CloseOutlined />} onClick={() => setShowCancelModal(false)}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            icon={<CheckOutlined />}
            onClick={handleCancelCustomer}
          >
            Xác nhận dừng
          </Button>,
        ]}
      >
        <Form.Item
          label="Lý do dừng triển khai"
          required
          style={{ marginTop: 16, marginBottom: 0 }}
        >
          <TextArea
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Vui lòng nêu rõ lý do..."
          />
        </Form.Item>
      </Modal>
    </Space>
  );
};

export default CustomerDetail;
