export interface TbleProps {
  data: Array<Record<string, any>>;
  columns: Record<string, any>;
  paginate?: boolean;
  resultsPerPage?: number;
}
