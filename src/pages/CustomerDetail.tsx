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
        icon: phaseChecklist ? (
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
            <div style={{ cursor: 'help' }}>
              {isCompleted ? <CheckOutlined /> : index + 1}
            </div>
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
      <Title level={2} style={{ margin: 0, color: '#2b6cae' }}>
        {mode === 'new'
          ? 'Tạo mới khách hàng'
          : mode === 'edit'
          ? 'Chỉnh sửa khách hàng'
          : 'Chi tiết khách hàng'}
      </Title>

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
              <Descriptions.Item label="Số CIF">
                {customer.cif || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngành nghề kinh doanh">
                {customer.industry || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                {customer.website ? (
                  <a href={customer.website} target="_blank" rel="noopener noreferrer">
                    {customer.website}
                  </a>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Link tài liệu liên quan" span={2}>
                {customer.documentsLink ? (
                  <a href={customer.documentsLink} target="_blank" rel="noopener noreferrer">
                    Thư mục tài liệu
                  </a>
                ) : '-'}
              </Descriptions.Item>
              {(customer.rmContact?.fullName || customer.rmContact?.title || customer.rmContact?.email || customer.rmContact?.phone) && (
                <>
                  <Descriptions.Item label="RM - Họ tên">
                    {customer.rmContact?.fullName || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="RM - Chức danh">
                    {customer.rmContact?.title || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="RM - Email">
                    {customer.rmContact?.email ? (
                      <a href={`mailto:${customer.rmContact.email}`}>{customer.rmContact.email}</a>
                    ) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="RM - Số điện thoại">
                    {customer.rmContact?.phone || '-'}
                  </Descriptions.Item>
                </>
              )}
              {(customer.smContact?.fullName || customer.smContact?.title || customer.smContact?.email || customer.smContact?.phone) && (
                <>
                  <Descriptions.Item label="SM - Họ tên">
                    {customer.smContact?.fullName || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="SM - Chức danh">
                    {customer.smContact?.title || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="SM - Email">
                    {customer.smContact?.email ? (
                      <a href={`mailto:${customer.smContact.email}`}>{customer.smContact.email}</a>
                    ) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="SM - Số điện thoại">
                    {customer.smContact?.phone || '-'}
                  </Descriptions.Item>
                </>
              )}
              {(customer.contact1?.fullName || customer.contact1?.title || customer.contact1?.email || customer.contact1?.phone) && (
                <>
                  <Descriptions.Item label="Liên hệ 1 - Họ tên">
                    {customer.contact1?.fullName || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 1 - Chức danh">
                    {customer.contact1?.title || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 1 - Email">
                    {customer.contact1?.email ? (
                      <a href={`mailto:${customer.contact1.email}`}>{customer.contact1.email}</a>
                    ) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 1 - Số điện thoại">
                    {customer.contact1?.phone || '-'}
                  </Descriptions.Item>
                </>
              )}
              {(customer.contact2?.fullName || customer.contact2?.title || customer.contact2?.email || customer.contact2?.phone) && (
                <>
                  <Descriptions.Item label="Liên hệ 2 - Họ tên">
                    {customer.contact2?.fullName || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 2 - Chức danh">
                    {customer.contact2?.title || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 2 - Email">
                    {customer.contact2?.email ? (
                      <a href={`mailto:${customer.contact2.email}`}>{customer.contact2.email}</a>
                    ) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ 2 - Số điện thoại">
                    {customer.contact2?.phone || '-'}
                  </Descriptions.Item>
                </>
              )}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 16px' }}>
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

              {mode !== 'new' && (
                <Form.Item label="Trạng thái" name="status">
                  <Select
                    options={[
                      { value: 'Initiation', label: 'Initiation' },
                      { value: 'Planning', label: 'Planning' },
                      { value: 'Execution', label: 'Execution' },
                      { value: 'MonitorNControl', label: 'Monitor & Control' },
                      { value: 'Closure', label: 'Closure' },
                      { value: 'Canceled', label: 'Canceled' },
                    ]}
                  />
                </Form.Item>
              )}

              <Form.Item label="Ngày bắt đầu" name="startDate">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item label="Ngày kết thúc dự kiến" name="expectedEndDate">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item label="Số CIF" name="cif">
                <Input placeholder="Nhập số CIF khách hàng" />
              </Form.Item>

              <Form.Item label="Ngành nghề kinh doanh" name="industry" style={{ gridColumn: 'span 2' }}>
                <Select
                  showSearch
                  placeholder="Chọn ngành nghề"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { value: 'Nông nghiệp, lâm nghiệp và thủy sản', label: 'Nông nghiệp, lâm nghiệp và thủy sản' },
                    { value: 'Khai khoáng', label: 'Khai khoáng' },
                    { value: 'Công nghiệp chế biến, chế tạo', label: 'Công nghiệp chế biến, chế tạo' },
                    { value: 'Sản xuất và phân phối điện, khí đốt, hơi nước và điều hòa không khí', label: 'Sản xuất và phân phối điện, khí đốt, hơi nước và điều hòa không khí' },
                    { value: 'Cung cấp nước; hoạt động quản lý và xử lý rác thải, nước thải', label: 'Cung cấp nước; hoạt động quản lý và xử lý rác thải, nước thải' },
                    { value: 'Xây dựng', label: 'Xây dựng' },
                    { value: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác', label: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác' },
                    { value: 'Vận tải, kho bãi', label: 'Vận tải, kho bãi' },
                    { value: 'Dịch vụ lưu trú và ăn uống', label: 'Dịch vụ lưu trú và ăn uống' },
                    { value: 'Thông tin và truyền thông', label: 'Thông tin và truyền thông' },
                    { value: 'Hoạt động tài chính, ngân hàng và bảo hiểm', label: 'Hoạt động tài chính, ngân hàng và bảo hiểm' },
                    { value: 'Hoạt động kinh doanh bất động sản', label: 'Hoạt động kinh doanh bất động sản' },
                    { value: 'Hoạt động chuyên môn, khoa học và công nghệ', label: 'Hoạt động chuyên môn, khoa học và công nghệ' },
                    { value: 'Hoạt động hành chính và dịch vụ hỗ trợ', label: 'Hoạt động hành chính và dịch vụ hỗ trợ' },
                    { value: 'Hoạt động của Đảng, tổ chức chính trị – xã hội, quản lý nhà nước, an ninh quốc phòng; bảo đảm xã hội bắt buộc', label: 'Hoạt động của Đảng, tổ chức chính trị – xã hội, quản lý nhà nước, an ninh quốc phòng; bảo đảm xã hội bắt buộc' },
                    { value: 'Giáo dục và đào tạo', label: 'Giáo dục và đào tạo' },
                    { value: 'Y tế và hoạt động trợ giúp xã hội', label: 'Y tế và hoạt động trợ giúp xã hội' },
                    { value: 'Nghệ thuật, vui chơi và giải trí', label: 'Nghệ thuật, vui chơi và giải trí' },
                    { value: 'Hoạt động dịch vụ khác', label: 'Hoạt động dịch vụ khác' },
                    { value: 'Hoạt động của hộ gia đình với tư cách người sử dụng lao động; sản xuất sản phẩm tự tiêu dùng của hộ gia đình', label: 'Hoạt động của hộ gia đình với tư cách người sử dụng lao động; sản xuất sản phẩm tự tiêu dùng của hộ gia đình' },
                    { value: 'Hoạt động của các tổ chức và cơ quan quốc tế', label: 'Hoạt động của các tổ chức và cơ quan quốc tế' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input placeholder="https://example.com" />
              </Form.Item>

              <Form.Item label="Link tài liệu liên quan" name="documentsLink">
                <Input placeholder="https://sharepoint.com/..." />
              </Form.Item>
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16, color: '#2b6cae' }}>
              Thông tin RM quản lý
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 16px' }}>
              <Form.Item label="Họ tên" name={['rmContact', 'fullName']}>
                <Input placeholder="Nhập họ tên RM" />
              </Form.Item>

              <Form.Item label="Chức danh" name={['rmContact', 'title']}>
                <Input placeholder="Nhập chức danh" />
              </Form.Item>

              <Form.Item label="Email" name={['rmContact', 'email']}>
                <Input type="email" placeholder="rm@example.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name={['rmContact', 'phone']}>
                <Input placeholder="0xxx xxx xxx" />
              </Form.Item>
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16, color: '#2b6cae' }}>
              Thông tin SM quản lý
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 16px' }}>
              <Form.Item label="Họ tên" name={['smContact', 'fullName']}>
                <Input placeholder="Nhập họ tên SM" />
              </Form.Item>

              <Form.Item label="Chức danh" name={['smContact', 'title']}>
                <Input placeholder="Nhập chức danh" />
              </Form.Item>

              <Form.Item label="Email" name={['smContact', 'email']}>
                <Input type="email" placeholder="sm@example.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name={['smContact', 'phone']}>
                <Input placeholder="0xxx xxx xxx" />
              </Form.Item>
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16, color: '#2b6cae' }}>
              Liên hệ khách hàng 1
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 16px' }}>
              <Form.Item label="Họ tên" name={['contact1', 'fullName']}>
                <Input placeholder="Nhập họ tên" />
              </Form.Item>

              <Form.Item label="Chức danh" name={['contact1', 'title']}>
                <Input placeholder="Nhập chức danh" />
              </Form.Item>

              <Form.Item label="Email" name={['contact1', 'email']}>
                <Input type="email" placeholder="contact1@example.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name={['contact1', 'phone']}>
                <Input placeholder="0xxx xxx xxx" />
              </Form.Item>
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16, color: '#2b6cae' }}>
              Liên hệ khách hàng 2
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 16px' }}>
              <Form.Item label="Họ tên" name={['contact2', 'fullName']}>
                <Input placeholder="Nhập họ tên" />
              </Form.Item>

              <Form.Item label="Chức danh" name={['contact2', 'title']}>
                <Input placeholder="Nhập chức danh" />
              </Form.Item>

              <Form.Item label="Email" name={['contact2', 'email']}>
                <Input type="email" placeholder="contact2@example.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name={['contact2', 'phone']}>
                <Input placeholder="0xxx xxx xxx" />
              </Form.Item>
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16, color: '#2b6cae' }}>
              Ghi chú
            </Title>
            <Form.Item name="notes">
              <TextArea rows={4} placeholder="Nhập ghi chú (không bắt buộc)" />
            </Form.Item>
          </Form>
        )}
      </Card>

      {/* Footer Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        borderTop: '1px solid #f0f0f0'
      }}>
        <Button size="large" icon={<ArrowLeftOutlined />} onClick={() => navigate('/customers')}>
          Quay lại
        </Button>

        <Space size="middle">
          {mode === 'view' && (
            <Button type="primary" size="large" icon={<EditOutlined />} onClick={() => setMode('edit')}>
              Chỉnh sửa
            </Button>
          )}

          {mode === 'edit' && customer?.status !== 'Canceled' && (
            <Button
              danger
              size="large"
              icon={<StopOutlined />}
              onClick={() => setShowCancelModal(true)}
            >
              Dừng triển khai
            </Button>
          )}

          {(mode === 'edit' || mode === 'new') && (
            <Button
              type="primary"
              size="large"
              icon={mode === 'new' ? <PlusOutlined /> : <SaveOutlined />}
              onClick={handleSubmit}
            >
              {mode === 'new' ? 'Tạo mới' : 'Lưu thay đổi'}
            </Button>
          )}
        </Space>
      </div>

      {/* Cancel Modal */}
      <Modal
        title="Dừng triển khai khách hàng"
        open={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        footer={[
          <Button
            key="back"
            size="large"
            icon={<CloseOutlined />}
            onClick={() => setShowCancelModal(false)}
          >
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            size="large"
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
