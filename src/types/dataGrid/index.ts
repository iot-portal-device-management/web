import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

export interface QueryOptions {
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
  page: number;
  pageSize: number;
}
