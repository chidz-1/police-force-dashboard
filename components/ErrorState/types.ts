export interface ErrorPageProps {
  error: unknown;
  retry: () => void;
}

export interface ErrorStateProps {
  title: string;
  description?: string;
  retry?: () => void;
  icon?: React.ReactNode;
  className?: string;
}
