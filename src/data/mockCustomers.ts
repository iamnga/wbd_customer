import type { Customer } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Thegioididong',
    serviceType: 'Thu & Chi',
    status: 'Execution',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Hoàng Phương Nhi',
    startDate: '2025-01-15',
    expectedEndDate: '2025-03-30',
    notes: 'Khách hàng ưu tiên cao, cần theo dõi sát sao',
    createdAt: '2025-01-15',
    updatedAt: '2025-02-10',
    cif: 'CIF0001234567',
    documentsLink: 'https://sharepoint.com/sites/projects/thegioididong',
    rmContact: {
      fullName: 'Nguyễn Thị Lan',
      title: 'Relationship Manager',
      email: 'lan.nguyen@bank.com',
      phone: '0987654321'
    },
    smContact: {
      fullName: 'Trần Văn Hùng',
      title: 'Sales Manager',
      email: 'hung.tran@bank.com',
      phone: '0987654322'
    },
    industry: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác',
    website: 'https://www.thegioididong.com',
    contact1: {
      fullName: 'Nguyễn Văn A',
      title: 'Giám đốc Tài chính',
      email: 'nguyenvana@thegioididong.com',
      phone: '0901234567'
    },
    contact2: {
      fullName: 'Trần Thị B',
      title: 'Trưởng phòng IT',
      email: 'tranthib@thegioididong.com',
      phone: '0902345678'
    },
    isTCG: true,
    hasCustomize: true,
    customizeDescription: 'Customize báo cáo chi tiết theo từng khu vực địa lý, tích hợp API riêng cho hệ thống ERP nội bộ, dashboard theo dõi real-time'
  },
  {
    id: '2',
    name: 'Viettel',
    serviceType: 'Chi hộ',
    status: 'Planning',
    region: 'Miền Bắc',
    branch: 'Hà Nội',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2025-02-01',
    expectedEndDate: '2025-04-15',
    notes: 'Doanh nghiệp lớn, cần chuẩn bị kỹ lưỡng',
    createdAt: '2025-02-01',
    updatedAt: '2025-02-05',
    cif: 'CIF0002345678',
    documentsLink: 'https://sharepoint.com/sites/projects/viettel',
    rmContact: {
      fullName: 'Phạm Minh Tuấn',
      title: 'Relationship Manager',
      email: 'tuan.pham@bank.com',
      phone: '0987654323'
    },
    smContact: {
      fullName: 'Lê Thị Hoa',
      title: 'Sales Manager',
      email: 'hoa.le@bank.com',
      phone: '0987654324'
    },
    industry: 'Thông tin và truyền thông',
    website: 'https://www.viettel.com.vn',
    contact1: {
      fullName: 'Lê Minh C',
      title: 'Phó Giám đốc Tài chính',
      email: 'leminhc@viettel.com.vn',
      phone: '0903456789'
    },
    contact2: {
      fullName: 'Phạm Thị D',
      title: 'Trưởng phòng Kế toán',
      email: 'phamthid@viettel.com.vn',
      phone: '0904567890'
    },
    isTCG: true,
    hasCustomize: false
  },
  {
    id: '3',
    name: 'Sabeco',
    serviceType: 'Thu hộ',
    status: 'MonitorNControl',
    region: 'Miền Nam',
    branch: 'Đô Thành',
    handler: 'Hoàng Phương Nhi',
    startDate: '2024-11-01',
    expectedEndDate: '2025-02-28',
    notes: 'Đang trong giai đoạn theo dõi và kiểm soát',
    createdAt: '2024-11-01',
    updatedAt: '2025-01-20',
    cif: 'CIF0003456789',
    documentsLink: 'https://sharepoint.com/sites/projects/sabeco',
    rmContact: {
      fullName: 'Đỗ Văn Nam',
      title: 'Relationship Manager',
      email: 'nam.do@bank.com',
      phone: '0987654325'
    },
    smContact: {
      fullName: 'Vũ Thị Mai',
      title: 'Sales Manager',
      email: 'mai.vu@bank.com',
      phone: '0987654326'
    },
    industry: 'Công nghiệp chế biến, chế tạo',
    website: 'https://www.sabeco.com.vn',
    contact1: {
      fullName: 'Hoàng Văn E',
      title: 'Giám đốc Điều hành',
      email: 'hoangvane@sabeco.com.vn',
      phone: '0905678901'
    },
    contact2: {
      fullName: 'Đỗ Thị F',
      title: 'Kế toán trưởng',
      email: 'dothif@sabeco.com.vn',
      phone: '0906789012'
    },
    isTCG: false,
    hasCustomize: true,
    customizeDescription: 'Báo cáo phân tích dòng tiền theo nhà máy, tích hợp với hệ thống SAP để đồng bộ dữ liệu tự động'
  },
  {
    id: '4',
    name: 'Shopee',
    serviceType: 'Thu & Chi',
    status: 'Initiation',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2025-02-20',
    expectedEndDate: '2025-05-30',
    notes: 'Khách hàng mới, đang thảo luận về phạm vi dự án',
    createdAt: '2025-02-20',
    updatedAt: '2025-02-20',
    cif: 'CIF0004567890',
    documentsLink: 'https://sharepoint.com/sites/projects/shopee',
    rmContact: {
      fullName: 'Hoàng Minh Đức',
      title: 'Relationship Manager',
      email: 'duc.hoang@bank.com',
      phone: '0987654327'
    },
    smContact: {
      fullName: 'Bùi Thị Thanh',
      title: 'Sales Manager',
      email: 'thanh.bui@bank.com',
      phone: '0987654328'
    },
    industry: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác',
    website: 'https://www.shopee.vn',
    contact1: {
      fullName: 'Vũ Minh G',
      title: 'Trưởng phòng Tài chính',
      email: 'vuminhg@shopee.vn',
      phone: '0907890123'
    },
    contact2: {
      fullName: 'Bùi Thị H',
      title: 'Chuyên viên IT',
      email: 'buithih@shopee.vn',
      phone: '0908901234'
    },
    isTCG: true,
    hasCustomize: true,
    customizeDescription: 'Module thanh toán đa kênh với webhook realtime, API tracking đơn hàng tự động, báo cáo phân tích seller'
  },
  {
    id: '5',
    name: 'Sendo',
    serviceType: 'Chi hộ',
    status: 'Execution',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Hoàng Phương Nhi',
    startDate: '2025-01-10',
    expectedEndDate: '2025-03-15',
    notes: 'Đang triển khai API và tích hợp hệ thống',
    createdAt: '2025-01-10',
    updatedAt: '2025-02-08',
    cif: 'CIF0005678901',
    documentsLink: 'https://sharepoint.com/sites/projects/sendo',
    rmContact: {
      fullName: 'Đặng Thị Phương',
      title: 'Relationship Manager',
      email: 'phuong.dang@bank.com',
      phone: '0987654329'
    },
    smContact: {
      fullName: 'Lý Văn Kiên',
      title: 'Sales Manager',
      email: 'kien.ly@bank.com',
      phone: '0987654330'
    },
    industry: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác',
    website: 'https://www.sendo.vn',
    contact1: {
      fullName: 'Đặng Văn I',
      title: 'Giám đốc Công nghệ',
      email: 'dangvani@sendo.vn',
      phone: '0909012345'
    },
    contact2: {
      fullName: 'Mai Thị K',
      title: 'Phó Giám đốc Tài chính',
      email: 'maithik@sendo.vn',
      phone: '0910123456'
    },
    isTCG: false,
    hasCustomize: false
  },
  {
    id: '6',
    name: 'Momo',
    serviceType: 'Thu & Chi',
    status: 'Planning',
    region: 'Miền Bắc',
    branch: 'Hoàn Kiếm',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2025-02-05',
    expectedEndDate: '2025-04-20',
    notes: 'Đang thu thập yêu cầu và lập kế hoạch',
    createdAt: '2025-02-05',
    updatedAt: '2025-02-12',
    cif: 'CIF0006789012',
    documentsLink: 'https://sharepoint.com/sites/projects/momo',
    rmContact: {
      fullName: 'Trần Thị Ngọc',
      title: 'Relationship Manager',
      email: 'ngoc.tran@bank.com',
      phone: '0987654331'
    },
    smContact: {
      fullName: 'Ngô Văn Đức',
      title: 'Sales Manager',
      email: 'duc.ngo@bank.com',
      phone: '0987654332'
    },
    industry: 'Hoạt động tài chính, ngân hàng và bảo hiểm',
    website: 'https://www.momo.vn',
    contact1: {
      fullName: 'Đinh Văn L',
      title: 'Giám đốc Vận hành',
      email: 'dinhvanl@momo.vn',
      phone: '0911234567'
    },
    contact2: {
      fullName: 'Lý Thị M',
      title: 'Trưởng phòng Thanh toán',
      email: 'lythim@momo.vn',
      phone: '0912345678'
    },
    isTCG: true,
    hasCustomize: true,
    customizeDescription: 'Hệ thống reconciliation tự động, API QR code động, dashboard phân tích giao dịch theo thời gian thực'
  },
  {
    id: '7',
    name: 'VNPTPay',
    serviceType: 'Thu hộ',
    status: 'Initiation',
    region: 'Miền Bắc',
    branch: 'Hà Nội',
    handler: 'Hoàng Phương Nhi',
    startDate: '2025-02-25',
    expectedEndDate: '2025-05-10',
    notes: 'Đang thảo luận hợp đồng và pháp lý',
    createdAt: '2025-02-25',
    updatedAt: '2025-02-25',
    cif: 'CIF0007890123',
    documentsLink: 'https://sharepoint.com/sites/projects/vnptpay',
    rmContact: {
      fullName: 'Võ Thị Thu',
      title: 'Relationship Manager',
      email: 'thu.vo@bank.com',
      phone: '0987654333'
    },
    smContact: {
      fullName: 'Phan Văn Long',
      title: 'Sales Manager',
      email: 'long.phan@bank.com',
      phone: '0987654334'
    },
    industry: 'Hoạt động tài chính, ngân hàng và bảo hiểm',
    website: 'https://www.vnptpay.vn',
    contact1: {
      fullName: 'Trịnh Văn N',
      title: 'Phó Tổng Giám đốc',
      email: 'trinhvann@vnptpay.vn',
      phone: '0913456789'
    },
    contact2: {
      fullName: 'Chu Thị O',
      title: 'Giám đốc Tài chính',
      email: 'chuthio@vnptpay.vn',
      phone: '0914567890'
    },
    isTCG: false,
    hasCustomize: false
  },
  {
    id: '8',
    name: 'FPT Telecom',
    serviceType: 'Chi hộ',
    status: 'Closure',
    region: 'Miền Bắc',
    branch: 'Hà Nội',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2024-10-01',
    expectedEndDate: '2025-01-31',
    notes: 'Dự án đã hoàn thành, đang bàn giao tài liệu',
    createdAt: '2024-10-01',
    updatedAt: '2025-01-31',
    cif: 'CIF0008901234',
    documentsLink: 'https://sharepoint.com/sites/projects/fpt-telecom',
    rmContact: {
      fullName: 'Lê Văn Hải',
      title: 'Relationship Manager',
      email: 'hai.le@bank.com',
      phone: '0987654335'
    },
    smContact: {
      fullName: 'Đinh Thị Hương',
      title: 'Sales Manager',
      email: 'huong.dinh@bank.com',
      phone: '0987654336'
    },
    industry: 'Thông tin và truyền thông',
    website: 'https://www.fpt.com.vn',
    contact1: {
      fullName: 'Dương Văn P',
      title: 'Giám đốc Kinh doanh',
      email: 'duongvanp@fpt.com.vn',
      phone: '0915678901'
    },
    contact2: {
      fullName: 'Tô Thị Q',
      title: 'Kế toán trưởng',
      email: 'tothiq@fpt.com.vn',
      phone: '0916789012'
    },
    isTCG: true,
    hasCustomize: true,
    customizeDescription: 'API tích hợp với hệ thống CRM, báo cáo tài chính tổng hợp theo chi nhánh, module phân quyền đa cấp'
  },
  {
    id: '9',
    name: 'Tiki',
    serviceType: 'Thu & Chi',
    status: 'Canceled',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Hoàng Phương Nhi',
    startDate: '2024-12-01',
    expectedEndDate: '2025-03-01',
    notes: 'Dự án đã dừng triển khai',
    cancelReason: 'Khách hàng thay đổi chiến lược kinh doanh, tạm hoãn dự án',
    createdAt: '2024-12-01',
    updatedAt: '2025-01-15',
    cif: 'CIF0009012345',
    documentsLink: 'https://sharepoint.com/sites/projects/tiki',
    rmContact: {
      fullName: 'Cao Văn Bình',
      title: 'Relationship Manager',
      email: 'binh.cao@bank.com',
      phone: '0987654337'
    },
    smContact: {
      fullName: 'Hồ Thị Linh',
      title: 'Sales Manager',
      email: 'linh.ho@bank.com',
      phone: '0987654338'
    },
    industry: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác',
    website: 'https://www.tiki.vn',
    contact1: {
      fullName: 'Hồ Văn R',
      title: 'Giám đốc Tài chính',
      email: 'hovanr@tiki.vn',
      phone: '0917890123'
    },
    contact2: {
      fullName: 'Cao Thị S',
      title: 'Trưởng phòng Kế toán',
      email: 'caothis@tiki.vn',
      phone: '0918901234'
    },
    isTCG: false,
    hasCustomize: false
  },
  {
    id: '10',
    name: 'VinCommerce',
    serviceType: 'Chi hộ',
    status: 'Execution',
    region: 'Miền Nam',
    branch: 'Đô Thành',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2025-01-20',
    expectedEndDate: '2025-04-10',
    notes: 'Đang test và tích hợp hệ thống',
    createdAt: '2025-01-20',
    updatedAt: '2025-02-15',
    cif: 'CIF0010123456',
    documentsLink: 'https://sharepoint.com/sites/projects/vincommerce',
    rmContact: {
      fullName: 'Mai Văn Tâm',
      title: 'Relationship Manager',
      email: 'tam.mai@bank.com',
      phone: '0987654339'
    },
    smContact: {
      fullName: 'Tô Thị Nhung',
      title: 'Sales Manager',
      email: 'nhung.to@bank.com',
      phone: '0987654340'
    },
    industry: 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác',
    website: 'https://www.vincommerce.com',
    contact1: {
      fullName: 'Phan Văn T',
      title: 'Giám đốc Hệ thống',
      email: 'phanvant@vincommerce.com',
      phone: '0919012345'
    },
    contact2: {
      fullName: 'Võ Thị U',
      title: 'Phó Giám đốc Tài chính',
      email: 'vothiu@vincommerce.com',
      phone: '0920123456'
    },
    isTCG: true,
    hasCustomize: true,
    customizeDescription: 'Hệ thống quản lý thanh toán cho hơn 2000 cửa hàng, API đồng bộ với Oracle ERP, dashboard tổng hợp theo khu vực và nhóm sản phẩm'
  },
  {
    id: '11',
    name: 'VNPT',
    serviceType: 'Thu hộ',
    status: 'MonitorNControl',
    region: 'Miền Bắc',
    branch: 'Hoàn Kiếm',
    handler: 'Hoàng Phương Nhi',
    startDate: '2024-11-15',
    expectedEndDate: '2025-02-20',
    notes: 'Đang theo dõi kết quả UAT',
    createdAt: '2024-11-15',
    updatedAt: '2025-01-25',
    cif: 'CIF0011234567',
    documentsLink: 'https://sharepoint.com/sites/projects/vnpt',
    rmContact: {
      fullName: 'Chu Văn Dũng',
      title: 'Relationship Manager',
      email: 'dung.chu@bank.com',
      phone: '0987654341'
    },
    smContact: {
      fullName: 'Dương Thị Vân',
      title: 'Sales Manager',
      email: 'van.duong@bank.com',
      phone: '0987654342'
    },
    industry: 'Thông tin và truyền thông',
    website: 'https://www.vnpt.com.vn',
    contact1: {
      fullName: 'Lương Văn V',
      title: 'Giám đốc Công nghệ',
      email: 'luongvanv@vnpt.com.vn',
      phone: '0921234567'
    },
    contact2: {
      fullName: 'Hà Thị W',
      title: 'Trưởng phòng Thanh toán',
      email: 'hathiw@vnpt.com.vn',
      phone: '0922345678'
    },
    isTCG: false,
    hasCustomize: true,
    customizeDescription: 'Module báo cáo phân tích theo tỉnh thành, webhook notification cho các giao dịch bất thường'
  },
  {
    id: '12',
    name: 'Grab Vietnam',
    serviceType: 'Thu & Chi',
    status: 'Planning',
    region: 'Miền Nam',
    branch: 'Hội Sở',
    handler: 'Nguyễn Hữu Cường',
    startDate: '2025-02-10',
    expectedEndDate: '2025-05-05',
    notes: 'Đang lập kế hoạch quản lý dự án',
    createdAt: '2025-02-10',
    updatedAt: '2025-02-18',
    cif: 'CIF0012345678',
    documentsLink: 'https://sharepoint.com/sites/projects/grab',
    rmContact: {
      fullName: 'Lâm Văn Phúc',
      title: 'Relationship Manager',
      email: 'phuc.lam@bank.com',
      phone: '0987654343'
    },
    smContact: {
      fullName: 'Huỳnh Thị An',
      title: 'Sales Manager',
      email: 'an.huynh@bank.com',
      phone: '0987654344'
    },
    industry: 'Vận tải, kho bãi',
    website: 'https://www.grab.com/vn',
    contact1: {
      fullName: 'Huỳnh Văn X',
      title: 'Giám đốc Vận hành',
      email: 'huynhvanx@grab.com',
      phone: '0923456789'
    },
    contact2: {
      fullName: 'Lâm Thị Y',
      title: 'Giám đốc Tài chính',
      email: 'lamthiy@grab.com',
      phone: '0924567890'
    },
    isTCG: true,
    hasCustomize: false
  }
];
