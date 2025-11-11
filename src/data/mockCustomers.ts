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
    rmEmail: 'rm.thegioididong@example.com',
    smEmail: 'sm.thegioididong@example.com',
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
    }
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
    rmEmail: 'rm.viettel@example.com',
    smEmail: 'sm.viettel@example.com',
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
    }
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
    rmEmail: 'rm.sabeco@example.com',
    smEmail: 'sm.sabeco@example.com',
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
    }
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
    rmEmail: 'rm.shopee@example.com',
    smEmail: 'sm.shopee@example.com',
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
    }
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
    rmEmail: 'rm.sendo@example.com',
    smEmail: 'sm.sendo@example.com',
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
    }
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
    rmEmail: 'rm.momo@example.com',
    smEmail: 'sm.momo@example.com',
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
    }
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
    rmEmail: 'rm.vnptpay@example.com',
    smEmail: 'sm.vnptpay@example.com',
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
    }
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
    rmEmail: 'rm.fpttelecom@example.com',
    smEmail: 'sm.fpttelecom@example.com',
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
    }
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
    rmEmail: 'rm.tiki@example.com',
    smEmail: 'sm.tiki@example.com',
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
    }
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
    rmEmail: 'rm.vincommerce@example.com',
    smEmail: 'sm.vincommerce@example.com',
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
    }
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
    rmEmail: 'rm.vnpt@example.com',
    smEmail: 'sm.vnpt@example.com',
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
    }
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
    rmEmail: 'rm.grab@example.com',
    smEmail: 'sm.grab@example.com',
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
    }
  }
];
