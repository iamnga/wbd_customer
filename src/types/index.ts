export type ServiceType = 'Chi hộ' | 'Thu hộ' | 'Thu & Chi';

export type Status =
  | 'Initiation'
  | 'Planning'
  | 'Execution'
  | 'MonitorNControl'
  | 'Closure'
  | 'Canceled';

export type Region = 'Miền Nam' | 'Miền Bắc';

export type Branch = 'Hội Sở' | 'Đô Thành' | 'Hà Nội' | 'Hoàn Kiếm';

export type Handler = 'Hoàng Phương Nhi' | 'Nguyễn Hữu Cường';

export type Industry =
  | 'Nông nghiệp, lâm nghiệp và thủy sản'
  | 'Khai khoáng'
  | 'Công nghiệp chế biến, chế tạo'
  | 'Sản xuất và phân phối điện, khí đốt, hơi nước và điều hòa không khí'
  | 'Cung cấp nước; hoạt động quản lý và xử lý rác thải, nước thải'
  | 'Xây dựng'
  | 'Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác'
  | 'Vận tải, kho bãi'
  | 'Dịch vụ lưu trú và ăn uống'
  | 'Thông tin và truyền thông'
  | 'Hoạt động tài chính, ngân hàng và bảo hiểm'
  | 'Hoạt động kinh doanh bất động sản'
  | 'Hoạt động chuyên môn, khoa học và công nghệ'
  | 'Hoạt động hành chính và dịch vụ hỗ trợ'
  | 'Hoạt động của Đảng, tổ chức chính trị – xã hội, quản lý nhà nước, an ninh quốc phòng; bảo đảm xã hội bắt buộc'
  | 'Giáo dục và đào tạo'
  | 'Y tế và hoạt động trợ giúp xã hội'
  | 'Nghệ thuật, vui chơi và giải trí'
  | 'Hoạt động dịch vụ khác'
  | 'Hoạt động của hộ gia đình với tư cách người sử dụng lao động; sản xuất sản phẩm tự tiêu dùng của hộ gia đình'
  | 'Hoạt động của các tổ chức và cơ quan quốc tế';

export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  serviceType: ServiceType;
  status: Status;
  region: Region;
  branch: Branch;
  handler: Handler;
  startDate: string;
  expectedEndDate: string;
  notes: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  // New fields
  cif?: string;
  documentsLink?: string;
  rmEmail?: string;
  smEmail?: string;
  industry?: Industry;
  website?: string;
  contact1?: ContactInfo;
  contact2?: ContactInfo;
}

export interface PhaseChecklist {
  phase: Status;
  items: string[];
}

export const PHASE_CHECKLISTS: PhaseChecklist[] = [
  {
    phase: 'Initiation',
    items: [
      'Đề xuất hợp tác',
      'Project Scope',
      'Contract & Legal',
      'NDA',
      'Virtual Account Contract'
    ]
  },
  {
    phase: 'Planning',
    items: [
      'Requirements gathering',
      'Technical spec',
      'Project Management Plan',
      'BRD'
    ]
  },
  {
    phase: 'Execution',
    items: [
      'Connection Setup',
      'Testing',
      'System Integration',
      'API Development',
      'UAT'
    ]
  },
  {
    phase: 'MonitorNControl',
    items: [
      'SIT/UAT Results',
      'Project Updates'
    ]
  },
  {
    phase: 'Closure',
    items: [
      'Acceptance Document',
      'Golive Checklist',
      'User Guideline'
    ]
  }
];

export const STATUS_LABELS: Record<Status, string> = {
  Initiation: 'Initiation',
  Planning: 'Planning',
  Execution: 'Execution',
  MonitorNControl: 'Monitor & Control',
  Closure: 'Closure',
  Canceled: 'Canceled'
};
