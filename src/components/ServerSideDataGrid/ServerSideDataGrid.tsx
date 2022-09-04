import {
  DataGrid,
  DataGridProps,
  GridFilterModel,
  GridRowsProp,
  GridSelectionModel,
  GridSortModel,
  GridToolbar
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { QueryOptions } from '../../types/dataGrid';

interface ServerSideDataGridProps extends DataGridProps {
  setSelectionModel?: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  meta: any;
}

const ServerSideDataGrid = ({
                              selectionModel,
                              setSelectionModel,
                              queryOptions,
                              setQueryOptions,
                              columns,
                              rows,
                              meta,
                              loading,
                              ...rest
                            }: ServerSideDataGridProps) => {
  const [totalRowCount, setTotalRowCount] = useState(0);

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      meta?.total !== undefined ? meta?.total : prevTotalRowCount,
    );
  }, [meta?.total]);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setQueryOptions({ ...queryOptions, sortModel: sortModel });
  }, [queryOptions]);

  const handleFilterModelChange = useCallback((filterModel: GridFilterModel) => {
    setQueryOptions({ ...queryOptions, filterModel: filterModel });
  }, [queryOptions]);

  const handlePageChange = useCallback((page: number) => {
    setQueryOptions({ ...queryOptions, page: page });
  }, [queryOptions]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setQueryOptions({ ...queryOptions, pageSize: pageSize });
  }, [queryOptions]);

  return (
    <DataGrid
      autoHeight
      {...(selectionModel && setSelectionModel ? { checkboxSelection: true, keepNonExistentRowsSelected: true } : {})}
      loading={loading}
      columns={columns}
      rows={(rows ?? []) as GridRowsProp}
      rowCount={totalRowCount}
      sortingMode="server"
      onSortModelChange={handleSortModelChange}
      filterMode="server"
      onFilterModelChange={handleFilterModelChange}
      rowsPerPageOptions={[25, 50, 100]}
      pagination
      paginationMode="server"
      page={queryOptions.page}
      pageSize={queryOptions.pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      selectionModel={selectionModel}
      onSelectionModelChange={setSelectionModel}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 }
        }
      }}
      {...rest}
    />
  );
};

export default ServerSideDataGrid;
