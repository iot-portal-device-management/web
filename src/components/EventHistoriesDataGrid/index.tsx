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
import { getDeviceEventLabel } from '../../utils/deviceEvent';

interface EventHistoriesDataGridProps {
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  eventHistories: any;
  eventHistoriesMeta: any;
  isEventHistoriesLoading: boolean;
  mutateEventHistories: KeyedMutator<any>;
}

const EventHistoriesDataGrid = ({
                                  queryOptions,
                                  setQueryOptions,
                                  eventHistories,
                                  eventHistoriesMeta,
                                  isEventHistoriesLoading,
                                  mutateEventHistories
                                }: EventHistoriesDataGridProps) => {
  const [totalRowCount, setTotalRowCount] = useState(0);

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      eventHistoriesMeta?.total !== undefined ? eventHistoriesMeta?.total : prevTotalRowCount,
    );
  }, [eventHistoriesMeta?.total]);

  const relations = ['event'];

  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand header="Raw data" width={params.colDef.computedWidth} value={params.value || ''}/>
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
      field: 'rawData', type: 'string', headerName: 'Raw data', sortable: false, flex: 0.7,
      renderCell: renderCellExpand,
    },
    {
      field: 'event', type: 'string', headerName: 'Event', flex: 0.1, align: 'right',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceEventLabel(params.value.name)}
        </>
      ),
    },
    {
      field: 'createdAt', type: 'dateTime', headerName: 'Created at', filterable: false, flex: 0.2,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ], []);

  return (
    <>
      <DataGrid
        autoHeight
        keepNonExistentRowsSelected
        loading={isEventHistoriesLoading}
        columns={columns}
        rows={(eventHistories ?? []) as GridRowsProp}
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

export default EventHistoriesDataGrid;
