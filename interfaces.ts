export type Data = Array<Record<string, any>>;

export type SortDirection = "ASC" | "DESC" | "NONE"

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
  range: number[];
  sort: [string, SortDirection];
  dispatch: any;
}

export interface State {
  rawData: Data;
  filteredData: Data;
  pageLookup: Record<number, number[]>;
  currentPage: number;
  currentRange: number[];
  sort: [string, SortDirection]
}

export interface Action {
  type: string;
  payload: any;
}
export type Reducer = (state: State, action: Action) => State;
