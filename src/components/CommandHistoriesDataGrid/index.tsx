import {
  DataGrid,
  GridColumns,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridSortModel,
  GridToolbar
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { KeyedMutator } from 'swr/dist/types';
import { QueryOptions } from '../../types/dataGrid';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import JsonDataGridCellExpand from '../JsonDataGridCellExpand';

interface CommandHistoriesDataGridProps {
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  commandHistories: any;
  commandHistoriesMeta: any;
  isCommandHistoriesLoading: boolean;
  mutateCommandHistories: KeyedMutator<any>;
}

const CommandHistoriesDataGrid = ({
                                    queryOptions,
                                    setQueryOptions,
                                    commandHistories,
                                    commandHistoriesMeta,
                                    isCommandHistoriesLoading,
                                    mutateCommandHistories
                                  }: CommandHistoriesDataGridProps) => {
  const [totalRowCount, setTotalRowCount] = useState(0);

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      commandHistoriesMeta?.total !== undefined ? commandHistoriesMeta?.total : prevTotalRowCount,
    );
  }, [commandHistoriesMeta?.total]);

  const relations = ['command'];

  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand value={params.value || ''} width={params.colDef.computedWidth}/>
    );
  }

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    const sortModelFieldMapper = (sortModel: GridSortModel) => sortModel.map(sortField => {
      return relations.includes(sortField.field)
        ? ({ ...sortField, field: `${sortField.field}.name` })
        : sortField;
    });

    setQueryOptions({ ...queryOptions, sortModel: sortModelFieldMapper(sortModel) });
  }, [relations, queryOptions]);

  const handleFilterModelChange = useCallback((filterModel: GridFilterModel) => {
    const filterModelItemMapper = (items: GridFilterItem[]) => items.map(item => {
      return relations.includes(item.columnField)
        ? ({ ...item, columnField: `${item.columnField}.name` })
        : item;
    });

    setQueryOptions({
      ...queryOptions,
      filterModel: { ...filterModel, items: filterModelItemMapper(filterModel.items) }
    });
  }, [relations, queryOptions]);

  const handlePageChange = useCallback((page: number) => {
    setQueryOptions({ ...queryOptions, page: page });
  }, [queryOptions]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setQueryOptions({ ...queryOptions, pageSize: pageSize });
  }, [queryOptions]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', hide: true, },
    {
      field: 'payload', type: 'string', headerName: 'Payload', sortable: false, flex: 0.4,
      renderCell: renderCellExpand,
    },
    {
      field: 'command', type: 'string', headerName: 'Command', flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {params.value.name}
        </>
      ),
    },
    {
      field: 'respondedAt', type: 'dateTime', headerName: 'Responded at', filterable: false, flex: 0.2,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'createdAt', type: 'dateTime', headerName: 'Timestamp', filterable: false, flex: 0.2,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ], []);

  return (
    <>
      <DataGrid
        autoHeight
        keepNonExistentRowsSelected
        loading={isCommandHistoriesLoading}
        columns={columns}
        rows={(commandHistories ?? []) as GridRowsProp}
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
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
    </>
  );
};

export default CommandHistoriesDataGrid;
