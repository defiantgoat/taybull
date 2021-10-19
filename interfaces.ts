export type Data = Array<Record<string, any>>;

export interface TbleProps {
  data: Data;
  columns: Record<string, any>;
  paginate?: boolean;
  resultsPerPage?: number;
  className?: string;
}

export interface TableProps {
  data: Array<Record<string, any>>;
  columns: Record<string, any>;
  onSort: (arg0: string, arg1: string) => void;
}

export interface State {
  rawData: Data;
  filteredData: Data;
  pageLookup: Record<number, number[]>;
  currentPage: number;
}

export interface Action {
  type: string;
  payload: any;
}
export type Reducer = (state: State, action: Action) => State;
