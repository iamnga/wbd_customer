import type { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusClass = (status: Status): string => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  const getStatusLabel = (status: Status): string => {
    const labels: Record<Status, string> = {
      Initiation: 'Initiation',
      Planning: 'Planning',
      Execution: 'Execution',
      MonitorNControl: 'Monitor & Control',
      Closure: 'Closure',
      Canceled: 'Canceled'
    };
    return labels[status];
  };

  return (
    <span className={getStatusClass(status)}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
