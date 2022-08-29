import {
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
  GridSelectionModel
} from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyedMutator } from 'swr/dist/types';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSavedDeviceCommandAlertDialog from '../DeleteSavedDeviceCommandAlertDialog';
import { QueryOptions } from '../../types/dataGrid';
import { useSavedDeviceCommandCRUD } from '../../hooks/savedDeviceCommand/useSavedDeviceCommandCRUD';
import JsonDataGridCellExpand from '../JsonDataGridCellExpand/JsonDataGridCellExpand';
import ServerSideDataGrid from '../ServerSideDataGrid';

interface SavedDeviceCommandsDataGridProps {
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
  queryOptions: QueryOptions
  setQueryOptions: Dispatch<SetStateAction<QueryOptions>>;
  savedDeviceCommands: any;
  savedDeviceCommandsMeta: any;
  isSavedDeviceCommandsLoading: boolean;
  mutateSavedDeviceCommands: KeyedMutator<any>;
  hideActionsColumn?: boolean
}

const SavedDeviceCommandsDataGrid = ({
                                       selectionModel,
                                       setSelectionModel,
                                       queryOptions,
                                       setQueryOptions,
                                       savedDeviceCommands,
                                       savedDeviceCommandsMeta,
                                       isSavedDeviceCommandsLoading,
                                       mutateSavedDeviceCommands,
                                       hideActionsColumn = undefined
                                     }: SavedDeviceCommandsDataGridProps) => {
  const router = useRouter();

  const [savedDeviceCommand, setSavedDeviceCommand] = useState<GridRowModel>(null);
  const [openDeleteSavedDeviceCommandAlertDialog, setOpenDeleteSavedDeviceCommandAlertDialog] = useState(false);

  const { deleteSavedDeviceCommands } = useSavedDeviceCommandCRUD();

  const renderCellExpand = (params: GridRenderCellParams<string>) => {
    return (
      <JsonDataGridCellExpand header="Payload" width={params.colDef.computedWidth} value={params.value || ''}/>
    );
  };

  const confirmDeleteSavedDeviceCommand = useCallback((row: GridRowModel) =>
    () => {
      setSavedDeviceCommand(row);
      setOpenDeleteSavedDeviceCommandAlertDialog(true);
    }, []);

  const deleteDevice = useCallback(() => {
    deleteSavedDeviceCommands([savedDeviceCommand?.id], false, mutateSavedDeviceCommands);
    setOpenDeleteSavedDeviceCommandAlertDialog(false);
    setSavedDeviceCommand(null);
  }, [savedDeviceCommand?.id, mutateSavedDeviceCommands]);

  const columns = useMemo<GridColumns>(() => [
    { field: 'id', type: 'string', headerName: 'Saved device command ID', hide: true, },
    { field: 'name', type: 'string', headerName: 'Saved device command name', flex: 0.3, },
    { field: 'deviceCommandTypeName', type: 'string', headerName: 'Device command type', flex: 0.2, },
    {
      field: 'payload', type: 'string', headerName: 'Payload', flex: 0.4, sortable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'actions', type: 'actions', headerName: 'Actions', flex: 0.1, hide: hideActionsColumn,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoTwoToneIcon/>}
          label="View"
          onClick={() => router.push(`/device/commands/saved/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteTwoToneIcon/>}
          label="Delete"
          onClick={confirmDeleteSavedDeviceCommand(params.row)}
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
        rows={savedDeviceCommands}
        meta={savedDeviceCommandsMeta}
        loading={isSavedDeviceCommandsLoading}
      />
      <DeleteSavedDeviceCommandAlertDialog
        savedDeviceCommand={savedDeviceCommand}
        open={openDeleteSavedDeviceCommandAlertDialog}
        handleClose={() => setOpenDeleteSavedDeviceCommandAlertDialog(false)}
        handleConfirm={deleteDevice}
      />
    </>
  );
};

export default SavedDeviceCommandsDataGrid;
