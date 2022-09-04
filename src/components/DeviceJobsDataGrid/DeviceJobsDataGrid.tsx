import {
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
  GridSelectionModel,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { QueryOptions } from '../../types/dataGrid';
import { useDeviceJobCRUD } from '../../hooks/deviceJob/useDeviceJobCRUD';
import DeleteDeviceJobAlertDialog from '../DeleteDeviceJobAlertDialog';
import { getDeviceJobStatusLabel } from '../../utils/deviceJobStatus';
import ServerSideDataGrid from '../ServerSideDataGrid';

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

  const [deviceJob, setDeviceJob] = useState<GridRowModel>(null);
  const [openDeleteDeviceJobAlertDialog, setOpenDeleteDeviceJobAlertDialog] = useState(false);

  const { deleteDeviceJobs } = useDeviceJobCRUD();

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
      field: 'deviceGroup.name', type: 'string', headerName: 'Device group', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceGroup.name || '',
    },
    {
      field: 'savedDeviceCommand.name', type: 'string', headerName: 'Saved device command', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.savedDeviceCommand.name || '',
    },
    {
      field: 'deviceJobStatus.name', type: 'string', headerName: 'Status', flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => params.row.deviceJobStatus.name || '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {getDeviceJobStatusLabel(params.value)}
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
      <ServerSideDataGrid
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
        columns={columns}
        rows={deviceJobs}
        meta={deviceJobsMeta}
        loading={isDeviceJobsLoading}
      />
      {!hideActionsColumn && (
        <DeleteDeviceJobAlertDialog
          deviceJob={deviceJob}
          open={openDeleteDeviceJobAlertDialog}
          handleClose={() => setOpenDeleteDeviceJobAlertDialog(false)}
          handleConfirm={deleteDeviceJob}
        />
      )}
    </>
  );
};

export default DeviceJobsDataGrid;
