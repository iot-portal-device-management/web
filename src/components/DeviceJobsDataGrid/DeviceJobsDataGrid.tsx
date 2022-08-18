import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridFilterModel,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
  GridRowsProp,
  GridSelectionModel,
  GridSortModel,
  GridToolbar
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { QueryOptions } from '../../types/dataGrid';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { useDeviceJobCRUD } from '../../hooks/deviceJob/useDeviceJobCRUD';
import DeleteDeviceJobAlertDialog from '../DeleteDeviceJobAlertDialog';
import { getDeviceJobStatusLabel } from '../../utils/deviceJobStatus';

interface DeviceJobsDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  deviceJobs: any;
  deviceJobsMeta: any;
  isDeviceJobsLoading: boolean;
  mutateDeviceJobs: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const DeviceJobsDataGrid = ({
                              selectionModel,
                              setSelectionModel,
                              queryOptions,
                              setQueryOptions,
                              deviceJobs,
                              deviceJobsMeta,
                              isDeviceJobsLoading,
                              mutateDeviceJobs,
                              hideActionsColumn = undefined
                            }: DeviceJobsDataGridProps) => {
  const router = useRouter();

  const [totalRowCount, setTotalRowCount] = useState(0);
  const [deviceJob, setDeviceJob] = useState<GridRowModel>(null);
  const [openDeleteDeviceJobAlertDialog, setOpenDeleteDeviceJobAlertDialog] = useState(false);

  const { deleteDeviceJobs } = useDeviceJobCRUD();

  useEffect(() => {
    setTotalRowCount((prevTotalRowCount) =>
      deviceJobsMeta?.total !== undefined ? deviceJobsMeta?.total : prevTotalRowCount,
    );
  }, [deviceJobsMeta?.total]);

  const relations = ['deviceGroup', 'savedDeviceCommand', 'deviceJobStatus'];

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

  const handleSelectionModelChange = useCallback((selectionModel: GridSelectionModel) => {
    setSelectionModel(selectionModel);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setQueryOptions({ ...queryOptions, page: page });
  }, [queryOptions]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setQueryOptions({ ...queryOptions, pageSize: pageSize });
  }, [queryOptions]);

  const confirmDeleteDeviceJob = useCallback((row: GridRowModel) =>
    () => {
      setDeviceJob(row);
      setOpenDeleteDeviceJobAlertDialog(true);
    }, []);

  const deleteDeviceJob = useCallback(() => {
    deleteDeviceJobs([deviceJob?.id], false, mutateDeviceJobs);
    setOpenDeleteDeviceJobAlertDialog(false);
    setDeviceJob(null);
  }, [deviceJob?.id, mutateDeviceJobs]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Device job ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Device job name', flex: 0.2, },
    {
      field: 'deviceGroup', type: 'string', headerName: 'Device group', flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {params.value.name}
        </>
      ),
    },
    {
      field: 'savedDeviceCommand', type: 'string', headerName: 'Saved device command', flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {params.value.name}
        </>
      ),
    },
    {
      field: 'deviceJobStatus', type: 'string', headerName: 'Status', flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceJobStatusLabel(params.value.name)}
        </>
      ),
    },
    {
      field: 'startedAt', type: 'dateTime', headerName: 'Started at', flex: 0.2, filterable: false,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'completedAt', type: 'dateTime', headerName: 'Completed at', flex: 0.2, filterable: false,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'failedAt', type: 'dateTime', headerName: 'Failed at', flex: 0.2, filterable: false,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/device/jobs/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          onClick={confirmDeleteDeviceJob(params.row)}
        />
      ]
    }
  ], [hideActionsColumn]);

  return (
    <>
      <DataGrid
        autoHeight
        checkboxSelection
        keepNonExistentRowsSelected
        loading={isDeviceJobsLoading}
        columns={columns}
        rows={(deviceJobs ?? []) as GridRowsProp}
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
        onSelectionModelChange={handleSelectionModelChange}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
      <DeleteDeviceJobAlertDialog
        deviceJob={deviceJob}
        open={openDeleteDeviceJobAlertDialog}
        handleClose={() => setOpenDeleteDeviceJobAlertDialog(false)}
        handleConfirm={deleteDeviceJob}
      />
    </>
  );
};

export default DeviceJobsDataGrid;
