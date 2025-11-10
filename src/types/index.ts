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
